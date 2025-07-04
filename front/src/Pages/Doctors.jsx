import React, { useEffect, useState } from "react";
import axios from "axios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/user/doctors")
      .then((res) => {
        setDoctors(res.data.doctors);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
      });
  }, []);

  return (
    <div className="container1">
      <h1 style={{ textAlign: "center", margin: "2rem 0" }}>Həkimlərimiz</h1>
      <div className="doctors-list">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div key={doctor._id} className="doctor-card">
              {doctor.docAvatar?.url && (
                <img
                  src={doctor.docAvatar.url}
                  alt={`${doctor.firstName} ${doctor.lastName}`}
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
              )}
              <h3>
                {doctor.firstName} {doctor.lastName}
              </h3>
              <p>İxtisas: {doctor.doctorDepartment}</p>
              <p>Email: {doctor.email}</p>
              <p>Telefon: {doctor.phone}</p>
              
            </div>
          ))
        ) : (
          <p>Həkimlər tapılmadı.</p>
        )}
      </div>
    </div>
  );
};

export default Doctors;
