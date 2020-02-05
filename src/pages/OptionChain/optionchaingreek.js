/* eslint-disable no-unused-expressions */
import React from 'react';
import ReactTable from 'react-table';
import {Tag} from 'antd';

export const OptionChainGreek = ({
    optionState,
    symbolState,
    cellCallColor,
    cellStrikeColor,
    cellPutColor,
    cellGreekColor
}) => (
    <ReactTable
        data={optionState.options}
        showPagination={false}
        pageSize={optionState.options.length}
        style={{
            height: window.innerHeight - 230,
            width: '100%'
        }}
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
                            <BuyCallTag buy={symbolState.optionData.options[data.index]}/>
                            <SellCallTag sell={symbolState.optionData.options[data.index]}/>
                        </div>
                }, {
                    Header: 'Theta',
                    minWidth: 80,
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
                                    position: 'absolute',
                                    top: 3,
                                    left: 5,
                                    fontWeight: 500
                                }}
                            >
                                <p style={{color: '#000000'}}>{data.original[0].theta}</p>
                            </div>
                        </div>

                }, {
                    Header: 'Delta',
                    minWidth: 80,
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
                                    position: 'absolute',
                                    top: 3,
                                    left: 5,
                                    fontWeight: 500
                                }}
                            >
                                <p style={{color: '#000000'}}>{data.original[0].delta}</p>
                            </div>
                        </div>

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
                    Header: 'Delta',
                    minWidth: 80,
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
                        <div style={{color: '#000000', fontWeight: 500, textAlign: 'right'}}>
                            {data.original[1].delta}
                        </div>

                }, {
                    Header: 'Theta',
                    minWidth: 80,
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
                        <div style={{color: '#000000', fontWeight: 500, textAlign: 'right'}}>
                            {data.original[1].theta}
                        </div>

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
                            <BuyPutTag buy={symbolState.optionData.options[data.index]}/>
                            <SellPutTag sell={symbolState.optionData.options[data.index]}/>

                        </div>
                }]
            }, {
                Header: 'GREEKS',
                headerStyle: {
                    fontWeight: 700,
                    backgroundColor: '#FFFFFF'
                },
                columns: [{
                    Header: 'Gamma',
                    headerStyle: {
                        fontWeight: 700
                    },
                    width: 80,
                    getProps: (state, rowInfo) => {
                        const selected = rowInfo ? cellGreekColor(rowInfo.original._id) : false // because r might not exist
                        return {
                          style: {
                            backgroundColor: selected ? cellGreekColor(rowInfo.original[2], null) : "inherit"
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
                                    position: 'absolute',
                                    top: 3,
                                    left: 5,
                                    fontWeight: 500
                                }}
                            >
                                <p style={{color: '#000000'}}>{data.original[4]}</p>
                            </div>
                        </div>
                }, {
                    Header: 'Vega',
                    width: 80,
                    headerStyle: {
                        fontWeight: 700
                    },
                    getProps: (state, rowInfo) => {
                        const selected = rowInfo ? cellGreekColor(rowInfo.original._id) : false // because r might not exist
                        return {
                          style: {
                            backgroundColor: selected ? cellGreekColor(rowInfo.original[2], null) : "inherit"
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
                                    position: 'absolute',
                                    top: 3,
                                    left: 5,
                                    fontWeight: 500
                                }}
                            >
                                <p style={{color: '#000000'}}>{data.original[5]}</p>
                            </div>
                        </div>
                }]
            }
        ]}
    />

);

const BuyCallTag = ({buy}) => {
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
                            color='#298dff'
                            style={{opacity: 0.8, fontWeight: 800}}
                        >{buy[0].Buy}</Tag>
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

const SellCallTag = ({sell}) => {
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
                            color='#f50'
                            style={{opacity: 0.9, fontWeight: 800}}
                        >{sell[0].Sell}</Tag>
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

const BuyPutTag = ({buy}) => {
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
                            color='#298dff'
                            style={{opacity: 0.8, fontWeight: 800}}
                        >{buy[1].Buy}</Tag>
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

const SellPutTag = ({sell}) => {
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
                            color='#f50'
                            style={{opacity: 0.8, fontWeight: 800}}
                        >{sell[1].Sell}</Tag>
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

export default OptionChainGreek;
