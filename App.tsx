import { useState, type FC } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  ScrollView, 
  StyleSheet, 
  Alert,
} from "react-native";

import { getBalance, getTokens, getTxns } from './lib/fetchers';
import SolScanHeader from './components/SolScanHeader';
import SolAddressSearch from './components/SolAddressSearch';
import BalanceCard from './components/BalanceCard';
import TokensList from './components/TokensList';
import TransactionsList from './components/TransactionsList';

const App:FC = () => {
const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [tokens, setTokens] = useState<any[]>([]);
  const [txns, setTxns] = useState<any[]>([]);

  const search = async () => {
    const addr = address.trim();
    if (!addr) return Alert.alert("Enter a wallet address");

    setLoading(true);
    try {
      const [bal, tok, tx] = await Promise.all([
        getBalance(addr),
        getTokens(addr),
        getTxns(addr),
      ]);
      setBalance(bal);
      setTokens(tok);
      setTxns(tx);
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
    setLoading(false);
  };

  const tryExample = () => {
    const example = "86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY";
    setAddress(example);
  };
 
  
    return (
    <SafeAreaView style={s.safe}>
      <ScrollView style={s.scroll}>
        <SolScanHeader />
        <SolAddressSearch 
          address={address} 
          loading={loading} 
          search={search} 
          setAddress={setAddress} 
          tryExample={tryExample}
        />
        <BalanceCard address={address} balance={balance} />
        <TokensList tokens={tokens} />
        <TransactionsList txns={txns} />
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0D0D12",
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
});