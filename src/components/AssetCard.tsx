import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AssetCardProps {
    symbol: string;
    price: number;
}

function AssetCard({ symbol, price }: AssetCardProps) {
    return (
        <View style={styles.assetContainer}>
            <Text style={styles.assetName}>{symbol}</Text>
            <Text style={styles.assetPrice}>${price.toFixed(2)}</Text>
        </View>
    );
}

export default AssetCard;

const styles = StyleSheet.create({
    assetContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    assetName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    assetPrice: {
        fontSize: 18,
        color: '#888',
    },
});