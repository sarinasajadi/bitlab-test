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
        paidAmount: '100',
        receivedAmount: '',
    });

    const [requestQuote, setRequestQuote] = useState<QuotesRequest>({
        source_currency: 'USD',
        target_crypto_asset_id: 'b2384bf2-b14d-4916-aa97-85633ef05742',
        source_amount: values.paidAmount,
        target_amount: values.receivedAmount,
    });

    useEffect(() => {
        if (values.receivedAmount) {
            setRequestQuote({...requestQuote, source_amount: undefined, target_amount: values.receivedAmount});
        }
    }, [values.receivedAmount])

    useEffect(() => {
        if (values.paidAmount) {
            setRequestQuote({...requestQuote, source_amount: values.paidAmount, target_amount: undefined});
        }
    }, [values.paidAmount])

    const quoteResponse : QuotesResponse = useAPIHandler('quotes', requestQuote)

    useEffect(() => {
        if (quoteResponse?.id) {
            setValues({...values, paidAmount: quoteResponse?.source_amount, receivedAmount: quoteResponse?.target_amount });
        }
        if (quoteResponse?.error) {
            setValues({...values, paidAmount: '', receivedAmount: '' });
        }
    }, [quoteResponse])

    const handleChange = (prop: keyof QuoteState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <div className='Exchange'>
            <Card sx={{ minWidth: 500 }}>
                <CardContent>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="paidAmount">You Pay</InputLabel>
                        <OutlinedInput
                            id="paidAmount"
                            value={values.paidAmount}
                            onChange={handleChange('paidAmount')}
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
                        <InputLabel htmlFor="receivedAmount">You Receive</InputLabel>
                        <OutlinedInput
                            id="receivedAmount"
                            value={values.receivedAmount}
                            onChange={handleChange('receivedAmount')}
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
