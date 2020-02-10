/* eslint-disable no-unused-expressions */
import React, {Component} from 'react';
import styled from 'styled-components';
import {Layout, Tabs, Alert} from 'antd';
import 'react-table/react-table.css';
import '../../App.css';
import {Header} from '../../components/Header/optionheader';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import {OptionChainPrice} from './optionchainprice/optionchainprice';
import {OptionChainGreek} from './optionchaingreek';
import OptionChart from './optionchart';
import {connect} from '../../overmind/index';
import {Footer} from './footer';
import {OptionPriceModal} from './optionpricemodal';
import {validateCustomerToken} from '../../api/login';

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;
const Container = styled(FlexCol)`
  padding: 1rem;
  align-items: center;
  padding: 1rem;
  justify-content: space-between;
`;

const WarningContainer = styled.section`
  display: flex;
  margin: 0;
  flex-direction: column;
  text-align: center;
`;

//const tempToken = 'c970f2ad316baf2e29ede715a735739239c10c57';

const {Content} = Layout;
const {TabPane} = Tabs;

class OptionChainComponent extends Component {
    constructor() {
        super();
        this.state = {
            perlotSize: false,
            calculateFuturePrice: false,
            calculateFutureButton: true,
            optionPriceModal: false,
            futureTarget: 0,
            innerColumn: 'Sell',
            outerColumn: 'Buy',
            targetDate: new Date(),
            expirySlider: 0,
            crosshairValues: [],
            options: {
                annotations: {

                    yaxis: [{
                        stroke: {
                            width:[4]
                        },
                        y: 0,
                        borderColor: '#FF4560',
                        label: {
                            borderColor: '#FF4560',
                            offsetY: 0,
                            style: {
                                color: '#fff',
                                background: '#FF4560'
                            },
                            text: 'Break Even'
                        }
                    }]
                },
                stroke: {
                    curve: 'straight',
                    dashArray: [0, 8],
                    width:[4,4]
                },
                xaxis: {
                    categories: [],
                    title: {
                        text: 'Strike Prices'
                    }
                },
                yaxis: {
                    min: 0,
                    max: 0
                }
            },
            series: [
                {
                    name: 'Target Date Payoff',
                    data: []
                },
                {
                    name: 'Expiry Date Payoff',
                    data: []
                }
            ]
        };
    }

    async componentDidMount() {

        async function validateCustomer() {
            try {
                await validateCustomerToken();
            } catch (error) {
                window.location = window.origin;
            }
        }
        validateCustomer();

        //await localStorage.setItem("token", tempToken)
        const {actions, state} = this.props.overmind;
        await actions.getOption(
            localStorage.getItem('token'),
        );

        await actions.getSymbol({
            accessToken: localStorage.getItem('token'),
            symbol: 'NIFTY',
            indices: 'NIFTY_50',
            expiry_date: '0'
        });

        const currentTime = moment();
        const extra = moment().format('YYYY-MM-DD') + ' ';
        const startTime = moment(extra + '9:15');
        const endTime = moment(extra + '15:30');

        try {
            setInterval(async () => {
                if (moment(currentTime).isBetween(startTime, endTime)) {
                    actions.fetchOption({
                        accessToken: localStorage.getItem('token'),
                        symbol: state.option.symbol,
                        indices: state.option.stock_symbol,
                        expiry_date: state.option.expiry_date
                    });
                }
            }, 20000);
        } catch (e) {
            console.log(e);
        }
    }

  showPerLotSize = () => {
      this.setState({
          perlotSize: !this.state.perlotSize
      });
  }

  enableFuturePrice = async () => {
      await this.setState({
          calculateFuturePrice: !this.state.calculateFuturePrice,
          calculateFutureButton: !this.state.calculateFutureButton
      });

      if (this.state.calculateFuturePrice === true) {
          this.setState({
              outerColumn: 'Current',
              innerColumn: 'Future'
          });
      } else {
          this.setState({
              outerColumn: 'Buy',
              innerColumn: 'Sell'
          });
      }
  }

