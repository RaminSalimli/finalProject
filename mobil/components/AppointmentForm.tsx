import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, Button, StyleSheet, Platform } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import axios from "axios";
import Toast from "react-native-toast-message";
import { Picker } from "@react-native-picker/picker";

const departmentsArray = [
  "Pediatrics",
  "Orthopedics",
  "Cardiology",
  "Neurology",
  "Oncology",
  "Radiology",
  "Physical Therapy",
  "Dermatology",
  "ENT",
];

interface Doctor {
  firstName: string;
  lastName: string;
  doctorDepartment: string;
}

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        Toast.show({ type: "error", text1: "Error fetching doctors" });
      }
    };
    fetchDoctors();
  }, []);

  const handleAppointment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      Toast.show({ type: "success", text1: data.message });
      resetForm();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message || "Something went wrong",
      });
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setNic("");
    setDob("");
    setGender("");
    setAppointmentDate("");
    setDepartment("Pediatrics");
    setDoctorFirstName("");
    setDoctorLastName("");
    setHasVisited(false);
    setAddress("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Appointment</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="NIC"
        value={nic}
        onChangeText={setNic}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth (YYYY-MM-DD)"
        value={dob}
        onChangeText={setDob}
      />
      <TextInput
        style={styles.input}
        placeholder="Appointment Date (YYYY-MM-DD)"
        value={appointmentDate}
        onChangeText={setAppointmentDate}
      />

      <Text style={styles.label}>Gender</Text>
      <Picker
        selectedValue={gender}
        onValueChange={setGender}
        style={styles.picker}
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>

      <Text style={styles.label}>Department</Text>
      <Picker
        selectedValue={department}
        onValueChange={(value) => {
          setDepartment(value);
          setDoctorFirstName("");
          setDoctorLastName("");
        }}
        style={styles.picker}
      >
        {departmentsArray.map((dept) => (
          <Picker.Item key={dept} label={dept} value={dept} />
        ))}
      </Picker>

      <Text style={styles.label}>Doctor</Text>
      <Picker
        selectedValue={`${doctorFirstName} ${doctorLastName}`}
        onValueChange={(value, index) => {
          if (index > 0) {
            const doc = doctors.find(d => 
              `${d.firstName} ${d.lastName}` === value
            );
            if (doc) {
              setDoctorFirstName(doc.firstName);
              setDoctorLastName(doc.lastName);
            }
          }
        }}
        style={styles.picker}
      >
        <Picker.Item label="Select Doctor" value="" />
        {doctors
          .filter((doc) => doc.doctorDepartment === department)
          .map((doc, index) => (
            <Picker.Item
              key={index}
              label={`${doc.firstName} ${doc.lastName}`}
              value={`${doc.firstName} ${doc.lastName}`}
            />
          ))}
      </Picker>

      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        numberOfLines={5}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      <View style={styles.checkboxContainer}>
        <CheckBox value={hasVisited} onValueChange={setHasVisited} />
        <Text style={styles.label}>Have you visited before?</Text>
      </View>

      <Button title="Get Appointment" onPress={handleAppointment} />

      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: "600",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    marginVertical: 6,
  }
});

export default AppointmentForm;