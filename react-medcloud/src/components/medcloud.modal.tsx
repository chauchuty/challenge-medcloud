import moment from "moment";
import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Patient from "../models/patient.model";
import PatientService from "../service/patients.service";
import MedCloudSpinner from "./medcloud.spinner";

function MedCloudModal(props: {
  patient: Patient;
  show: boolean;
  setShow: any;
}) {
  const service = new PatientService();
  const [patient, setPatient] = useState(props.patient);
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => props.setShow(false);

  const handleUpdate = () => {
    setIsLoading(true);
    service.update(patient).then((response: any) => {
      setIsLoading(false);
      props.setShow(false);
    });
  };

  useEffect(() => {
    setPatient(props.patient);
  }, [props.patient]);

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                defaultValue={patient.name}
                onChange={(e) =>
                  setPatient({ ...patient, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBirthDate">
              <Form.Label>Data Nascimento</Form.Label>
              <Form.Control
                type="date"
                defaultValue={moment(props.patient.birth_date).format(
                  "yyyy-MM-DD"
                )}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue={props.patient.email}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.patient.address}
                required
              />
            </Form.Group>
            <div className="d-grid gap-2">
              {isLoading ? (
                <>
                  <Button variant="primary" size="sm">
                    <MedCloudSpinner type="light" />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="primary" size="sm" onClick={handleUpdate}>
                    Atualizar
                  </Button>
                </>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MedCloudModal;
