import React from 'react';
import {Layout, Switch, Col, Button, Tag} from 'antd';
import styled from 'styled-components';

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterContainer = styled(FlexCol)`
  align-items: center;
  height: 1px;
  padding: 1rem;
  justify-content: space-between;
  background-color: #ffffff
  border-color: #ebedf0;
  border-width: 1px;
  border-top-style: solid;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: left;
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
    flex: 1.5;
    
  }
`;

export const Footer = ({
    perlotSize,
    showPerLotSize,
    calculateFuturePrice,
    enableFuturePrice,
    toggleOptionPriceModal,
    calculateFutureButton,
    symbolState,
    getSymbol,
    symbol,
    indices,
    expiry_date
}) => {
    return (
        <Layout>
            <FooterContainer>
                <HeaderContent>
                    <ul>
                        <li>
                            <Col>
                                <RiskReward ratio={symbolState.calData.ratio}/>
                            </Col>
                        </li>
                        <li>
                            <Col>
                                {'Per Lot '}
                                <Switch
                                    size='small'
                                    checked={perlotSize}
                                    onChange={showPerLotSize}
                                />
                            </Col>
                        </li>
                        <li>
                            <Col>
                                {'Option Price '}
                                <Switch
                                    size='small'
                                    checked={calculateFuturePrice}
                                    onChange={enableFuturePrice}
                                />
                            </Col>
                        </li>
                        <li>
                            <Col>
                                <Button
                                    type='primary'
                                    size='small'
                                    onClick={toggleOptionPriceModal}
                                    disabled={calculateFutureButton}
                                >
                                    {'Option Price'}
                                </Button>
                            </Col>
                        </li>
                        <li>
                            <Col>
                                <Button
                                    type='primary'
                                    size='small'
                                    onClick={() => getSymbol({
                                        accessToken: localStorage.getItem('token'),
                                        symbol,
                                        indices,
                                        expiry_date
                                    })}
                                >
                                    {'Reset'}
                                </Button>
                            </Col>
                        </li>
                    </ul>
                </HeaderContent>
            </FooterContainer>
        </Layout>
    );
};

const RiskReward = ({ratio}) => {
    if (ratio === 0) {
        return <div/>;
    } else {
        return (
            <div>{'Risk Reward '}
                <Tag color='geekblue'>
                    {ratio}
                </Tag>
            </div>
        );
    }
};

export default Footer;