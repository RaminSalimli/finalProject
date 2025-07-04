import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const MessageForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleMessage = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/message/send',
        { firstName, lastName, email, phone, message },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      Toast.show({
        type: 'success',
        text1: res.data.message,
      });

      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Us A Message</Text>

      <View style={styles.row}>
        <TextInput
          placeholder="First Name"
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View style={styles.row}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Mobile Number"
          style={styles.input}
          keyboardType="numeric"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <TextInput
        placeholder="Message"
        multiline
        numberOfLines={5}
        value={message}
        onChangeText={setMessage}
        style={[styles.input, styles.textArea]}
      />

      <TouchableOpacity style={styles.button} onPress={handleMessage}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: 'https://via.placeholder.com/100x50' }}
        style={styles.vectorImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  vectorImage: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default MessageForm;