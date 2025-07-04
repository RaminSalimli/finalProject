import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <>
      <Hero
        title={"Randevunuzu Təyin Edin | Frekans Tibb Mərkəzi"}
        imageUrl={"/signin.png"}
      />
      <AppointmentForm/>
    </>
  );
};

export default Appointment;
