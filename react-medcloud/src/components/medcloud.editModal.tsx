import { useState, useEffect } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import Patient from "../models/patient.model";
import PatientsService from "../service/patients.service";
import moment from "moment";

function MedCloudEditModal(props: {
  show: boolean;
  setShow: any;
  patient: Patient;
  setPatient: any;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const service = new PatientsService();
  const handleClose = () => props.setShow(false);
  const handleShow = () => props.setShow(true);

  const handleUpdate = () => {
    setIsLoading(true);
    service.update(props.patient).then((response) => {
      setIsLoading(false);
      props.setShow(false);
    });
  };

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {isLoading ? (
          <>
            <div style={{ textAlign: "center" }}>
              <Spinner
                animation="grow"
                variant="info"
                role="status"
                
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </>
        ) : (
          <>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nome"
                  value={props.patient.name}
                  onChange={(e) =>
                    props.setPatient({ ...props.patient, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Data Nascimento</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Data Nascimento"
                  value={moment(props.patient.birth_date).format("YYYY-MM-DD")}
                  onChange={(e) =>
                    props.setPatient({
                      ...props.patient,
                      birth_date: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={props.patient.email}
                  onChange={(e) =>
                    props.setPatient({
                      ...props.patient,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Endereço"
                  value={props.patient.address}
                  onChange={(e) =>
                    props.setPatient({
                      ...props.patient,
                      address: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" size="sm" onClick={handleUpdate}>
          Atualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MedCloudEditModal;
