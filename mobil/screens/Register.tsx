import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/patient/register",
        { firstName, lastName, email, phone, nic, dob, gender, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      Alert.alert("Success", res.data.message);
      setIsAuthenticated(true);
      navigation.navigate("Home" as never);
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong");
    }
  };

  if (isAuthenticated) {
    navigation.navigate("Home" as never);
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <Text style={styles.subtitle}>Please Sign Up To Continue</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa voluptas expedita itaque ex, totam ad quod error?
      </Text>

      <View style={styles.row}>
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
      </View>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="NIC"
          value={nic}
          onChangeText={setNic}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (YYYY-MM-DD)"
          value={dob}
          onChangeText={setDob}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={setGender}
            style={styles.picker}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.loginRow}>
        <Text>Already Registered?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login" as never)}>
          <Text style={styles.loginLink}> Login Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegistration} color="#271776ca" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 4,
  },
  description: {
    marginBottom: 20,
    textAlign: "center",
    color: '#666',
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flex: 1,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    justifyContent: 'center',
    height: 50,
  },
  picker: {
    height: '100%',
    width: '100%',
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 15,
  },
  loginLink: {
    color: "#271776ca",
    textDecorationLine: "underline",
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default Register;