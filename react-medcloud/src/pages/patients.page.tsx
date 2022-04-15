import React, { useState, useEffect } from "react";
import PatientService from "../services/patient.service";
import TableCustom from "../components/medtable.custom";
import { Button } from "@mui/material";
import MedTable from "../components/medtable.custom";

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
      <MedTable patients={patients} setPatients={setPatients} service={service}/>
    </div>
  );
}

export default PatientsPage;
