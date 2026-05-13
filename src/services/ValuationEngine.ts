import { useTradeStore } from "../store/useTradeStore";
import { Asset } from "../types";
import { calculateTrend, calculateVolatility } from "../utils/finance";

class ValuationEngine {
    private static instance: ValuationEngine;
    private priceBuffers: Map<string, number[]> = new Map();
    private symbolToIdMap: Map<string, string> = new Map();

    private constructor() {
    }

    public static getInstance(): ValuationEngine {
        if (!ValuationEngine.instance) {
            ValuationEngine.instance = new ValuationEngine();
        }
        return ValuationEngine.instance;
    }

    public processUpdate(symbol: string, price: number): void {
        const id = this.symbolToIdMap.get(symbol);
        if (!id) return;

        const buffer = this.priceBuffers.get(id) || [];
        buffer.push(price);
        if (buffer.length > 5) buffer.shift();
        this.priceBuffers.set(id, buffer);

        const asset = useTradeStore.getState().assets[id];
        if (!asset) return;

        const trend = calculateTrend(buffer);
        const volatility = calculateVolatility(buffer);
        const pnl = (price - asset.purchasePrice) * asset.amount;

        useTradeStore.getState().updateAssetLiveFields(id, {
            currentPrice: price,
            pnl,
            volatility,
            trend
        });
    }

    public setSymbolMapping(assets: Asset[]) {
        assets.forEach(a => this.symbolToIdMap.set(a.symbol, a.id));
    }
}

export default ValuationEngine;