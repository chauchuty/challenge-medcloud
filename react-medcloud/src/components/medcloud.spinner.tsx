import { Spinner } from "react-bootstrap";

function MedCloudSpinner(props: { type: string }) {
  return <Spinner animation="border" size="sm" variant={props.type} />;
}

export default MedCloudSpinner;