  toggleOptionPriceModal = () => {
      const {state} = this.props.overmind;
      if (this.state.optionPriceModal === false) {
          this.setState({
              futureTarget: state.option.closest_strike,
              optionPriceModal: !this.state.optionPriceModal
          });
      } else {
          this.setState({
              optionPriceModal: !this.state.optionPriceModal
          });
      }
  }

  changeFutureTarget = (value) => {
      this.setState({
          futureTarget: value
      });
  }

  cellStrikeColor = (strikePrice) => {
      const {state} = this.props.overmind;
      if (strikePrice === state.option.closest_strike) {
          return '#FFFD8D';
      } else if (strikePrice === state.future.future_target &&
                 this.state.calculateFuturePrice === true) {
          return '#F0F8FF';
      }
      return '#FFFEE0';
  }

  cellCallColor = (strikePrice, rowIndex) => {
      const {state} = this.props.overmind;
      if (strikePrice === state.option.closest_strike &&
        rowIndex === null) {
          return '#FFFD8D';
      } else if (strikePrice === state.future.future_target &&
        this.state.calculateFuturePrice === true) {
          return '#F0F8FF';
      } else if (strikePrice < state.option.stock_price) {
          return '#FFFEE0';
      }
      return '#FFFFFF';
  }
  cellPutColor = (strikePrice) => {
      const {state} = this.props.overmind;
      if (strikePrice === state.option.closest_strike) {
          return '#FFFD8D';
      } else if (strikePrice === state.future.future_target &&
        this.state.calculateFuturePrice === true) {
          return '#F0F8FF';
      } else if (strikePrice > state.option.stock_price) {
          return '#FFFEE0';
      }
      return '#FFFFFF';
  }
  cellGreekColor = (strikePrice) => {
      const {state: {option}} = this.props.overmind;
      if (strikePrice === option.closest_strike) {
          return '#FFFD8D';
      }
      return '#FFFFFF';
  }

  setTargetDate = (targetDate) => {
      this.setState({targetDate});
  }

  setExpiryDay = async (value) => {
      const {state} = this.props.overmind;
      const calData = state.symbols.calData;
      this.setState({
          options: {
              annotations: this.state.options.annotations,
              stroke: this.state.options.stroke,
              xaxis: {
                  title: this.state.options.xaxis.title,
                  categories: calData.strike_series
              },
              yaxis: {
                  ...this.state.options.yaxis,
                  min: calData.ymin,
                  max: calData.ymax
              }
          },
          expirySlider: value,
          series: [
              {
                  name: 'Target Date Payoff',
                  data: calData.expiry_payoff_series[value]
              },
              {
                  name: 'Expiry Date Payoff',
                  data: calData.expiry_payoff_series[0]
              }
          ]
      });
  }

  calculateFuturePrice = () => {
      const {actions, state} = this.props.overmind;
      actions.fetchFuturePrice({
          targetDate: this.state.targetDate,
          futureTarget: this.state.futureTarget,
          symbol: state.option.symbol,
          expiry_date: state.option.expiry_date
      });
      this.toggleOptionPriceModal();
  }

  updateSymbol = async (updatedSymbol) => {
      const {actions, state} = this.props.overmind;
      await actions.updateSymbol(updatedSymbol);
      const calData = state.symbols.calData;
      await this.setState({
          options: {
              annotations: this.state.options.annotations,
              stroke: this.state.options.stroke,
              xaxis: {
                  title: this.state.options.xaxis.title,
                  categories: calData.strike_series
              },
              yaxis: {
                  ...this.state.options.yaxis,
                  min: calData.ymin,
                  max: calData.ymax
              }
          },
          series: [
              {
                  name: 'Target Date Payoff',
                  data: calData.expiry_payoff_series[this.state.expirySlider]
              },
              {
                  name: 'Expiry Date Payoff',
                  data: calData.expiry_payoff_series[0]
              }
          ]
      });
  }

