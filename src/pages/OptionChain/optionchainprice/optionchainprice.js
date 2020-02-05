/* eslint-disable no-unused-expressions */
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import BuyCallTag from './BuyCallTag';
import SellCallTag from './SellCallTag';
import BuyPutTag from './BuyPutTag';
import SellPutTag from './SellPutTag';

export const OptionChainPrice = ({
    optionState,
    symbolState,
    cellCallColor,
    cellStrikeColor,
    cellPutColor,
    updateSymbol,
    expiryDate,
    perlotSize,
    outerColumn,
    innerColumn,
    futureState,
    calculateFuturePrice
}) => {
    console.log(optionState.options) 
    return (
    <ReactTable
        data={optionState.options}
        showPagination={false}
        pageSize={optionState.options.length}
        style={{
            height: window.innerHeight - 260,
            width: '100%'
        }}
        getTdProps={(state, rowInfo, column) => {
            if (rowInfo && rowInfo.row) {
                return {
                    onClick: () => {
                        if (column.parentColumn.Header === 'CALLS' || column.parentColumn.Header === 'PUTS') {
                            if (column.Header === 'Buy' || column.Header === 'Sell') {
                                const newsymbolstate = symbolState.optionData.options.map((value, i) => {
                                    if (rowInfo.index === i) {
                                        if (column.parentColumn.Header === 'CALLS') {
                                            if (column.Header === 'Buy') {
                                                if (value[0].Buy === undefined) {
                                                    return [{...value[0], Buy: 1, Sell: 0}, {...value[1]}];
                                                }
                                                return [{...value[0], Buy: value[0].Buy + 1, Sell: 0}, {...value[1]}];
                                            } else if (column.Header === 'Sell') {
                                                if (value[0].Sell === undefined) {
                                                    return [{...value[0], Sell: 1, Buy: 0}, {...value[1]}];
                                                }
                                                return [{...value[0], Sell: value[0].Sell + 1, Buy: 0}, {...value[1]}];
                                            }
                                        } else if (column.parentColumn.Header === 'PUTS') {
                                            if (column.Header === 'Buy') {
                                                if (value[1].Buy === undefined) {
                                                    return [{...value[0]}, {...value[1], Buy: 1, Sell: 0}];
                                                }
                                                return [{...value[0]}, {...value[1], Buy: value[1].Buy + 1, Sell: 0}];
                                            } else if (column.Header === 'Sell') {
                                                if (value[1].Sell === undefined) {
                                                    return [{...value[0]}, {...value[1], Sell: 1, Buy: 0}];
                                                }
                                                return [{...value[0]}, {...value[1], Sell: value[1].Sell + 1, Buy: 0}];
                                            }
                                        }
                                    }
                                    return value;
                                });
                                updateSymbol({
                                    expiryDate,
                                    parent_symbol: optionState.symbol,
                                    symbol: newsymbolstate
                                });
                            }
                        }
                    }
                };
            }
            return {};
        }
        }
        columns={[
            {
                Header: 'CALLS',
                headerStyle: {
                    fontWeight: 700,
                    backgroundColor: '#FFFFFF'
                },
                columns: [{
                    Header: 'OI - Lakhs',
                    minWidth: 170,
                    headerStyle: {
                        fontWeight: 700
                    },
                    getProps: (state, rowInfo) => {
                        const selected = rowInfo ? cellCallColor(rowInfo.original._id) : false // because r might not exist
                        return {
                          style: {
                            backgroundColor: selected ? cellCallColor(rowInfo.original[2], null) : "inherit"
                          }
                        }
                    },
                    Cell: data =>
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%'
                            }}
                        >
                            <div
                                style={{
                                    marginTop: '1px',
                                    width: `${data.original[0].oig}%`,
                                    height: '27px',
                                    backgroundColor: 'rgba(33,206,153,0.2)',
                                    borderWidth: '1px',
                                    borderColor: '#21ce99',
                                    borderStyle: 'Solid',
                                    transition: 'all .4s ease'
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 2,
                                    left: 5,
                                    fontWeight: 500
                                }}
                            >
                                <p style={{color: '#000000'}}>{data.original[0].oi}</p>
                            </div>
                            <BuyCallTag
                                buy={symbolState.optionData.options[data.index]}
                                dataIndex={data.index}
                                symbolState={symbolState}
                                symbol={optionState.symbol}
                                updateSymbol={updateSymbol}
                                expiryDate={expiryDate}
                            />
                            <SellCallTag
                                sell={symbolState.optionData.options[data.index]}
                                dataIndex={data.index}
                                symbolState={symbolState}
                                symbol={optionState.symbol}
                                updateSymbol={updateSymbol}
                                expiryDate={expiryDate}
                            />
                        </div>
                }, {
                    Header: outerColumn,
                    minWidth: 90,
                    headerStyle: {
                        fontWeight: 700
                    },
                    Cell: data =>
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%'
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 3,
                                    left: 5,
                                    fontWeight: 500
                                }}
                            >
                                <BuyCallPrice
                                    ask={data.original[0].ask}
                                    askLot={data.original[0].ask_lot}
                                    perlotSize={perlotSize}
                                />
                            </div>
                        </div>,
                    getProps: (state, rowInfo) => {
                        const selected = rowInfo ? cellCallColor(rowInfo.original._id) : false // because r might not exist
                        return {
                          style: {
                            backgroundColor: selected ? cellCallColor(rowInfo.original[2], null) : "inherit"
                          }
                        }
                    },
                }, {
                    Header: innerColumn,
                    minWidth: 90,
                    headerStyle: {
                        fontWeight: 700
                    },
                    getProps: (state, rowInfo) => {
                        const selected = rowInfo ? cellCallColor(rowInfo.original._id) : false // because r might not exist
                        return {
                          style: {
                            backgroundColor: selected ? cellCallColor(rowInfo.original[2], null) : "inherit"
                          }
                        }
                    },
                    Cell: data =>
                        <CallInnerColumn
                            data={data}
                            futureState={futureState}
                            perlotSize={perlotSize}
                            calculateFuturePrice={calculateFuturePrice}
                            dataIndex={data.index}
                        />
                }]
            },
            {
                headerStyle: {
                    backgroundColor: '#FFFEE0'
                },
                columns: [{
                    Header: 'Strike',
                    width: 100,
                    headerStyle: {
                        backgroundColor: '#FFFEE0',
                        fontWeight: 700
                    },
                    getProps: (state, rowInfo) => {
                        const selected = rowInfo ? cellStrikeColor(rowInfo.original._id) : false // because r might not exist
                        return {
                          style: {
                            backgroundColor: selected ? cellStrikeColor(rowInfo.original[2], null) : "inherit"
                          }
                        }
                    },
                    Cell: data =>
                        <div style={{color: '#000000', fontWeight: 700, textAlign: 'center'}}>
                            {data.original[2]}
                        </div>
                }]
            },
            {
                headerStyle: {
                    backgroundColor: '#FFFEE0'
                },
                columns: [{
                    Header: 'IV',
                    width: 100,
                    headerStyle: {
                        backgroundColor: '#FFFEE0',
                        fontWeight: 700
                    },
                    getProps: (state, rowInfo) => {
                        const selected = rowInfo ? cellStrikeColor(rowInfo.original._id) : false // because r might not exist
                        return {
                          style: {
                            backgroundColor: selected ? cellStrikeColor(rowInfo.original[2], null) : "inherit"
                          }
                        }
                    },
                    Cell: data =>
                        <div style={{color: '#000000', fontWeight: 700, textAlign: 'center'}}>
                            {data.original[3]}
                        </div>
                }]
            },
            {
                Header: 'PUTS',
                headerStyle: {
                    fontWeight: 700,
                    backgroundColor: '#FFFFFF'
                },
                columns: [{
                    Header: innerColumn,
                    headerStyle: {
                        fontWeight: 700
                    },
                    minWidth: 90,
                    getProps: (state, rowInfo) => {
                        const selected = rowInfo ? cellPutColor(rowInfo.original._id) : false // because r might not exist
                        return {
                          style: {
                            backgroundColor: selected ? cellPutColor(rowInfo.original[2], null) : "inherit"
                          }
                        }
                    },
                    Cell: data =>
                        <PutInnerColumn
                            data={data}
                            futureState={futureState}
                            perlotSize={perlotSize}
                            calculateFuturePrice={calculateFuturePrice}
                            dataIndex={data.index}
                        />
                }, {
                    Header: outerColumn,
                    headerStyle: {
                        fontWeight: 700
                    },
                    minWidth: 90,
                    getProps: (state, rowInfo) => {
                        const selected = rowInfo ? cellPutColor(rowInfo.original._id) : false // because r might not exist
                        return {
                          style: {
                            backgroundColor: selected ? cellPutColor(rowInfo.original[2], null) : "inherit"
                          }
                        }
                    },
                    Cell: data =>
                        <BuyPutPrice
                            ask={data.original[1].ask}
                            askLot={data.original[1].ask_lot}
                            perlotSize={perlotSize}
                        />
                }, {
                    Header: 'OI - Lakhs',
                    minWidth: 170,
                    headerStyle: {
                        fontWeight: 700
                    },
                    getProps: (state, rowInfo) => {
                        const selected = rowInfo ? cellPutColor(rowInfo.original._id) : false // because r might not exist
                        return {
                          style: {
                            backgroundColor: selected ? cellPutColor(rowInfo.original[2], null) : "inherit"
                          }
                        }
                    },
                    Cell: data =>
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%'
                            }}
                        >
                            <div
                                style={{
                                    marginTop: '1px',
                                    float: 'right',
                                    width: `${data.original[1].oig}%`,
                                    height: '27px',
                                    backgroundColor: 'rgb(255,88,88, 0.2)',
                                    borderWidth: '1px',
                                    borderColor: '#ff5858',
                                    borderStyle: 'Solid',
                                    transition: 'all .4s ease'
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 3,
                                    right: 5,
                                    fontWeight: 500
                                }}
                            >
                                <p style={{color: '#000000'}}>{data.original[1].oi}</p>
                            </div>
                            <BuyPutTag
                                buy={symbolState.optionData.options[data.index]}
                                dataIndex={data.index}
                                symbolState={symbolState}
                                symbol={optionState.symbol}
                                updateSymbol={updateSymbol}
                                expiryDate={expiryDate}
                            />
                            <SellPutTag
                                sell={symbolState.optionData.options[data.index]}
                                dataIndex={data.index}
                                symbolState={symbolState}
                                symbol={optionState.symbol}
                                updateSymbol={updateSymbol}
                                expiryDate={expiryDate}
                            />
                        </div>
                }]
            }
        ]}
    />

)};

