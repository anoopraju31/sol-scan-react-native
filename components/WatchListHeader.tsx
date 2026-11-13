import type { FC } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  favorites: string[];
  isDevnet: boolean;
};

const WatchListHeader: FC<Props> = ({ favorites, isDevnet }) => {
  const router = useRouter();
  return (
    <>
      <TouchableOpacity style={s.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={s.title}>Watchlist</Text>
      <Text style={s.subtitle}>
        {favorites.length} wallet{favorites.length !== 1 ? 's' : ''} · {isDevnet ? 'Devnet' : 'Mainnet'}
      </Text>
    </>
  );
};

export default WatchListHeader;

const s = StyleSheet.create({
  backButton: {
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 15,
    marginBottom: 24,
  },
});
