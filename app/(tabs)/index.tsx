import { useState, type FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';

import { useWalletStore } from '../../stores/wallet-stores';
import { getBalance, getTokens, getTxns } from '../../lib/fetchers';
import SolScanHeader from '../../components/SolScanHeader';
import SolAddressSearch from '../../components/SolAddressSearch';
import BalanceCard from '../../components/BalanceCard';
import TokensList from '../../components/TokensList';
import TransactionsList from '../../components/TransactionsList';

const WalletScreen: FC = () => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [tokens, setTokens] = useState<any[]>([]);
  const [txns, setTxns] = useState<any[]>([]);
  const addToHistory = useWalletStore(s => s.addToHistory);
  const searchHistory = useWalletStore(s => s.searchHistory);
  const isDevnet = useWalletStore(s => s.isDevnet);

  const search = async () => {
    const addr = address.trim();

    if (!addr) return Alert.alert('Enter a wallet address');

    setLoading(true);
    addToHistory(address);

    try {
      const [bal, tok, tx] = await Promise.all([getBalance(addr, isDevnet), getTokens(addr, isDevnet), getTxns(addr, isDevnet)]);
      setBalance(bal);
      setTokens(tok);
      setTxns(tx);
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }

    setLoading(false);
  };

  const searchFromHistory = (addr: string) => {
    setAddress(addr);
    addToHistory(addr);
    setLoading(true);
    Promise.all([getBalance(addr, isDevnet), getTokens(addr, isDevnet), getTxns(addr, isDevnet)])
      .then(([bal, tok, tx]) => {
        setBalance(bal);
        setTokens(tok);
        setTxns(tx);
      })
      .catch((e: unknown) => {
        const message = e instanceof Error ? e.message : "Unknown error";
        Alert.alert("Error", message);
      })
      .finally(() => setLoading(false));
  };

  const handleClear = () => {
    setAddress("");
    setBalance(null);
    setTokens([]);
    setTxns([]);
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView style={s.scroll}>
        <SolScanHeader />
        <SolAddressSearch
          address={address}
          loading={loading}
          search={search}
          setAddress={setAddress}
          handleClear={handleClear}
          balance={balance}
          searchFromHistory={searchFromHistory}
          searchHistory={searchHistory}
        />
        <BalanceCard address={address} balance={balance} />
        <TokensList tokens={tokens} />
        <TransactionsList txns={txns} />
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0D0D12',
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
});
