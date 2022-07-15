export interface QuotesRequest {
  source_currency: string,
  target_crypto_asset_id: string,
  source_amount?: string,
  target_amount?: string,
}

export interface QuotesResponse {
  id?: string;
  source_currency?: string;
  target_crypto_asset_id?: string;
  internal_fee_percent?: string;
  expires_at?: string;
  source_amount?: string;
  target_amount?: string;
  fiat_blockchain_fee?: string;
  absolute_internal_fee?: string;
  total_fee?: string;
  error?: string;
}

export interface QuoteError {
  error?: string;
}

export interface QuoteState {
  paidAmount?: string;
  receivedAmount?: string;
}
