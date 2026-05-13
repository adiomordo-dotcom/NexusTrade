import { create } from 'zustand';
import ValuationEngine from '../services/valuationEngine';
import { Asset, LiveAsset } from '../types';

type MappedAsset = Record<string, LiveAsset>;

interface TradeState {
    assets: MappedAsset;
    assetIds: string[];
    totalPortfolioValue: number;
    isLoading: boolean;
    connectionStatus: 'connected' | 'disconnected' | 'connecting';
    // Actions
    setAssets: (assets: Asset[]) => void;
    updateAssetLiveFields: (symbol: string, liveData: Partial<LiveAsset>) => void;
    setLoading: (loading: boolean) => void;
    setConnectionStatus: (status: 'connected' | 'disconnected' | 'connecting') => void;
}

export const useTradeStore = create<TradeState>((set) => ({
    assets: {},
    assetIds: [],
    totalPortfolioValue: 0,
    isLoading: false,
    connectionStatus: 'disconnected',
    setAssets: (incomingAssets) => {
        ValuationEngine.getInstance().setSymbolMapping(incomingAssets);
        const assetRecord = incomingAssets.reduce((acc, asset) => {
            acc[asset.symbol] = {
                ...asset,
                currentPrice: asset.purchasePrice,
                pnl: 0,
                volatility: 'Stable',
                trend: 'neutral',
            };
            return acc;
        }, {} as MappedAsset);

        set({
            assets: assetRecord,
            assetIds: incomingAssets.map(a => a.symbol)
        });
    },
    updateAssetLiveFields: (id, liveData) => {
        set((state) => ({
            assets: {
                ...state.assets,
                [id]: { ...state.assets[id], ...liveData },
            },
        }));
    },
    setLoading: (loading) => {
        set({ isLoading: loading });
    },
    setConnectionStatus: (status) => {
        set({ connectionStatus: status });
    }
}));