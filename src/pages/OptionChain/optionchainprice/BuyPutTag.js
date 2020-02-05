import React from 'react';
import {Icon, Tag} from 'antd';

const increment = 'increment';
const decrement = 'decrement';

const BuyPutAction = (dataIndex, symbolState, symbol, updateSymbol, counter, expiryDate) => {
    const newsymbolstate = symbolState.optionData.options.map((value, i) => {
        if (i === dataIndex) {
            if (counter === increment) {
                return [{...value[0]}, {...value[1], Buy: value[1].Buy + 1, Sell: 0}];
            } else if (counter === decrement) {
                return [{...value[0]}, {...value[1], Buy: value[1].Buy - 1, Sell: 0}];
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

const BuyPutTag = ({buy, dataIndex, symbolState, symbol, updateSymbol, expiryDate}) => {
    if (buy !== undefined) {
        if (buy[1].Buy !== undefined) {
            if (buy[1].Buy > 0) {
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
                                BuyPutAction(
                                    dataIndex,
                                    symbolState,
                                    symbol,
                                    updateSymbol,
                                    increment,
                                    expiryDate);
                            }}
                            color='blue'
                            style={{fontWeight: 500}}
                        >
                            <Icon type='plus'/>
                        </Tag>
                        <Tag
                            color='#298dff'
                            style={{opacity: 0.8, fontWeight: 800}}
                        >{buy[1].Buy}</Tag>
                        <Tag
                            onClick={() => {
                                BuyPutAction(
                                    dataIndex,
                                    symbolState,
                                    symbol,
                                    updateSymbol,
                                    decrement,
                                    expiryDate);
                            }}
                            color='blue'
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

export default BuyPutTag;