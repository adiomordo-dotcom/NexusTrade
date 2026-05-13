import { Asset } from '../types';

const mockPortfolio: Asset[] = [
    { id: '1', symbol: 'BTC', name: 'Bitcoin', amount: 0.5, purchasePrice: 58000 },
    { id: '2', symbol: 'ETH', name: 'Ethereum', amount: 5, purchasePrice: 2400 },
    { id: '3', symbol: 'SOL', name: 'Solana', amount: 50, purchasePrice: 130 },
    { id: '4', symbol: 'BNB', name: 'Binance Coin', amount: 10, purchasePrice: 550 },
    { id: '5', symbol: 'ADA', name: 'Cardano', amount: 5000, purchasePrice: 0.35 },
    { id: '6', symbol: 'DOT', name: 'Polkadot', amount: 200, purchasePrice: 4.50 },
    { id: '7', symbol: 'MATIC', name: 'Polygon', amount: 1000, purchasePrice: 0.40 },
    { id: '8', symbol: 'LINK', name: 'Chainlink', amount: 100, purchasePrice: 11.00 },
    { id: '9', symbol: 'AVAX', name: 'Avalanche', amount: 40, purchasePrice: 22.00 },
    { id: '10', symbol: 'DOGE', name: 'Dogecoin', amount: 10000, purchasePrice: 0.10 },
];

export const fetchPortfolio = (): Promise<Asset[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockPortfolio);
        }, 1000);
    });
}