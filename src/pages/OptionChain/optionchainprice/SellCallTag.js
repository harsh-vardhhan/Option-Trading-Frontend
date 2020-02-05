import React from 'react';
import {Icon, Tag} from 'antd';

const increment = 'increment';
const decrement = 'decrement';

const SellCallAction = (dataIndex, symbolState, symbol, updateSymbol, counter, expiryDate) => {
    const newsymbolstate = symbolState.optionData.options.map((value, i) => {
        if (i === dataIndex) {
            if (counter === increment) {
                return [{...value[0], Buy: 0, Sell: value[0].Sell + 1}, {...value[1]}];
            } else if (counter === decrement) {
                return [{...value[0], Buy: 0, Sell: value[0].Sell - 1}, {...value[1]}];
            }
        }
        return value;
    });
    updateSymbol({
        expiryDate,
        parent_symbol: symbol,
        symbol: newsymbolstate
    });
};

const SellCallTag = ({sell, dataIndex, symbolState, symbol, updateSymbol, expiryDate}) => {
    if (sell !== undefined) {
        if (sell[0].Sell !== undefined) {
            if (sell[0].Sell > 0) {
                return (
                    <div
                        style={{
                            position: 'absolute',
                            top: 2,
                            right: 5,
                            fontWeight: 500
                        }}
                    >
                        <Tag
                            onClick={() => {
                                SellCallAction(
                                    dataIndex,
                                    symbolState,
                                    symbol,
                                    updateSymbol,
                                    increment,
                                    expiryDate);
                            }}
                            color='red'
                            style={{fontWeight: 500}}
                        >
                            <Icon type='plus'/>
                        </Tag>
                        <Tag
                            color='#f50'
                            style={{opacity: 0.8, fontWeight: 800}}
                        >{sell[0].Sell}</Tag>
                        <Tag
                            onClick={() => {
                                SellCallAction(
                                    dataIndex,
                                    symbolState,
                                    symbol,
                                    updateSymbol,
                                    decrement,
                                    expiryDate);
                            }}
                            color='red'
                            style={{fontWeight: 500}}
                        >
                            <Icon type='minus'/>
                        </Tag>
                    </div>
                );
            }

            return (
                <div/>
            );
        }
        return (
            <div/>
        );
    }
    return (
        <div/>
    );
};

export default SellCallTag;