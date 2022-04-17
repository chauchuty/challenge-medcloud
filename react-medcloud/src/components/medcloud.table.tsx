import moment from "moment";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Patient from "../models/patient.model";
import PatientService from "../service/patients.service";
import MedCloudSpinner from "./medcloud.spinner";
import Button from "react-bootstrap/Button";
import MedCloudModal from "./medcloud.modal";

function MedCloudTable() {
  const [show, setShow] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient>(Patient.empty());
  const service = new PatientService();

  useEffect(() => {
    if (show === false) {
      setPatients([]);
      service.getAll().then((response: any) => {
        setPatients(response.data);
      });
    }
  }, [show]);

  const handleEdit = (patient: Patient) => {
    setPatient(patient);
    setShow(true);
  };

  const handleDelete = (patient: Patient) => {
    console.log(patient);
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Data Nascimento</th>
            <th>Email</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient: Patient, index: number) => {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{patient.name}</td>
                  <td>{moment(patient.birth_date).format("DD/MM/YYYY")}</td>
                  <td>{patient.email}</td>
                  <td>{patient.address}</td>
                  <td>
                    <Button
                      onClick={() => handleEdit(patient)}
                      variant="secondary"
                      size="sm"
                      className="me-1"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(patient)}
                      variant="danger"
                      size="sm"
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                <MedCloudSpinner type="primary" />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <MedCloudModal patient={patient} show={show} setShow={setShow} />
    </>
  );
}

export default MedCloudTable;
