import {fetch} from '../../api/server';

export const futurePriceEffects = {
    fetchFuturePrice: async (actions) => {
        const {data} = await fetch.post('/optionprice/', actions);
        return data;
    }
};
