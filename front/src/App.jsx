import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
import Login from "./Pages/Login";
import Doctors from "./Pages/Doctors";
import ChatBox from "./Pages/ChatBox";
import PaymentSuccess from "./Pages/PaymentSuccess";
import PaymentCancel from "./Pages/PaymentCancel";
import  Hospital  from "./Pages/Hospital";
const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
<Route path="/payment-cancel" element={<PaymentCancel />} />
<Route path="/chat/:patientId" element={<ChatBox />} />
          <Route path="/login" element={<Login />} />
          <Route path="/xestexanamiz" element={<Hospital />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
