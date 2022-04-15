import React, { useState, useEffect } from "react";

function PatientsPage() {
  const [patients, setPatients] = React.useState([]);

  useEffect(() => {
    fetch("https://eczbwstqo4.execute-api.sa-east-1.amazonaws.com/api/patient")
      .then((response) => response.json())
      .then((data) => setPatients(data));
  }, []);

  return (
    <ul>
      {patients.map((patient) => (
        <li key={patient['id']}>{patient['name']}</li>
      ))}
    </ul>
  );
}

export default PatientsPage;
