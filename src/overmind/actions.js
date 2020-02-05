
const getOption = async ({effects, state}, token) => {
    const data = await effects.optionEffects.getQuote(token);
    state.option = data;
};

const getMockOption = ({state, effects}) => {
    const option = effects.getMockQuote();
    state.option = option;
};

const fetchOption = async ({state, effects}, actions) => {
    const data = await effects.optionEffects.fetchOption(actions);
    state.option = data;
};

const fetchOptionByDate = async ({effects, state}, actions) => {
    const data = await effects.optionEffects.fetchOptionByDate(actions);
    state.option = data;
    state.future = {
        future_price: [],
        future_target: null
    };
};

/**actions related to symbols
 *
 */

const getSymbol = async ({effects, state}, actions) => {
    let option = {};
    if (actions.symbol === undefined) {
        option = await effects.symbolsEffects.fetchQuote(null, 'NIFTY', 'NIFTY_50', '0');
    } else {
        option = await effects.symbolsEffects.fetchQuote(actions);
    }
    const optionData = option.data;
    const calData = {
        max_profit_expiry: 0,
        max_loss_expiry: 0,
        ratio: 0
    };
    const builderData = {
        calData,
        optionData
    };
    state.symbols = builderData;
};

const updateSymbol = async ({effects, state}, actions) => {
    const calData = await effects.symbolsEffects.calStrategy(actions);
    const builderData = {
        calData: calData.data,
        optionData: {
            options: actions.symbol
        }
    };
    state.symbols = builderData;
};

const fetchFuturePrice = async ({effects, state}, actions) => {
    const futureData = await effects.futurePriceEffects.fetchFuturePrice(actions);
    state.future = {
        future_price: futureData.future_price,
        future_target: futureData.future_target
    };
};

const action = {
    getSymbol,
    updateSymbol,
    getOption,
    getMockOption,
    fetchOption,
    fetchOptionByDate,
    fetchFuturePrice
};

export default action;
