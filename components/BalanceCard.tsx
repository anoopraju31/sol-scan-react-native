import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FavoriteButton } from './FavoriteButton';
import { short } from '../lib/utils';

type Props = {
  balance: number | null;
  address: string;
};

const BalanceCard: FC<Props> = ({ address, balance }) => {
  if (balance === null) return null;

  return (
    <View style={s.card}>
      <View style={s.favoriteWrapper}>
        <FavoriteButton address={address.trim()} />
      </View>

      <Text style={s.label}>SOL Balance</Text>

      <View style={s.balanceRow}>
        <Text style={s.balance}>{balance.toFixed(4)}</Text>
        <Text style={s.sol}>SOL</Text>
      </View>

      <Text style={s.addr}>{short(address.trim(), 6)}</Text>
    </View>
  );
};

export default BalanceCard;

const s = StyleSheet.create({
  card: {
    backgroundColor: '#16161D',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    marginTop: 28,
    borderWidth: 1,
    borderColor: '#2A2A35',
  },
  favoriteWrapper: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  label: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 8,
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '700',
    letterSpacing: -1,
  },
  sol: {
    color: '#14F195',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  addr: {
    color: '#9945FF',
    fontSize: 13,
    fontFamily: 'monospace',
    marginTop: 16,
    backgroundColor: '#1E1E28',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
