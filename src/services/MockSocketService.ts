import { useTradeStore } from "../store/useTradeStore";
import { Asset } from "../types";
import ValuationEngine from './ValuationEngine';

class MockSocketService {
    private static instance: MockSocketService;
    private socket: WebSocket | null = null;
    private mockTimer: ReturnType<typeof setInterval> | null = null;
    private connectTimeout: ReturnType<typeof setTimeout> | null = null;
    private prices: Map<string, number> = new Map();

    private constructor() { }

    public static getInstance(): MockSocketService {
        if (!MockSocketService.instance) {
            MockSocketService.instance = new MockSocketService();
        }
        return MockSocketService.instance;
    }

    public connect(): void {
        if (this.mockTimer) return;
        console.log('⚡️ [MOCK MODE] Starting mock data stream...');
        this.startMocking();
    }

    public disconnect(): void {
        this.stopMocking();
        if (this.connectTimeout) {
            clearTimeout(this.connectTimeout);
            this.connectTimeout = null;
        }
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    private startMocking(): void {
        if (this.mockTimer) return;
        useTradeStore.getState().setConnectionStatus('connected');
        this.mockTimer = setInterval(() => {
            this.prices.forEach((_, symbol) => {
                this.generateUpdate(symbol);
            });
        }, 200);
    }

    private stopMocking(): void {
        if (this.mockTimer) {
            clearInterval(this.mockTimer);
            this.mockTimer = null;
        }
        useTradeStore.getState().setConnectionStatus('disconnected');
    }

    public start(assets: Asset[]): void {
        ValuationEngine.getInstance().setSymbolMapping(assets);
        assets.forEach(asset => {
            console.log(`Seeding ${asset.symbol} with ${asset.purchasePrice}`);
            this.prices.set(asset.symbol, asset.purchasePrice);
        });
        this.startMocking();
    }

    private generateUpdate(symbol: string): void {
        const currentPrice = this.prices.get(symbol) || 0;
        if (currentPrice === 0) {
            console.warn(`Price for ${symbol} is 0. Check seeding logic.`);
        }
        const changePercent = 1 + (Math.random() - 0.5) * 0.004;
        const nextPrice = currentPrice * changePercent;
        console.log(`[Mock] ${symbol}: ${currentPrice.toFixed(2)} -> ${nextPrice.toFixed(2)}`);
        this.prices.set(symbol, nextPrice);
        ValuationEngine.getInstance().processUpdate(symbol, nextPrice);
    }
}

export default MockSocketService;