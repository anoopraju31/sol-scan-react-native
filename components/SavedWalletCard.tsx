import type { FC } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { WatchlistItem } from '../types/watchlist';
import { shortenAddress } from '../lib/utils';

type Props = {
  item: WatchlistItem;
  removeFavorite: (address: string) => void;
};

const SavedWalletCard: FC<Props> = ({ item, removeFavorite }) => {
  return (
    <TouchableOpacity
      style={s.card}
      onLongPress={() => {
        Alert.alert('Remove from Watchlist?', shortenAddress(item.address), [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => removeFavorite(item.address),
          },
        ]);
      }}
    >
      <View style={s.cardLeft}>
        <View style={s.iconBox}>
          <Ionicons name="wallet" size={20} color="#14F195" />
        </View>
        <Text style={s.cardAddress} numberOfLines={1}>
          {shortenAddress(item.address)}
        </Text>
      </View>
      <View style={s.cardRight}>
        {item.loading ? (
          <ActivityIndicator size="small" color="#14F195" />
        ) : item.balance !== null ? (
          <Text style={s.cardBalance}>{item.balance.toFixed(4)} SOL</Text>
        ) : (
          <Text style={s.cardError}>Error</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SavedWalletCard;

const s = StyleSheet.create({
  card: {
    backgroundColor: '#16161D',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2A2A35',
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#1E1E28',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardAddress: {
    color: '#9945FF',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  cardBalance: {
    color: '#14F195',
    fontSize: 16,
    fontWeight: '600',
  },
  cardError: {
    color: '#EF4444',
    fontSize: 14,
  },
});
