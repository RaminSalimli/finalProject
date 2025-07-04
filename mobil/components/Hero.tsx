import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const Hero: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textBox}>
        <Text style={styles.title}>
          Welcome to ZeeCare Medical Institute | Your Trusted Healthcare
          Provider
        </Text>
        <Text style={styles.description}>
          ZeeCare Medical Institute is a state-of-the-art facility dedicated to
          providing comprehensive healthcare services with compassion and
          expertise. Our team of skilled professionals is committed to
          delivering personalized care tailored to each patient's needs. At
          ZeeCare, we prioritize your well-being, ensuring a harmonious journey
          towards optimal health and wellness.
        </Text>
      </View>

      <View style={styles.imageBox}>
        <Image
          source={require("../assets/images/hero.png")} // əsas şəkil
          style={styles.heroImage}
        />
        <Image
          source={require("../assets/images/Vector.png")} // overlay vektor şəkli
          style={styles.vectorImage}
        />
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  textBox: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },
  imageBox: {
    alignItems: "center",
    position: "relative",
  },
  heroImage: {
    width: width * 0.9,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  vectorImage: {
    width: 80,
    height: 40,
    position: "absolute",
    bottom: -20,
    right: 10,
    resizeMode: "contain",
  },
});

export default Hero;
