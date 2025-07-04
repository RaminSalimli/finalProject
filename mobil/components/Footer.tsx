import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

const hours = [
  { id: 1, day: 'Monday', time: '9:00 AM - 11:00 PM' },
  { id: 2, day: 'Tuesday', time: '12:00 PM - 12:00 AM' },
  { id: 3, day: 'Wednesday', time: '10:00 AM - 10:00 PM' },
  { id: 4, day: 'Thursday', time: '9:00 AM - 9:00 PM' },
  { id: 5, day: 'Friday', time: '3:00 PM - 9:00 PM' },
  { id: 6, day: 'Saturday', time: '9:00 AM - 3:00 PM' },
];

const Footer: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <Image
        source={{ uri: 'https://via.placeholder.com/100x40' }}
        style={styles.logo}
      />

      <View style={styles.section}>
        <Text style={styles.heading}>Quick Links</Text>
        <View style={styles.links}>
          <TouchableOpacity onPress={() => navigation.navigate('Home' as never)}>
            <Text style={styles.linkText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Appointment' as never)}>
            <Text style={styles.linkText}>Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Doctors' as never)}>
            <Text style={styles.linkText}>Doctors</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AboutUs' as never)}>
            <Text style={styles.linkText}>About</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Hours</Text>
        {hours.map((item) => (
          <View key={item.id} style={styles.hoursRow}>
            <Text style={styles.day}>{item.day}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Contact</Text>
        <View style={styles.contactRow}>
          <FontAwesome6 name="phone" size={18} color="#000" />
          <Text style={styles.contactText}>999-999-9999</Text>
        </View>
        <View style={styles.contactRow}>
          <MaterialIcons name="email" size={18} color="#000" />
          <Text style={styles.contactText}>zeelab@gmail.com</Text>
        </View>
        <View style={styles.contactRow}>
          <FontAwesome6 name="location-arrow" size={18} color="#000" />
          <Text style={styles.contactText}>Toronto, Canada</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    gap: 20,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  links: {
    gap: 4,
  },
  linkText: {
    fontSize: 14,
    color: '#007bff',
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  day: {
    fontWeight: '500',
  },
  time: {
    fontStyle: 'italic',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  contactText: {
    fontSize: 14,
  },
});

export default Footer;