import type { FC } from 'react';
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { short } from '../lib/utils';

type Props = {
  tokens: any[];
};

const TokensList: FC<Props> = ({ tokens }) => {
  const router = useRouter();

  if (tokens.length === 0) return null;

  return (
    <>
      <Text style={s.section}>Tokens ({tokens.length})</Text>
      <FlatList
        data={tokens}
        keyExtractor={(t) => t.mint}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.push(`/token/${item.mint}`);
            }}
          >
            <View style={s.row}>
              <Text style={s.mint}>{short(item.mint, 6)}</Text>
              <Text style={s.amount}>{item.amount}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default TokensList;

const s = StyleSheet.create({
  section: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 32,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#16161D',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2A2A35',
  },
  mint: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'monospace',
    fontWeight: '500',
  },
  amount: {
    color: '#14F195',
    fontSize: 15,
    fontWeight: '600',
  },
});
