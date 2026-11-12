import type { FC } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type Props = {
    amount: string;
    setAmount: (amount: string) => void;
    token: string;
    user: string;
    userBg: string;
}

const TokenCard:FC<Props> = ({amount, setAmount, token, user, userBg}) => {
  return (
    <View style={s.card}>
        <View style={s.cardHeader}>
          <TouchableOpacity style={s.tokenSelector}>
            <View style={[s.tokenIcon, { backgroundColor: userBg }]}>
              <Text style={s.tokenIconText}>{user}</Text>
            </View>
            <Text style={s.tokenName}>{token}</Text>
            <Ionicons name="chevron-down" size={18} color="#888" />
          </TouchableOpacity>
          <TextInput
            style={s.amountInput}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#666"
          />
        </View>
        <View style={s.cardFooter}>
          <Text style={s.balanceText}>Balance: 0.0661 {token}</Text>
          <Text style={s.usdText}>$499.749</Text>
        </View>
      </View>
  )
}

export default TokenCard

const s = StyleSheet.create({
    card: {
    backgroundColor: "#1A1A24",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2A2A35",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tokenSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252530",
    paddingLeft: 8,
    paddingRight: 12,
    paddingVertical: 8,
    borderRadius: 24,
    gap: 6,
  },
  tokenIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  tokenIconText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  tokenName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  amountInput: {
    fontSize: 40,
    fontWeight: "400",
    color: "#FFFFFF",
    textAlign: "right",
    flex: 1,
    marginLeft: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  balanceText: {
    fontSize: 14,
    color: "#666666",
  },
  usdText: {
    fontSize: 14,
    color: "#666666",
  },
})