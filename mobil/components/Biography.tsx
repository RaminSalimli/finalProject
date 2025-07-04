import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from "react-native";

interface BiographyProps {
  imageSource: any;
}

const Biography: React.FC<BiographyProps> = ({ imageSource }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Biography</Text>
        <Text style={styles.subheading}>Who We Are</Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          blanditiis sequi aperiam. Debitis fugiat harum ex maxime illo
          consequatur mollitia voluptatem omnis nihil nesciunt beatae esse
          ipsam, sapiente totam aspernatur porro ducimus aperiam nisi. Ex magnam
          voluptatum consectetur reprehenderit fugiat recusandae aut similique
          illum natus velit, praesentium nostrum nesciunt. Deleniti, nesciunt
          laboriosam totam iusto!
        </Text>
        <Text style={styles.paragraph}>We are all in 2024!</Text>
        <Text style={styles.paragraph}>
          We are working on a MERN STACK PROJECT.
        </Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          assumenda exercitationem accusamus sit repellendus quo optio dolorum
          corporis corrupti. Quas similique vel minima veniam tenetur obcaecati
          atque magni suscipit laboriosam! Veniam vitae minus nihil cupiditate
          natus provident. Ex illum quasi pariatur odit nisi voluptas illo qui
          ipsum mollitia. Libero, assumenda?
        </Text>
        <Text style={styles.paragraph}>Lorem ipsum dolor sit amet!</Text>
        <Text style={styles.paragraph}>Coding is fun!</Text>
      </View>
    </ScrollView>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: "100%",
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: screenWidth - 32,
    height: 200,
    borderRadius: 8,
  },
  textContainer: {
    paddingBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  subheading: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
    color: "#444",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: "#555",
  },
});

export default Biography;