const BuyCallPrice = ({ask, askLot, perlotSize}) => {
    if (perlotSize === true) {
        return (
            <p style={{color: '#000000'}}>{askLot}</p>
        );
    }
    return (
        <p style={{color: '#000000'}}>{ask}</p>
    );
};

const SellCallPrice = ({bid, bidLot, perlotSize}) => {
    if (perlotSize === true) {
        return (
            <p style={{color: '#000000'}}>{bidLot}</p>
        );
    }
    return (
        <p style={{color: '#000000'}}>{bid}</p>
    );
};

const SellPutPrice = ({bid, bidLot, perlotSize}) => {
    if (perlotSize === true) {
        return (
            <div style={{color: '#000000', fontWeight: 500, textAlign: 'right'}}>
                {bidLot}
            </div>
        );
    }
    return (
        <div style={{color: '#000000', fontWeight: 500, textAlign: 'right'}}>
            {bid}
        </div>
    );
};

const BuyPutPrice = ({ask, askLot, perlotSize}) => {
    if (perlotSize === true) {
        return (
            <div style={{color: '#000000', fontWeight: 500, textAlign: 'right'}}>
                {askLot}
            </div>
        );
    }
    return (
        <div style={{color: '#000000', fontWeight: 500, textAlign: 'right'}}>
            {ask}
        </div>
    );
};

