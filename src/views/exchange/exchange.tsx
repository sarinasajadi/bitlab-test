import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import useAPIHandler from '../../hooks/useAPIHandler';
import { QuotesRequest, QuotesResponse, QuoteState } from '../../types/Quotes';
import './exchange.css';


const Exchange = () => {
    const [values, setValues] = useState<QuoteState>({
        source_amount: '100',
        target_amount: '',
    });

    const [requestQuote, setRequestQuote] = useState<QuotesRequest>({
        source_currency: 'USD',
        target_crypto_asset_id: 'b2384bf2-b14d-4916-aa97-85633ef05742',
        source_amount: values.source_amount,
        target_amount: values.target_amount,
    });

    useEffect(() => {
        if (values.source_amount) {
            setRequestQuote({...requestQuote, source_amount: values.source_amount, target_amount: undefined});
        }
    }, [])

    const quoteResponse : QuotesResponse = useAPIHandler('quotes', requestQuote)

    useEffect(() => {
        if (quoteResponse?.id) {
            setValues({...values, source_amount: quoteResponse?.source_amount, target_amount: quoteResponse?.target_amount });
        }
        if (quoteResponse?.error) {
            setValues({...values, source_amount: '', target_amount: '' });
        }
    }, [quoteResponse])

    const handleChange = (prop: keyof QuoteState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
      const _requestQuote = {...requestQuote}
      if (event.target.value) {
        _requestQuote.source_amount = undefined;
        _requestQuote.target_amount = undefined;
        setRequestQuote({..._requestQuote, [prop]: event.target.value});
      } else {
        //For handling the time when input is cleared  
        setRequestQuote({...requestQuote});
      }
    };

    return (
        <div className='Exchange'>
            <Card sx={{ width: 500 }}>
                <CardContent>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="sourceAmount">You Pay</InputLabel>
                        <OutlinedInput
                            id="sourceAmount"
                            value={values.source_amount}
                            onChange={handleChange('source_amount')}
                            endAdornment={<InputAdornment position="end">USD</InputAdornment>}
                            label="Paid Amount"
                        />
                    </FormControl>
                    {quoteResponse?.id && (
                        <div className='ExchangeFeesContainer'>
                            <div className='Timeline'>
                                <Timeline position="alternate">
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>Fees</TimelineContent>
                                    </TimelineItem>
                                </Timeline>
                            </div>
                            <div className='ExchangeFees'>
                                <div className='Fees'>
                                    <div>Network Fee</div>
                                    <div>{quoteResponse.fiat_blockchain_fee}</div>
                                </div>
                                <div className='Fees'>
                                    +
                                </div>
                                <div className='Fees'>
                                    <div>c14 fee</div>
                                    <div>{quoteResponse.absolute_internal_fee}</div>
                                </div>
                                <div className='Fees'>
                                    =
                                </div>
                                <div className='Fees'>
                                    <div>Total Fee</div>
                                    <div>{quoteResponse.total_fee}</div>
                                </div>
                            </div>
                        </div>
                    )}
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="targetAmount">You Receive</InputLabel>
                        <OutlinedInput
                            id="targetAmount"
                            value={values.target_amount}
                            onChange={handleChange('target_amount')}
                            endAdornment={<InputAdornment position="end">USDC EVMOS</InputAdornment>}
                            label="Received Amount"
                        />
                    </FormControl>
                    {quoteResponse?.error && (
                        <Alert severity="error">{quoteResponse?.error}</Alert>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default Exchange;
