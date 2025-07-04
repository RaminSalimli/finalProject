import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Home from "../../screens/Home";
import Appointment from "../../screens/Appointment";
import AboutUs from "../../screens/AboutUs";
import Register from "../../screens/Register";
import Login from "../../screens/Login";
import Doctors from "../../screens/Doctors";
import PaymentSuccess from "../../screens/PaymentSuccess";
import PaymentCancel from "../../screens/PaymentCancel";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

const MainApp = () => {
  const { setIsAuthenticated, setUser } = useAuth();

  return (
    <>
      <Navbar />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Appointment" component={Appointment} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Doctors" component={Doctors} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        <Stack.Screen name="PaymentCancel" component={PaymentCancel} />
      </Stack.Navigator>
    </>
  );
};

export default App;
