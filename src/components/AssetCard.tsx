import React, { useEffect, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, interpolateColor, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { useTradeStore } from '../store/useTradeStore';

interface AssetCardProps {
    id: number;
}

function AssetCard({ id }: AssetCardProps) {
    const asset = useTradeStore(state => state.assets[id]);
    if (!asset) return null;

    const flashValue = useSharedValue(0);


    useEffect(() => {
        if (asset.trend !== 'neutral') {
            flashValue.value = withSequence(
                withTiming(1, { duration: 100 }),
                withTiming(0, { duration: 400 })
            );
        }
    }, [asset.currentPrice]);

    const positivePnl = asset.pnl >= 0;

    const animatedStyle = useAnimatedStyle(() => {
        const targetColor = asset.trend === 'up' ? '#85fc98' : '#fa7871';
        const backgroundColor = interpolateColor(
            flashValue.value,
            [0, 1],
            ['transparent', targetColor]
        );
        return { backgroundColor };
    });

    return (
        <Animated.View style={[styles.assetContainer, animatedStyle]}>
            <View>
                <Text style={styles.symbol}>{asset.symbol}</Text>
                <Text style={styles.name}>{asset.name}</Text>
            </View>
            <View style={styles.rightColumn}>
                <Text style={[styles.price, { fontVariant: ['tabular-nums'] }]}>
                    ${asset.currentPrice.toFixed(2)}
                </Text>
                <Text style={{ color: positivePnl ? '#4CD964' : '#FF3B30' }}>
                    {positivePnl ? '+' : ''}${asset.pnl.toFixed(2)}
                </Text>
            </View>
        </Animated.View>
    );
}

export default memo(AssetCard);

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
    symbol: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 14,
        color: '#666',
    },
    rightColumn: {
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});