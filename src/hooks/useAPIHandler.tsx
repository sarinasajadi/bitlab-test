import react, { useState, useEffect, useCallback } from 'react';
import { QuotesRequest, QuotesResponse, QuoteError } from '../types/Quotes';
import useTimeout from './useTimeout';
import { Post } from '../helpers/APIHandlers';
import useDebounce from "./useDebounce"

const useAPIHandler = (url: string, data: QuotesRequest) => {
    const [exchangeRes, setExchangeRes] = useState<QuotesResponse>({});
    const [error, setError] = useState<QuoteError>();

    // const postCall = Post<QuotesResponse>(url, data).then((res) => {
    //     setExchangeRes(res?.data);
    // }).catch((error) => {
    //     setExchangeRes({error: error?.response?.data?.message});
    // })

    // useDebounce(() => postCall, 10000, [data]);

    useEffect(() => {
        const delayFn = setTimeout(() => {
            Post<QuotesResponse>(url, data).then((res) => {
                setExchangeRes(res?.data);
            }).catch((error) => {
                setExchangeRes({error: error?.response?.data?.message});
            })
        }, 2000)
        return () => clearTimeout(delayFn)
    }, [data])

    return exchangeRes;
}

export default useAPIHandler;