import React from 'react';
import styled from 'styled-components';
import {Statistic, Col, Switch} from 'antd';
import {SearchInstrument} from './searchInstrument';
import {SelectExpiry} from './selectExpiry';
import {LineChart, Line, Tooltip, XAxis, YAxis, ReferenceLine} from 'recharts';

const Container = styled.section`
  border-bottom: 1px solid rgb(233, 233, 233);
`;
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  > a {
    text-decoration: none;
  }
  > ul {
    > li {
      &: hover {
        color: #1890ff;
        cursor: pointer;
      }
      display: inline-block;
      margin-left: 0px;
      font-size: 1rem;
      font-weight: 600;
      padding: 0.4rem;
      text-align: center;
    }
    flex: 1;
    
  }
`;

const Header = ({
    fetchOption,
    getSymbol,
    futurePrice,
    symbol,
    lotSize,
    daysToExpiry,
    pcr,
    stockSymbol,
    expiryDates,
    expiryDate,
    fetchOptionByDate,
    stockPrice,
    symbolState
}) => (
    <Container style={{background: '#FFFFFF'}}>
        <HeaderContent>
            <ul>
                <li>
                    <Col>
                        <Statistic
                            title={symbol}
                            value={stockPrice}
                        />
                    </Col>
                </li>
                <li>
                    <Col>
                        <Statistic
                            title={symbol + ' Future'}
                            value={futurePrice}
                        />
                    </Col>
                </li>
                <li >
                    <Col>
                        <Statistic
                            title={'Lot Size'}
                            value={lotSize}
                        />
                    </Col>
                </li>
                <li>
                    <Col>
                        <Statistic
                            title={'Expiry (Days)'}
                            value={daysToExpiry}
                        />
                    </Col>
                </li>
                <li>
                    <Col>
                        <Statistic
                            title={'PCR'}
                            value={pcr}
                        />
                    </Col>
                </li>
                <li>
                    <Premium premium={symbolState.calData.premium}/>
                </li>
                <li>
                    <Col>
                        <Statistic
                            title={'Max Profit'}
                            value={symbolState.calData.max_profit_expiry}
                        />
                    </Col>
                </li>
                <li>
                    <Col>
                        <Statistic
                            title={'Max Loss'}
                            value={symbolState.calData.max_loss_expiry}
                        />
                    </Col>
                </li>
                <li>
                    <Col>
                        <div style={{marginTop: 3}}>
                            <LineChart
                                height={50}
                                width={200}
                                data={symbolState.calData.mini_chart}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5
                                }}
                            >
                                <XAxis
                                    hide={true}
                                    dataKey='strike_price'
                                />
                                <ReferenceLine
                                    y={0}
                                    strokeWidth={3}
                                    stroke='#f50'
                                />
                                <YAxis
                                    hide={true}
                                    domain={[
                                        symbolState.calData.max_loss_numerical,
                                        symbolState.calData.max_profit_numerical
                                    ]}
                                />
                                <Tooltip/>
                                <Line
                                    type='monotone'
                                    dataKey='profit'
                                    stroke='#2db7f5'
                                    strokeWidth={3}
                                />
                            </LineChart>
                        </div>
                    </Col>
                </li>
                <li>
                    <Col>
                        <SearchInstrument
                            getSymbol={getSymbol}
                            fetchOption={fetchOption}
                        />
                        <br/>
                        <SelectExpiry
                            expiryDates={expiryDates}
                            expiryDate={expiryDate}
                            fetchOptionByDate={fetchOptionByDate}
                            symbol={symbol}
                            stockSymbol={stockSymbol}
                            getSymbol={getSymbol}
                        />
                        <br/>
                    </Col>
                </li>
            </ul>
        </HeaderContent>
    </Container>
);

export {Header};

const Premium = ({premium}) => {
    let valueStyle = '#00000';
    let premiumValue = 0;
    if (premium < 0) {
        premiumValue = Math.abs(premium);
        valueStyle = '#FF3A3D';
    } else if (premium > 0) {
        premiumValue = premium;
        valueStyle = '#12c457';
    } else if (premium === 0) {
        premiumValue = premium;
        valueStyle = 'rgba(0, 0, 0, 0.65)';
    }

    return (
        <Col>
            <Statistic
                title={'Premium'}
                value={premiumValue}
                valueStyle={{color: valueStyle}}
            />
        </Col>
    );
};
