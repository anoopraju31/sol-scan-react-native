import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NoWalletsSaved: FC = () => {
  return (
    <View style={s.emptyContainer}>
      <Ionicons name="heart-outline" size={64} color="#2A2A35" />
      <Text style={s.emptyTitle}>No Wallets Saved</Text>
      <Text style={s.emptyText}>Search for a wallet and tap the heart to save it here.</Text>
    </View>
  );
};

export default NoWalletsSaved;

const s = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
  emptyText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },
});
