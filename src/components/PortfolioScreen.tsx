import React, { useCallback } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, FlatList, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTradeStore } from '../store/useTradeStore';
import { useInitializePortfolio } from '../hooks';
import AssetCard from './AssetCard';

const LoadingScreen = (style: any) => (
    <View style={style}>
        <ActivityIndicator size="large" color="#8989ca" />
    </View>
);

function PortfolioScreen() {
    useInitializePortfolio();

    const assetIds = useTradeStore(state => state.assetIds);
    const isLoading = useTradeStore(state => state.isLoading);
    const totalValue = useTradeStore(state => state.totalPortfolioValue);

    const renderItem = useCallback(({ item }: { item: any }) => (
        <AssetCard id={item} />
    ), []);

    const headerComponent = useCallback(() => (
        <View style={styles.container}>
            <Text style={styles.title}>Portfolio Screen</Text>
            <Text style={styles.totalValue}>Total Value: ${totalValue.toFixed(2)}</Text>
        </View>
    ), [totalValue]);

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ?
                <LoadingScreen style={styles.container} /> :
                <View>
                    <FlatList
                        data={assetIds}
                        ListHeaderComponent={headerComponent}
                        keyExtractor={(item) => item.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        stickyHeaderIndices={[0]}
                    />
                </View>
            }
        </SafeAreaView>
    )
}

export default PortfolioScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b6c2cc',
        padding: 20
    },
    totalValue: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',

    },
    assetContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    assetName: {
        fontSize: 18,
    },
    assetPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});