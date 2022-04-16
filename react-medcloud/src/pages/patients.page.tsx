import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import MedCloudEditModal from "../components/medcloud.editModal";
import MedCloudTable from "../components/medcloud.table";
import Patient from "../models/patient.model";
import PatientsService from "../service/patients.service";

function PatientPage() {
  const service = new PatientsService();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [show, setShow] = useState(false);
  const [patient, setPatient] = useState<Patient>(Patient.isEmpty());

  const columns = [
    { label: "#", field: "id" },
    { label: "Nome", field: "name" },
    { label: "Data Nascimento", field: "birth_date" },
    { label: "Email", field: "email" },
    { label: "Endereço", field: "address" },
    { label: "Ações", field: "actions" },
  ];

  useEffect(() => {
    service
      .getAll()
      .then((response) => response.json())
      .then((data) => {
        setPatients(data);
      });
  }, [show]);

  return (
    <>
      <div>Pacientes</div>
      {!show ? (
        <>
          <MedCloudTable
            columns={columns}
            rows={patients}
            hasAction={true}
            show={show}
            setShow={setShow}
            setPatient={setPatient}
          />
        </>
      ) : (
        <>
          <Spinner animation="grow" variant="warning" role="status">
            <span className="visually-hidden">Carregando Lista de Pacientes...</span>
          </Spinner>
        </>
      )}

      <MedCloudEditModal
        show={show}
        setShow={setShow}
        patient={patient}
        setPatient={setPatient}
      />
    </>
  );
}

export default PatientPage;
