import dotenv from 'dotenv';

dotenv.config();

export const transactionsApiUrl: string = process.env.TRANSACTIONS_API_URL || '';
export const transactionsApiJWT: string = process.env.TRANSACTIONS_API_JWT || '';
export const hostname: string = process.env.HOSTNAME || '';
export const httpPort: number = parseInt(process.env.HTTP_PORT || '', 10);
