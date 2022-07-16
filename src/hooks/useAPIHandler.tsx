import { useState } from 'react';
import { QuotesRequest, QuotesResponse } from '../types/Quotes';
import { Post } from '../helpers/APIHandlers';
import useDebounce from "./useDebounce"

const useAPIHandler = (url: string, data: QuotesRequest) => {
    const [exchangeRes, setExchangeRes] = useState<QuotesResponse>({});

    useDebounce(() => {
        Post<QuotesResponse>(url, data).then((res) => {
            setExchangeRes(res?.data);
        }).catch((error) => {
            setExchangeRes({error: error?.response?.data?.message});
        })
    }, 2000, [data]);

    return exchangeRes;
}

export default useAPIHandler;