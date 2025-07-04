import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
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

  const stripePromise = loadStripe("pk_test_51RgtnlLZzMiT7IKhNYEm2lt6FAPumTXv0Y6mGmZYHMBV5DmZMdLfisHxlwc1IOgkjHPP4rCgkdJcrgDxpWv6Vwzy00DVyxYWFu"); // Publishable key

  const handleStripePayment = async () => {
    const stripe = await stripePromise;
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/stripe/create-checkout-session",
      {},
      { withCredentials: true }
    );
    await stripe.redirectToCheckout({ sessionId: data.id });
  };
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

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
      console.log(data.doctors);
    };
    fetchDoctors();
  }, []);
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
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
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setNic(""),
        setDob(""),
        setGender(""),
        setAppointmentDate(""),
        setDepartment(""),
        setDoctorFirstName(""),
        setDoctorLastName(""),
        setHasVisited(""),
        setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Appointment</h2>
        <form onSubmit={handleAppointment}>
          <div>
            <input
              type="text"
              placeholder="Ad"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Soy ad"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobil nomrə"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="FIN"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <input
              type="date"
              placeholder="Dogum tarixi"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Cinsiyyət</option>
              <option value="Male">Kisi</option>
              <option value="Female">Qadin</option>
            </select>
            <input
              type="date"
              placeholder="Appointment Date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
          <div>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctorFirstName("");
                setDoctorLastName("");
              }}
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
            
            <select
              value={JSON.stringify({
                firstName: doctorFirstName,
                lastName: doctorLastName,
              })}
              onChange={(e) => {
                const { firstName, lastName } = JSON.parse(e.target.value);
                setDoctorFirstName(firstName);
                setDoctorLastName(lastName);
              }}
              disabled={!department}
            >
              <option value="">Həkim</option>
              {doctors
                .filter((doctor) => doctor.doctorDepartment === department)
                .map((doctor, index) => (
                  <option
                    key={index}
                    value={JSON.stringify({
                      firstName: doctor.firstName,
                      lastName: doctor.lastName,
                    })}
                  >
                    {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
            </select>
          </div>
          <textarea
            rows="10"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            
          </div>
          <button type="button" onClick={handleStripePayment}>
            Pay $20 and Get Appointment
          </button>
          <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
