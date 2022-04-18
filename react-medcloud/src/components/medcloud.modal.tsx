import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import MedCloudForm from "./medcloud.form";
import MedCloudSpinner from "./medcloud.spinner";

function MedCloudModal(props: {
  show: any;
  setShow: any;
  data: any;
  service: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => props.setShow(false);

  useEffect(() => {
    console.log("<Modal>");
  }, []);

  const handleUpdate = () => {
    setIsLoading(true);
    props.service
      .update(props.data)
      .then((data: any) => {
        console.log(data)
        setIsLoading(false);
        props.setShow(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const handleDelete = () => {
    setIsLoading(true);
    props.service
      .delete(props.data)
      .then((data: any) => {
        setIsLoading(false);
        props.setShow(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.data?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.data?.mode === "edit" ? (
            <>
              <MedCloudForm data={props.data} />
            </>
          ) : (
            <></>
          )}

          {props.data?.mode === "delete" ? (
            <>
              <p>
                Você realmente deseja deletar?{" "}
                <b>
                  {props.data.name} (#{props.data.id})
                </b>
              </p>
            </>
          ) : (
            <></>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>

          {props.data?.mode === "edit" ? (
            <>
              <Button variant="primary" onClick={handleUpdate}>
                Atualizar
              </Button>
            </>
          ) : (
            <></>
          )}

          {props.data?.mode === "delete" ? (
            <>
              {isLoading ? (
                <>
                  <Button variant="danger">
                    <MedCloudSpinner type="light" />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="danger" onClick={handleDelete}>
                    Deletar
                  </Button>
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MedCloudModal;
