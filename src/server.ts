import * as http from 'http';
import { getVisaTransactions, getAmexTransactions, getMasterCardTransactions } from './transactionService';
import { transactionsApiJWT, hostname, httpPort } from '../config';

const authenticateRequest = (req: http.IncomingMessage, res: http.ServerResponse, next: () => void) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader !== transactionsApiJWT) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Unauthorized' }));
  } else {
    next();
  }
};

const server: http.Server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/api/v1/concurrent_transactions') {
    authenticateRequest(req, res, async () => {
      try {
        // Make concurrent requests to the external transactions service
        const [visaResponse, amexResponse, masterCardResponse] = await Promise.all([
          getVisaTransactions(),
          getAmexTransactions(),
          getMasterCardTransactions()
        ]);

        const allTransactions = [
          ...visaResponse.transactions,
          ...amexResponse.transactions,
          ...masterCardResponse.transactions
        ];

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ transactions: allTransactions }));
      } catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Failed to fetch transactions' }));
      }
    });
  } else if  (req.method === 'GET' && req.url === '/api/v1/serial_transactions') {
    authenticateRequest(req, res, async () => {
      try {
        // Make serial requests to the external transactions service
        const visaResponse = await getVisaTransactions();
        const amexResponse = await getAmexTransactions();
        const masterCardResponse = await getMasterCardTransactions();

        // Combine transactions from all responses
        const allTransactions = [
          ...visaResponse.transactions,
          ...amexResponse.transactions,
          ...masterCardResponse.transactions
        ];

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ transactions: allTransactions }));
      } catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Failed to fetch transactions' }));
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(httpPort, hostname, () => {
  console.log(`Server running at http://${hostname}:${httpPort}/`);
});
