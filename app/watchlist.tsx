import { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';

import type { WatchlistItem } from '../types/watchlist';
import { useWalletStore } from '../stores/wallet-stores';
import { getRpc } from '../lib/fetchers';
import WatchListHeader from '../components/WatchListHeader';
import SavedWalletList from '../components/SavedWalletList';

export default function WatchlistScreen() {
  const favorites = useWalletStore((s) => s.favorites);
  const removeFavorite = useWalletStore((s) => s.removeFavorite);
  const isDevnet = useWalletStore((s) => s.isDevnet);
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBalances = useCallback(async () => {
    const rpc = getRpc(isDevnet);
    const results = await Promise.all(
      favorites.map(async (address) => {
        try {
          const res = await fetch(rpc, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              id: 1,
              method: 'getBalance',
              params: [address],
            }),
          });
          const json = await res.json();
          return {
            address,
            balance: (json.result?.value || 0) / 1e9,
            loading: false,
          };
        } catch {
          return { address, balance: null, loading: false };
        }
      }),
    );

    setItems(results);
  }, [favorites]);

  useEffect(() => {
    if (favorites.length > 0) {
      setItems(favorites.map((a) => ({ address: a, balance: null, loading: true })));
      fetchBalances();
    } else {
      setItems([]);
    }
  }, [favorites, fetchBalances]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBalances();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.container}>
        <WatchListHeader favorites={favorites} isDevnet={isDevnet} />
        <SavedWalletList
          favorites={favorites}
          items={items}
          onRefresh={onRefresh}
          refreshing={refreshing}
          removeFavorite={removeFavorite}
        />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0D0D12',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
});
