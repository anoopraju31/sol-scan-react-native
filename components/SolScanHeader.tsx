import type { FC } from 'react'
import { StyleSheet, Text } from 'react-native'

const SolScanHeader:FC = () => {
  return (
    <>
        <Text style={s.title}>SolScan</Text>
        <Text style={s.subtitle}>Explore any Solana wallet</Text>
    </>
  )
}

export default SolScanHeader

const s = StyleSheet.create({
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#6B7280",
    fontSize: 15,
    marginBottom: 28,
    fontWeight: "400",
  },
})