import { useState, useEffect, type FC } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useWalletStore } from '../../stores/wallet-stores';
import { getRpc } from '../../lib/fetchers';
import TokenDetailsLoading from '../../components/TokenDetailsLoading';

const TokenDetailScreen: FC = () => {
  const { mint } = useLocalSearchParams<{ mint: string }>();
  const router = useRouter();
  const isDevnet = useWalletStore(s => s.isDevnet);

  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch token metadata
    // For now, we'll use a simple approach
    // Later you can integrate Jupiter or Helius API for richer data
    fetchTokenInfo();
  }, [mint]);

  const fetchTokenInfo = async () => {
    try {
      const rpc = getRpc(isDevnet);
      // Using Solana RPC to get token supply info
      const res = await fetch(rpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getTokenSupply',
          params: [mint],
        }),
      });
      const json = await res.json();

      setTokenInfo({
        mint: mint,
        supply: json.result?.value?.uiAmount || 0,
        decimals: json.result?.value?.decimals || 0,
      });
    } catch (error) {
      console.error('Failed to fetch token info:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <TokenDetailsLoading />;

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView style={s.container}>
        {/* Back Button */}
        <TouchableOpacity style={s.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={s.backText}>Back</Text>
        </TouchableOpacity>

        {/* Token Header */}
        <View style={s.header}>
          <Text style={s.title}>Token Details</Text>
        </View>

        {/* Mint Address */}
        <View style={s.card}>
          <Text style={s.cardLabel}>Mint Address</Text>
          <Text style={s.mintAddress}>{mint}</Text>
        </View>

        {/* Token Info */}
        {tokenInfo && (
          <View style={s.card}>
            <View style={s.infoRow}>
              <Text style={s.infoLabel}>Total Supply</Text>
              <Text style={s.infoValue}>{tokenInfo.supply?.toLocaleString() || 'Unknown'}</Text>
            </View>
            <View style={s.divider} />
            <View style={s.infoRow}>
              <Text style={s.infoLabel}>Decimals</Text>
              <Text style={s.infoValue}>{tokenInfo.decimals}</Text>
            </View>
          </View>
        )}

        {/* View on Solscan */}
        <TouchableOpacity
          style={s.linkButton}
          onPress={() => {
            // We'll add Linking.openURL later
            // For now this is a placeholder
          }}
        >
          <Text style={s.linkButtonText}>View on Solscan ↗</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TokenDetailScreen;

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0D0D12',
  },
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardLabel: {
    color: '#888',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  mintAddress: {
    color: '#9945FF',
    fontSize: 13,
    fontFamily: 'monospace',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    color: '#888',
    fontSize: 14,
  },
  infoValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2a3e',
  },
  linkButton: {
    backgroundColor: '#9945FF20',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  linkButtonText: {
    color: '#9945FF',
    fontSize: 14,
    fontWeight: '600',
  },
});
