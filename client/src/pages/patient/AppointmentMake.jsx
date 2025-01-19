import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const AppointmentMake = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    medicalInfo: "",
    photo: null,
    appointmentDate: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
      console.log(cal);
    })();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Appointment saved successfully");
      } else {
        console.error("Error saving appointment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    /* First make sure that you have installed the package */

    /* If you are using yarn */
    // yarn add @calcom/embed-react

    /* If you are using npm */
    // npm install @calcom/embed-react

    <Cal
      namespace="15min"
      calLink="vedant-dubey-snkiru/15min"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
};

export default AppointmentMake;
