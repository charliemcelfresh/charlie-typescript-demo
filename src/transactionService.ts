import axios from 'axios';

import { transactionsApiUrl, transactionsApiJWT } from '../config';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': transactionsApiJWT
};

export const getVisaTransactions = async () => {
  const response = await axios.post(`${transactionsApiUrl}/GetVisaTransactions`, {
    card_network: 'Amex'
  }, { headers });
  return response.data; 
};

export const getAmexTransactions = async () => {
  const response = await axios.post(`${transactionsApiUrl}/GetAmexTransactions`, {
    card_network: 'Amex'
  }, { headers });
  return response.data;
};

export const getMasterCardTransactions = async () => {
  const response = await axios.post(`${transactionsApiUrl}/GetMasterCardTransactions`, {
    card_network: 'Amex'
  }, { headers });
  return response.data;
};
