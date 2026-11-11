import type { FC } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  address: string;
  setAddress: (address: string) => void;
  loading: boolean;
  search: () => void;
  tryExample: () => void;
};

const SolAddressSearch: FC<Props> = ({ address, loading, search, setAddress, tryExample }) => {
  return (
    <>
      <View style={s.inputContainer}>
        <TextInput
          style={s.input}
          placeholder="Enter wallet address..."
          placeholderTextColor="#6B7280"
          value={address}
          onChangeText={setAddress}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={s.btnRow}>
        <TouchableOpacity
          style={[s.btn, loading && s.btnDisabled]}
          onPress={search}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? <ActivityIndicator color="#000" /> : <Text style={s.btnText}>Search</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={s.btnGhost} onPress={tryExample} activeOpacity={0.7}>
          <Text style={s.btnGhostText}>Demo</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SolAddressSearch;

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

  inputContainer: {
    backgroundColor: '#16161D',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A35',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  input: {
    color: '#FFFFFF',
    fontSize: 15,
    paddingVertical: 14,
    fontWeight: '400',
  },

  btnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  btn: {
    flex: 1,
    backgroundColor: '#14F195',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#14F195',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: '#0D0D12',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  btnGhost: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: '#16161D',
    borderWidth: 1,
    borderColor: '#2A2A35',
  },
  btnGhostText: {
    color: '#9CA3AF',
    fontSize: 15,
    fontWeight: '500',
  },
});
