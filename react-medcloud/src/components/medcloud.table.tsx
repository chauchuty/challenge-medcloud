import { Button, Spinner, Table } from "react-bootstrap";
import MedCloudModal from "./medcloud.editModal";
import { useEffect } from 'react';

function MedCloudTable(props: {
  columns: any[];
  rows: any[];
  hasAction: boolean;
  show: boolean;
  setShow: any;
  setPatient: any;
}) {

  const handleEdit = (row: any) => {
    props.setPatient(row);
    props.setShow(!props.show);
  };

  const handleDelete = (row: any) => {
    console.log(row);
  };

  return (
    <>
      {}
      <Table>
        <thead>
          <tr>
            {props.columns.map((column) => (
              <th key={column.field}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.rows.length == 0 ? (
            <tr>
              <td
                colSpan={props.columns.length}
                style={{ textAlign: "center" }}
              >
                <Spinner animation="grow" variant="info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </td>
            </tr>
          ) : (
            props.rows.map(
              (row) => (
                props.hasAction ? (
                  Object.assign(row, {
                    actions: (
                      <>
                        <Button
                          className="me-2"
                          size="sm"
                          variant="warning"
                          onClick={() => handleEdit(row)}
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(row)}
                        >
                          Delete
                        </Button>
                      </>
                    ),
                  })
                ) : (
                  <></>
                ),
                (
                  <tr key={row.id}>
                    {props.columns.map((column, index) => (
                      <td key={column.field + index}>{row[column.field]}</td>
                    ))}
                  </tr>
                )
              )
            )
          )}
        </tbody>
      </Table>
    </>
  );
}

export default MedCloudTable;
