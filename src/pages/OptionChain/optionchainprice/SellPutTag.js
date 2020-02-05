import React from 'react';
import {Icon, Tag} from 'antd';

const increment = 'increment';
const decrement = 'decrement';

const SellPutAction = (dataIndex, symbolState, symbol, updateSymbol, counter, expiryDate) => {
    const newsymbolstate = symbolState.optionData.options.map((value, i) => {
        if (i === dataIndex) {
            if (counter === increment) {
                return [{...value[0]}, {...value[1], Sell: value[1].Sell + 1, Buy: 0}];
            } else if (counter === decrement) {
                return [{...value[0]}, {...value[1], Sell: value[1].Sell - 1, Buy: 0}];
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

const SellPutTag = ({sell, dataIndex, symbolState, symbol, updateSymbol, expiryDate}) => {
    if (sell !== undefined) {
        if (sell[1].Sell !== undefined) {
            if (sell[1].Sell > 0) {
                return (
                    <div
                        style={{
                            position: 'absolute',
                            top: 2,
                            left: 5,
                            fontWeight: 500
                        }}
                    >
                        <Tag
                            onClick={() => {
                                SellPutAction(
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
                        >{sell[1].Sell}</Tag>
                        <Tag
                            onClick={() => {
                                SellPutAction(
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

export default SellPutTag;