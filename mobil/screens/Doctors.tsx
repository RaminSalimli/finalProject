import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, FlatList } from "react-native";
import axios from "axios";
import Hero from "../components/Hero";

interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  doctorDepartment: string;
  email: string;
  phone: string;
  docAvatar?: {
    url: string;
  };
}

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/user/doctors")
      .then((res) => {
        setDoctors(res.data.doctors);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
      });
  }, []);

  return (
    <ScrollView>
      <Hero
      />
      
      <View style={styles.container}>
        <Text style={styles.title}>Our Doctors</Text>
        
        {doctors.length > 0 ? (
          <FlatList
            data={doctors}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                {item.docAvatar?.url && (
                  <Image
                    source={{ uri: item.docAvatar.url }}
                    style={styles.avatar}
                  />
                )}
                <Text style={styles.name}>
                  Dr. {item.firstName} {item.lastName}
                </Text>
                <Text style={styles.info}>Department: {item.doctorDepartment}</Text>
                <Text style={styles.info}>Email: {item.email}</Text>
                <Text style={styles.info}>Phone: {item.phone}</Text>
              </View>
            )}
            scrollEnabled={false}
          />
        ) : (
          <Text style={styles.noDoctors}>No doctors available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Doctors;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
    textAlign: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  noDoctors: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
    color: "#666",
  },
});