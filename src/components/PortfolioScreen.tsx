import React, { useCallback, useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTradeStore } from '../store/useTradeStore';
import { useInitializePortfolio } from '../hooks';
import AssetCard from './AssetCard';


function PortfolioScreen() {
    useInitializePortfolio();

    const assets = useTradeStore(state => state.assets);
    const isLoading = useTradeStore(state => state.isLoading);

    const LoadingScreen = () => (
        <View style={styles.container}>
            <Text style={styles.title}>Loading...</Text>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )

    const renderItem = useCallback(({ item }: { item: any }) => (
        <AssetCard symbol={item.symbol} price={item.currentPrice} />
    ), []);

    const AssetsList = () => (
        <View>
            <Text style={styles.title}>Portfolio Screen</Text>
            <FlatList
                data={Object.values(assets)}
                keyExtractor={(item) => item.symbol}
                renderItem={renderItem}
            />
        </View>

    )

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ?
                <LoadingScreen /> :
                <AssetsList />
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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