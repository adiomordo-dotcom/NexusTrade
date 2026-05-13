import { calculateTrend, calculateVolatility, calculatePNL, calculateTotalValue } from '../finance';

describe('Finance Utils', () => {
    describe('calculateTrend', () => {
        it('should return "up" when current price is higher than previous', () => {
            expect(calculateTrend([100, 105])).toBe('up');
        });

        it('should return "down" when current price is lower than previous', () => {
            expect(calculateTrend([105, 100])).toBe('down');
        });

        it('should return "neutral" when current price is equal to previous', () => {
            expect(calculateTrend([100, 100])).toBe('neutral');
        });

        it('should return "neutral" when there are less than 2 prices', () => {
            expect(calculateTrend([100])).toBe('neutral');
        });
    });

    describe('calculateVolatility', () => {
        it('should return "Volatile" when price changes more than 1%', () => {
            expect(calculateVolatility([100, 102])).toBe('Volatile');
        });

        it('should return "Stable" when price changes less than or equal to 1%', () => {
            expect(calculateVolatility([100, 101])).toBe('Stable');
        });

        it('should return "Stable" when there minimum price is 0', () => {
            expect(calculateVolatility([0, 100])).toBe('Stable');
        });

        it('should return "Stable" when there are less than 2 prices', () => {
            expect(calculateVolatility([100])).toBe('Stable');
        });
    });

    describe('calculatePNL', () => {
        it('should calculate correct PNL', () => {
            expect(calculatePNL(110, 100, 10)).toBe(100);
            expect(calculatePNL(90, 100, 10)).toBe(-100);
            expect(calculatePNL(100, 100, 10)).toBe(0);
        });
    });

    describe('calculateTotalValue', () => {
        it('should calculate total value of assets', () => {
            const assets = {
                'AAPL': { id: '1', symbol: 'AAPL', name: 'Apple', currentPrice: 150, amount: 10, purchasePrice: 140 },
                'GOOG': { id: '2', symbol: 'GOOG', name: 'Google', currentPrice: 2000, amount: 5, purchasePrice: 1900 },
            };
            expect(calculateTotalValue(assets)).toBe(150 * 10 + 2000 * 5);
        });

        it('should return 0 when there are no assets', () => {
            expect(calculateTotalValue({})).toBe(0);
        });
    });
});