  render() {
      const {actions, state:
        {
            option: optionState,
            symbols: symbolState,
            future: futureState
        }} = this.props.overmind;
      return (
          <Layout style={{background: '#FFFFFF'}}>
              <OptionPriceModal
                  optionPriceModal={this.state.optionPriceModal}
                  calculateFuturePrice={this.calculateFuturePrice}
                  toggleOptionPriceModal={this.toggleOptionPriceModal}
                  optionState={optionState}
                  changeFutureTarget={this.changeFutureTarget}
                  targetDate={this.state.targetDate}
                  setTargetDate={this.setTargetDate}
              />
              <Header
                  fetchOptionByDate={actions.fetchOptionByDate}
                  fetchOption={actions.fetchOption}
                  getSymbol={actions.getSymbol}
                  updateSymbol={actions.updateSymbol}
                  futurePrice={optionState.future}
                  symbol={optionState.symbol}
                  lotSize={optionState.lot_size}
                  perlotSize={this.state.perlotSize}
                  showPerLotSize={this.showPerLotSize}
                  calculateFuturePrice={this.calculateFuturePrice}
                  daysToExpiry={optionState.days_to_expiry}
                  stockPrice={optionState.stock_price}
                  pcr={optionState.pcr}
                  expiryDates={optionState.expiry_dates}
                  expiryDate={optionState.expiry_date}
                  stockSymbol={optionState.stock_symbol}
                  maxPain={optionState.max_pain}
                  symbolState={symbolState}
              />
              <Layout>
                  <Layout style={{padding: '0 24px', background: '#FFFFFF'}}>
                      <Content
                          style={{
                              background: '#FFFFFF',
                              padding: 5,
                              margin: 0,
                              minHeight: 280
                          }}
                      >
                          <Tabs
                              defaultActiveKey='1'
                              animated={false}
                              tabBarStyle={{
                                  fontWeight: 600
                              }}
                          >
                              <TabPane
                                  tab='Prices'
                                  key='1'
                              >
                                  <Container style={{width: '100%'}}>
                                      <OptionChainPrice
                                          calculateFuturePrice={this.state.calculateFuturePrice}
                                          futureState={futureState.future_price}
                                          outerColumn={this.state.outerColumn}
                                          innerColumn={this.state.innerColumn}
                                          perlotSize={this.state.perlotSize}
                                          optionState={optionState}
                                          symbolState={symbolState}
                                          cellCallColor={this.cellCallColor}
                                          cellStrikeColor={this.cellStrikeColor}
                                          cellPutColor={this.cellPutColor}
                                          cellGreekColor={this.cellGreekColor}
                                          updateSymbol={this.updateSymbol}
                                          expiryDate={optionState.expiry_date}
                                      />
                                      <Footer
                                          perlotSize={this.state.perlotSize}
                                          showPerLotSize={this.showPerLotSize}
                                          calculateFuturePrice={this.state.calculateFuturePrice}
                                          enableFuturePrice={this.enableFuturePrice}
                                          toggleOptionPriceModal={this.toggleOptionPriceModal}
                                          calculateFutureButton={this.state.calculateFutureButton}
                                          symbolState={symbolState}
                                          getSymbol={actions.getSymbol}
                                          symbol={optionState.symbol}
                                          indices={optionState.stock_symbol}
                                          expiry_date={optionState.expiry_date}
                                      />
                                  </Container>
                              </TabPane>
                              <TabPane
                                  tab='Greeks'
                                  key='2'
                              >
                                  <Container style={{width: '100%'}}>
                                      <OptionChainGreek
                                          optionState={optionState}
                                          symbolState={symbolState}
                                          cellCallColor={this.cellCallColor}
                                          cellStrikeColor={this.cellStrikeColor}
                                          cellPutColor={this.cellPutColor}
                                          cellGreekColor={this.cellGreekColor}
                                          updateSymbol={actions.updateSymbol}
                                      />
                                  </Container>
                              </TabPane>
                              <TabPane
                                  tab='Analysis'
                                  key='3'
                              >
                                  <Container style={{height: '80%', width: '100%'}}>
                                      <OptionChart
                                          symbolState={symbolState}
                                          daysToExpiry={optionState.days_to_expiry}
                                          expirySlider={this.state.expirySlider}
                                          setExpiryDay={this.setExpiryDay}
                                          options={this.state.options}
                                          series={this.state.series}
                                      />
                                  </Container>
                              </TabPane>
                          </Tabs>

                      </Content>
                  </Layout>
              </Layout>
          </Layout>
      );
  }
}

export const OptionChain = connect(OptionChainComponent);
