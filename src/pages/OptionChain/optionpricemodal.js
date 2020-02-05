import React from 'react';
import DatePicker from 'react-datepicker';
import {addDays} from 'date-fns';
import {Modal, InputNumber} from 'antd';

export const OptionPriceModal = ({
    optionPriceModal,
    calculateFuturePrice,
    toggleOptionPriceModal,
    changeFutureTarget,
    optionState,
    targetDate,
    setTargetDate
}) => {
    return (
        <Modal
            title=' Future Option Price Calculation'
            visible={optionPriceModal}
            onOk={calculateFuturePrice}
            onCancel={toggleOptionPriceModal}
        >
            {'Future Target: '}
            <InputNumber
                min={optionState.min_range}
                max={optionState.max_range}
                defaultValue={optionState.closest_strike}
                onChange={changeFutureTarget}
            />
            <br/><br/>
            {'Target Date: '}
            <DatePicker
                maxDate={addDays(new Date(), optionState.days_to_expiry)}
                minDate={(new Date())}
                selected={targetDate}
                onChange={date => setTargetDate(date)}
            />
        </Modal>
    );
};

export default OptionPriceModal;

