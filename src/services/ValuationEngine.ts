import { useTradeStore } from "../store/useTradeStore";
import { Asset } from "../types";
import { calculateTrend, calculateVolatility, calculateTotalValue } from "../utils/finance";

class ValuationEngine {
    private static instance: ValuationEngine;
    private priceBuffers: Map<string, number[]> = new Map();
    private heartbeatId: ReturnType<typeof setInterval> | null = null;

    private constructor() {
        this.startHeartbeat();
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

    private startHeartbeat(): void {
        this.heartbeatId = setInterval(() => {
            this.calculateAndSyncTotal();
        }, 1000);
    }

    public stop() {
        if (this.heartbeatId) {
            clearInterval(this.heartbeatId);
            this.heartbeatId = null;
        }
    }

    private calculateAndSyncTotal() {
        const state = useTradeStore.getState();
        const total = calculateTotalValue(state.assets);
        useTradeStore.setState({ totalPortfolioValue: total });
    }
}

export default ValuationEngine;