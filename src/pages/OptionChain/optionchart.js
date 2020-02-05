/* eslint-disable no-unused-expressions */
import React from 'react';
import {Slider, Typography} from 'antd';
import ReactApexChart from 'react-apexcharts';
import styled from 'styled-components';
const { Title } = Typography;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;
const Container = styled(FlexCol)`
  padding: 0rem;
  align-items: center;
  justify-content: space-between;
`;

const OptionChart = ({symbolState, options, series, daysToExpiry, expirySlider, setExpiryDay}) => {
    if (symbolState.calData.expiry_payoff_series !== undefined) {
        return (
                <Container> 
                    <div style={{alignContent: 'center', width: '100%'}}>
                        <Slider
                            max={daysToExpiry}
                            min={0}
                            reverse={true}
                            value={expirySlider}
                            onChange={setExpiryDay}
                            defaultValue={daysToExpiry}
                        />
                    </div>
                    <div id='chart'>
                        <ReactApexChart
                            options={options}
                            series={series}
                            type='line'
                            height='400'
                            width='700'
                        />
                    </div>
                    <Title level={4}>{expirySlider}{' Days To Expiry'}</Title>               
                </Container>
        );
    }
    return <div/>;
};

export default OptionChart;