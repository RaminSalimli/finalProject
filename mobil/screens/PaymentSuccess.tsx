import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PaymentSuccess = () => (
  <View style={styles.container}>
    <Text style={styles.icon}>✅</Text>
    <Text style={styles.title}>Payment Successful!</Text>
    <Text style={styles.message}>Your appointment has been booked successfully.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#fff',
  },
  icon: {
    fontSize: 72,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default PaymentSuccess;