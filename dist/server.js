"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const transactionService_1 = require("./transactionService");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
const hostname = process.env.HOSTNAME || '127.0.0.1'; // Use default value if not provided
const httpPort = parseInt(process.env.HTTP_PORT || '3000', 10); // Parse as number, use default value if not provided
const transactionsApiJWT = process.env.TRANSACTIONS_API_JWT || ''; // Load authentication token from environment variable
const authenticateRequest = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.slice(7) !== transactionsApiJWT) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Unauthorized' }));
    }
    else {
        next();
    }
};
const server = http.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === 'GET' && req.url === '/api/v1/transactions') {
        authenticateRequest(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const [visaResponse, amexResponse, masterCardResponse] = yield Promise.all([
                    (0, transactionService_1.getVisaTransactions)(),
                    (0, transactionService_1.getAmexTransactions)(),
                    (0, transactionService_1.getMasterCardTransactions)()
                ]);
                const allTransactions = [
                    ...visaResponse.transactions,
                    ...amexResponse.transactions,
                    ...masterCardResponse.transactions
                ];
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ transactions: allTransactions }));
            }
            catch (error) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Failed to fetch transactions' }));
            }
        }));
    }
    else {
        res.statusCode = 404;
        res.end('Not Found');
    }
}));
server.listen(httpPort, hostname, () => {
    console.log(`Server running at http://${hostname}:${httpPort}/`);
});
