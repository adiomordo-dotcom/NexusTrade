import { useTradeStore } from "../store/useTradeStore";
import { Asset } from "../types";
import { calculateTrend, calculateVolatility } from "../utils/finance";

class ValuationEngine {
    private static instance: ValuationEngine;
    private priceBuffers: Map<string, number[]> = new Map();

    private constructor() {
    }

    public static getInstance(): ValuationEngine {
        if (!ValuationEngine.instance) {
            ValuationEngine.instance = new ValuationEngine();
        }
        return ValuationEngine.instance;
    }

    public processUpdate(symbol: string, price: number): void {
        const buffer = this.priceBuffers.get(symbol) || [];
        buffer.push(price);
        if (buffer.length > 5) buffer.shift();
        this.priceBuffers.set(symbol, buffer);

        const asset = useTradeStore.getState().assets[symbol];
        if (!asset) return;

        const trend = calculateTrend(buffer);
        const volatility = calculateVolatility(buffer);
        const pnl = (price - asset.purchasePrice) * asset.amount;

        useTradeStore.getState().updateAssetLiveFields(symbol, {
            currentPrice: price,
            pnl,
            volatility,
            trend
        });
    }

    public setSymbolMapping(assets: Asset[]) {
        this.priceBuffers.clear();
    }
}

export default ValuationEngine;