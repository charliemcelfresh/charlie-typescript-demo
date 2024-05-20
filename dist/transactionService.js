"use strict";
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
exports.getMasterCardTransactions = exports.getAmexTransactions = exports.getVisaTransactions = exports.transactionsApiJWT = exports.transactionsApiUrl = void 0;
const axios_1 = __importDefault(require("axios"));
// const transactionsApiUrl = 'http://localhost:8082/api/v1/charlie_microservices.TransactionService';
// const transactionsApiJWT = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1c2VyIiwiZXhwIjoxNzUyMTQzNjI2LCJpYXQiOjE3MTYxNDM2MjYsImlzcyI6ImNoYXJsaWUtbWljcm9zZXJ2aWNlcyIsInN1YiI6IjAwMTY3YmM5LWNlZDktNDdiNC05MWFiLTI3YjUzZDM4NTdmZSJ9.R6xbvzlQzgnHhWXAgDo9V0bMVHmp9dtiwhWWGX6vSmlTCmZ4VXvxkugz5opKwurTmZNyn6mAg1qMX6JtYVJFqZ8bNYtBRrWNhYq7WCUIJxtuOkIr4DcOjnAG_14vTkbrX_YGRcAaQ8BlbOOAHrs-2CPJLtGrGCuIMX-rDFWYa1EmgCs11qzeN7VS_6nHvF4RfFmnjLbzIjqzNNhRIUL_R2cIQtbVStjUFK3dbXL5EIEyFw7-Px5TzS6wdrrajA9ylsAfqUov5lRbOErfhxBj30IoGuKpogqx25myZ5AUgLNd_iui_VIeGIgFgxuhyWVcS_8gCTNHq4OTTZygEbSRVj-ZMn2BzYlFS0_0ksWr7dKWXSt_D20M4FlL-T5oBp3my-3XyCa0rM5sJtIWfS8ePumtci0vq4ZdSgyBObGfTLo0LuaCBqIp8Oklum2prtyveygF4KHuUxdXTC8vaLKpZHurw3mdMYO5oX99BERV0lcqvNhEY8yatfQNGksQXCgSV_Jx5-N_dE3sNGfjvcEfzc7Lrj2XtJ7_j14l71fCNcrv5x7K9TQi5lP3mTiVNK6rhr1g5ss4ivqgjwMeitPISjeEeL0v1KquqkYzt-uqlYrnSzRC13pzkgBx28Bm7wCcYQ1iFvVG7j1wFpsjGEt0GQ-d0y9I8nICIIw5d_mUAsQ';  // Replace with your actual token
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
exports.transactionsApiUrl = process.env.TRANSACTIONS_API_URL || '';
exports.transactionsApiJWT = process.env.TRANSACTIONS_API_JWT || '';
const headers = {
    'Content-Type': 'application/json',
    'Authorization': exports.transactionsApiJWT
};
const getVisaTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(`${exports.transactionsApiUrl}/GetVisaTransactions`, {
        card_network: 'Amex'
    }, { headers });
    return response.data; // Assuming response.data contains { transactions: [...] }
});
exports.getVisaTransactions = getVisaTransactions;
const getAmexTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(`${exports.transactionsApiUrl}/GetAmexTransactions`, {
        card_network: 'Amex'
    }, { headers });
    return response.data; // Assuming response.data contains { transactions: [...] }
});
exports.getAmexTransactions = getAmexTransactions;
const getMasterCardTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(`${exports.transactionsApiUrl}/GetMasterCardTransactions`, {
        card_network: 'Amex'
    }, { headers });
    return response.data; // Assuming response.data contains { transactions: [...] }
});
exports.getMasterCardTransactions = getMasterCardTransactions;