export default OptionChainPrice;

const CallInnerColumn = ({data, futureState, perlotSize, calculateFuturePrice, dataIndex}) => { 
    if (calculateFuturePrice === false) {
        return (
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 3,
                        left: 5,
                        fontWeight: 500
                    }}
                >
                    <SellCallPrice
                        bid={data.original[0].bid}
                        bidLot={data.original[0].bid_lot}
                        perlotSize={perlotSize}
                    />
                </div>
            </div>
        );
    } else {
        if (futureState.length === 0) {
            return (
                <div style={{textAlign: 'center'}}>{'-'}</div>
            );
        } else {
            if (perlotSize === true) {
                return (
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: 3,
                                left: 5,
                                fontWeight: 500
                            }}
                        >
                            <p style={{color: '#000000'}}>
                                {futureState[dataIndex].call_lot_price}
                            </p>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: 3,
                                left: 5,
                                fontWeight: 500
                            }}
                        >
                            <p style={{color: '#000000'}}>
                                {futureState[dataIndex].call_price}
                            </p>
                        </div>
                    </div>
                );
            }
        }
    }
};

const PutInnerColumn = ({data, futureState, perlotSize, calculateFuturePrice, dataIndex}) => { 
    if (calculateFuturePrice === false) {
        return (
            <SellPutPrice
                bid={data.original[1].bid}
                bidLot={data.original[1].bid_lot}
                perlotSize={perlotSize}
            />
        );
    } else {
        if (futureState.length === 0) {
            return (
                <div style={{textAlign: 'center'}}>{'-'}</div>
            );
        } else {
            if (perlotSize === true) {
                return (
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: 3,
                                right: 0,
                                fontWeight: 500
                            }}
                        >
                            <p style={{color: '#000000', textAlign: 'right'}}>
                                {futureState[dataIndex].put_lot_price}
                            </p>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: 3,
                                right: 0,
                                fontWeight: 500
                            }}
                        >
                            <p style={{color: '#000000', textAlign: 'right'}}>
                                {futureState[dataIndex].put_price}
                            </p>
                        </div>
                    </div>
                );
            }
        }
    }
};