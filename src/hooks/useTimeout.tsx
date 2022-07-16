import { useEffect, useRef, useCallback } from 'react';

type CallbackType = () => Promise<void>


const useTimeout = (callback: CallbackType, delay: number) => {
    const callbackRef = useRef<CallbackType>(callback);
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback])

    const set = useCallback(() => {
        timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
    }, [delay])

    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current) 
    }, [])

    useEffect(() => {
        set();
        return clear;
    }, [delay, set, clear])

    const reset = useCallback(() => {
        clear();
        set();
    }, [clear, set])

    return {reset, clear};

}

export default useTimeout;