import React from 'react';
import {Radio} from 'antd';

export function SelectExpiry({
    symbol,
    stockSymbol,
    expiryDates,
    fetchOptionByDate,
    getSymbol
}) {
    function handleChange(value) {
        fetchOptionByDate({
            accessToken: localStorage.getItem('token'),
            symbol,
            indices: stockSymbol,
            expiry_date: value.target.value
        });
        getSymbol({
            accessToken: localStorage.getItem('token'),
            symbol,
            indices: stockSymbol,
            expiry_date: value.target.value
        });
    }

    if (expiryDates !== undefined && expiryDates !== 0) {
        return (
            <Radio.Group
                onChange={handleChange}
                size='small'
            >
                {expiryDates.map((value, i) =>
                    <Radio.Button
                        key={i}
                        value={value.upstox_date}
                    >
                        {value.label_date}
                    </Radio.Button>
                )}
            </Radio.Group>
        );
    }
    return (
        <div/>
    );
}