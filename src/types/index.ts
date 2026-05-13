export interface Asset {
    id: string;
    symbol: string;
    name: string;
    amount: number;
    purchasePrice: number;
}

export interface PriceUpdate {
    symbol: string;
    currentPrice: number;
    timestamp: number;
}

export type Trend = 'up' | 'down' | 'neutral';
export type Volatility = 'Stable' | 'Volatile';

export interface LiveAsset extends Asset {
    currentPrice: number;
    pnl: number;
    volatility: Volatility;
    trend: Trend;
}