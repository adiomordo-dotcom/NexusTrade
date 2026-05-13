import { LiveAsset, Trend, Volatility } from '../types';

export const calculateTrend = (prices: number[]): Trend => {
    if (prices.length < 2) return 'neutral';
    const beforeLast = prices[prices.length - 2];
    const last = prices[prices.length - 1];
    if (last > beforeLast) return 'up';
    if (last < beforeLast) return 'down';
    return 'neutral';
}

export const calculateVolatility = (prices: number[]): Volatility => {
    if (prices.length < 2) return 'Stable';
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    if (minPrice === 0) return 'Stable';
    const volatilityRatio = (maxPrice - minPrice) / minPrice;
    return volatilityRatio > 0.01 ? 'Volatile' : 'Stable';
}

export const calculatePNL = (currentPrice: number, purchasePrice: number, amount: number): number => {
    return (currentPrice - purchasePrice) * amount;
};

export const calculateTotalValue = (assets: Record<string, LiveAsset>): number => {
    return Object.values(assets).reduce((total, asset) => {
        return total + (asset.currentPrice * asset.amount);
    }, 0);
};