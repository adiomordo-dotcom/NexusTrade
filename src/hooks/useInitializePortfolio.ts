import React, { useEffect } from 'react';
import { MockSocketService, fetchPortfolio } from '../services';
import { useTradeStore } from '../store/useTradeStore';

function useInitializePortfolio() {
    let isMounted = true;

    useEffect(() => {
        const service = MockSocketService.getInstance();
        service.connect();
        const loadPortfolio = async () => {
            try {
                useTradeStore.setState({ isLoading: true });
                const portfolio = await fetchPortfolio();
                if (!isMounted) return;
                useTradeStore.getState().setAssets(portfolio);
                service.start(portfolio);
            } catch (error) {
                if (isMounted) {
                    console.error('Error fetching portfolio:', error);
                }
            } finally {
                if (isMounted) {
                    useTradeStore.setState({ isLoading: false });
                }
            }
        };
        loadPortfolio();

        return () => {
            isMounted = false;
            service.disconnect();
        };
    }, []);
}

export default useInitializePortfolio;