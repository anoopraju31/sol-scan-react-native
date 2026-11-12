import type { FC } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

const TokenDetailsLoading:FC = () => {
  return (
    <View style={s.center}>
        <ActivityIndicator size="large" color="#14F195" />
      </View>
  )
}

export default TokenDetailsLoading

const s = StyleSheet.create({
    center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a1a",
  },
})