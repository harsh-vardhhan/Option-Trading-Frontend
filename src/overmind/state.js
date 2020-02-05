
export const state = {
    symbols: {
        calData: {
            mini_chart: [],
            chart: [],
            max_profit_expiry: 0,
            max_loss_expiry: 0,
            premium: 0,
            strike_series: [],
            expiry_payoff_series: [],
            ratio: 0
        },
        optionData: {
            options: []
        }
    },
    option: {
        options: [],
        stock_price: 0,
        stock_symbol: '',
        symbol: '',
        closest_strike: 0,
        future: 0,
        lot_size: 0,
        days_to_expiry: 0,
        pcr: 0,
        expiry_dates: [],
        expiry_date: 0,
        biggest_OI: 0,
        max_pain: 0,
        max_range: 0,
        min_range: 0
    },
    future: {
        future_price: [],
        future_target: null
    }
};