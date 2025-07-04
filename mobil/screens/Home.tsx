import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Hero from '../components/Hero';
import Biography from '../components/Biography';
import Departments from '../components/Departments';
import MessageForm from '../components/MessageForm';

const Home: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Hero
       
      />
    <Biography imageSource={require('../assets/images/about.png')} />
      <Departments />
      <MessageForm />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
});

export default Home;