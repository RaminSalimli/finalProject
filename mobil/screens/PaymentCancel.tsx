import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PaymentCancel = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>❌</Text>
      <Text style={styles.title}>Payment Cancelled</Text>
      <Text style={styles.message}>You can try again later.</Text>
    </View>
  );
};

export default PaymentCancel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
    backgroundColor: "#fff",
  },
  icon: {
    fontSize: 72,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  message: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
  },
});