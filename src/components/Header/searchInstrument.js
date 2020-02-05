import React from 'react';
import {AutoComplete} from 'antd';

const Option = AutoComplete.Option;

export function SearchInstrument({fetchOption, getSymbol}) {
    const Instruments = [
        {
            key: 'NIFTY',
            value: 'NIFTY_50'
        },
        {
            key: 'BANKNIFTY',
            value: 'NIFTY_BANK'
        }
    ];

    const [dataSource, setDataSource] = React.useState(Instruments);

    async function onSelect(key, value) {
        await fetchOption({
            accessToken: localStorage.getItem('token'),
            symbol: value.props.children,
            indices: value.props.value,
            expiry_date: '0'
        });
        await getSymbol({
            accessToken: localStorage.getItem('token'),
            symbol: value.props.children,
            indices: value.props.value,
            expiry_date: '0'
        });
    }
    function handleSearch(value) {
        if (value) {
            setDataSource(Instruments.filter(item =>
                item.includes(value)
            ));
        } else {
            setDataSource(Instruments);
        }
    }
    return (
        <AutoComplete
            size='small'
            style={{width: '80%'}}
            dataSource={dataSource.map((val) => {
                return (
                    <Option
                        key={val.key}
                        value={val.value}
                    >
                        {val.key}
                    </Option>
                );
            }
            )}
            onSelect={onSelect}
            onSearch={handleSearch}
            placeholder='NIFTY'
        />
    );
}