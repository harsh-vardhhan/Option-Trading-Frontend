import React from 'react';
import {Icon, Tag} from 'antd';

const increment = 'increment';
const decrement = 'decrement';

const BuyCallAction = (dataIndex, symbolState, symbol, updateSymbol, counter, expiryDate) => {
    const newsymbolstate = symbolState.optionData.options.map((value, i) => {
        if (i === dataIndex) {
            if (counter === increment) {
                return [{...value[0], Buy: value[0].Buy + 1, Sell: 0}, {...value[1]}];
            } else if (counter === decrement) {
                return [{...value[0], Buy: value[0].Buy - 1, Sell: 0}, {...value[1]}];
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

const BuyCallTag = ({buy, dataIndex, symbolState, symbol, updateSymbol, expiryDate}) => {
    if (buy !== undefined) {
        if (buy[0].Buy !== undefined) {
            if (buy[0].Buy > 0) {
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
                                BuyCallAction(
                                    dataIndex,
                                    symbolState,
                                    symbol,
                                    updateSymbol,
                                    increment,
                                    expiryDate);
                            }}
                            color='blue'
                            style={{fontWeight: 700}}
                        >
                            <Icon type='plus'/>
                        </Tag>
                        <Tag
                            color='#298dff'
                            style={{opacity: 0.8, fontWeight: 800}}
                        >{buy[0].Buy}</Tag>
                        <Tag
                            onClick={() => {
                                BuyCallAction(
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

export default BuyCallTag;