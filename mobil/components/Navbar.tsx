import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack"; // Əlavə edildi
// import Icon from "react-native-vector-icons/Feather";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Toast from "react-native-toast-message";

// Naviqasiya tipini təyin edin
type RootStackParamList = {
  Home: undefined;
  Appointment: undefined;
  Doctors: undefined;
  AboutUs: undefined;
  Register: undefined;
  Login: undefined;
  PaymentSuccess: undefined;
  PaymentCancel: undefined;
  ChatBox: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigation = useNavigation<NavigationProp>(); // Tip təyin edildi

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/user/patient/logout",
        { withCredentials: true }
      );
      Toast.show({ type: "success", text1: res.data.message });
      setIsAuthenticated(false);
      setShow(false);
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: err.response?.data?.message || "Error",
      });
    }
  };

  const goToLogin = () => {
    navigation.navigate("Login"); // Artıq düzgün işləyəcək
    setShow(false);
  };

  const navigateTo = (screenName: keyof RootStackParamList) => {
    setShow(false);
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      {show && (
        <ScrollView style={styles.navLinks}>
          <TouchableOpacity onPress={() => navigateTo("Home")}>
            <Text style={styles.link}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo("Appointment")}>
            <Text style={styles.link}>Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo("Doctors")}>
            <Text style={styles.link}>Doctors</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo("ChatBox")}>
            <Text style={styles.link}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo("AboutUs")}>
            <Text style={styles.link}>About Us</Text>
          </TouchableOpacity>

          {isAuthenticated ? (
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <Text style={styles.btnText}>LOGOUT</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.loginBtn} onPress={goToLogin}>
              <Text style={styles.btnText}>LOGIN</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.hamburger} onPress={() => setShow(!show)}>
        {/* <Icon name="menu" size={28} color="#000" /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },
  navLinks: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    backgroundColor: "#f9f9f9",
    zIndex: 10,
    padding: 16,
  },
  link: {
    fontSize: 18,
    marginVertical: 8,
    color: "#333",
  },
  loginBtn: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  logoutBtn: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  hamburger: {
    padding: 8,
  },
});

export default Navbar;
