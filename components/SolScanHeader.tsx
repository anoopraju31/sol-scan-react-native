import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useWalletStore } from '../stores/wallet-stores';

const SolScanHeader: FC = () => {
  const isDevnet = useWalletStore((s) => s.isDevnet);
  const toggleNetwork = useWalletStore((s) => s.toggleNetwork);

  return (
    <View style={s.header}>
      <View>
        <Text style={s.title}>SolScan</Text>
        <Text style={s.subtitle}>Explore any Solana wallet</Text>
      </View>

      <TouchableOpacity style={s.networkToggle} onPress={toggleNetwork}>
        <View style={[s.networkDot, isDevnet && s.networkDotDevnet]} />
        <Text style={s.networkText}>{isDevnet ? 'Devnet' : 'Mainnet'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SolScanHeader;

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 28,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 15,
    marginBottom: 28,
    fontWeight: '400',
  },

  networkToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16161D',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A35',
    gap: 6,
  },
  networkDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#14F195',
  },
  networkDotDevnet: {
    backgroundColor: '#F59E0B',
  },
  networkText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '500',
  },
});
