import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, FlatList } from "react-native";

interface Department {
  name: string;
  imageUrl: string;
}

const data: Department[] = [
  { name: "Pediatrics", imageUrl: "https://via.placeholder.com/150" },
  { name: "Orthopedics", imageUrl: "https://via.placeholder.com/150" },
  { name: "Cardiology", imageUrl: "https://via.placeholder.com/150" },
  { name: "Neurology", imageUrl: "https://via.placeholder.com/150" },
  { name: "Oncology", imageUrl: "https://via.placeholder.com/150" },
  { name: "Radiology", imageUrl: "https://via.placeholder.com/150" },
  { name: "Physical Therapy", imageUrl: "https://via.placeholder.com/150" },
  { name: "Dermatology", imageUrl: "https://via.placeholder.com/150" },
  { name: "ENT", imageUrl: "https://via.placeholder.com/150" },
];

const Departments = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Departments</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={styles.carousel}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 10,
  },
  carousel: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginRight: 16,
    width: 150,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Departments;