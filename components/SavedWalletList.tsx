import type { FC } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import type { WatchlistItem } from '../types/watchlist';
import NoWalletsSaved from './NoWalletsSaved';
import SavedWalletCard from './SavedWalletCard';

type Props = {
  favorites: string[];
  refreshing: boolean;
  onRefresh: () => Promise<void>;
  items: WatchlistItem[];
  removeFavorite: (address: string) => void;
};

const SavedWalletList: FC<Props> = ({ favorites, onRefresh, refreshing, items, removeFavorite }) => {
  if (favorites.length === 0) return <NoWalletsSaved />;

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.address}
      contentContainerStyle={{ paddingBottom: 100 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#14F195" colors={['#14F195']} />
      }
      renderItem={({ item }) => <SavedWalletCard item={item} removeFavorite={removeFavorite} />}
    />
  );
};

export default SavedWalletList;
