import React from "react";
import { ScrollView } from "react-native";
import Hero from "../components/Hero";
import Biography from "../components/Biography";

const AboutUs = () => {
  return (
    <ScrollView>
      <Hero
      
      />
      <Biography imageSource={require("../assets/images/about.png"  )} />
    </ScrollView>
  );
};

export default AboutUs;
