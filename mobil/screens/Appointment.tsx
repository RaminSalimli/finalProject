import React from "react";
import { ScrollView } from "react-native";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <ScrollView>
      <Hero
      />
      <AppointmentForm />
    </ScrollView>
  );
};

export default Appointment;