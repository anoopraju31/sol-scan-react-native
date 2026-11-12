import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import TokenCard from "../../components/TokenCard";

export default function SwapScreen() {
  const [fromAmount, setFromAmount] = useState("100");
  const [toAmount, setToAmount] = useState("0.28014");
  const [fromToken, setFromToken] = useState("USDC");
  const [toToken, setToToken] = useState("SOL");

  const swapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = () => {
    if (!fromAmount) return Alert.alert("Enter an amount");
    Alert.alert(
      "Swap",
      `Swapping ${fromAmount} ${fromToken} to ${toAmount} ${toToken}`,
    );
  };

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>
      <Text style={s.title}>Swap Tokens</Text>

      {/* From Token Card */}
      <View style={{ marginBottom: 10 }}>
        <TokenCard amount={fromAmount} setAmount={setFromAmount} token={fromToken} user="S" userBg="#9945FF" />
      </View>

      {/* Swap Arrow */}
      <View style={s.arrowContainer}>
        <TouchableOpacity style={s.swapArrow} onPress={swapTokens}>
          <Ionicons name="arrow-down" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      
      {/* To Token Card */}
    <TokenCard amount={toAmount} setAmount={setToAmount} token={toToken} user="$" userBg="#2775CA" />

      {/* Swap Button */}
      <TouchableOpacity style={s.swapBtn} onPress={handleSwap}>
        <Text style={s.swapBtnText}>Swap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#0D0D12",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  arrowContainer: {
    alignItems: "center",
    marginVertical: -22,
    zIndex: 10,
  },
  swapArrow: {
    backgroundColor: "#0D0D12",
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#0D0D12",
  },
  swapBtn: {
    backgroundColor: "#14F195",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 24,
  },
  swapBtnText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "600",
  },
});