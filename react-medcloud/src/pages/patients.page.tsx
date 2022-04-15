import React, { useState, useEffect } from "react";
import PatientService from "../services/patient.service";
import Patient from "./../models/patient.model";

function TableCustom(props: { patients: Patient[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Data de Nascimento</th>
          <th>Email</th>
          <th>Endereço</th>
        </tr>
      </thead>
      <tbody>
        {props.patients.map((patient: Patient) => (
          <tr key={patient.id}>
            <td>{patient.id}</td>
            <td>{patient.name}</td>
            <td>{patient.birth_date.toLocaleString()}</td>
            <td>{patient.email}</td>
            <td>{patient.address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PatientsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [patients, setPatients] = useState([]);
  const service = new PatientService();

  useEffect(() => {
    service.getAll().then((data) => {
      setPatients(data);
      setIsLoaded(true);
    });
  }, []);

  return !isLoaded ? (
    <div>Loading...</div>
  ) : (
    <div>
      <TableCustom patients={patients} />
    </div>
  );
}

export default PatientsPage;
