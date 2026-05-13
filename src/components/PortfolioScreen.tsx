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

    const renderItem = useCallback(({ item }: { item: any }) => (
        <AssetCard id={item} />
    ), []);

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ?
                <LoadingScreen style={styles.container} /> :
                <View>
                    <Text style={styles.title}>Portfolio Screen</Text>
                    <FlatList
                        data={assetIds}
                        keyExtractor={(item) => item.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
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