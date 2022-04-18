import moment from "moment";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import MedCloudSpinner from "./medcloud.spinner";
import MedCloudModal from "./medcloud.modal";

function MedCloudTable(props: { columns: any[]; service: any }) {
  const [dataList, setDataList] = useState<any[]>([]);
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // setLoading(true);
    props.service.getAll().then((data: any) => {
      setDataList(data.data);
      console.log(data.data)
      // setLoading(false);
    });
  }, [show]); // Melhorar com redux

  const handleEdit = (data: any) => {
    Object.assign(data, { title: 'Editar', mode: 'edit', fields: props.columns });
    setData(data);
    setShow(true);
  };

  const handleDelete = (data: any) => {
    Object.assign(data, { title: 'Deletar', mode: 'delete' })
    setData(data);
    setShow(true);
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            {props.columns.map((column) => (
              <th key={column.field}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <>
              <tr className="text-center">
                <td colSpan={props.columns.length}>
                  <MedCloudSpinner type="primary" />
                </td>
              </tr>
            </>
          ) : (
            <>
              {dataList.map((data: any) => (
                <tr key={data.id}>
                  {props.columns.map((column) => (
                    <td key={column.field}>{data[column.field]}</td>
                  ))}
                  <td>
                    <Button variant="primary" size="sm" onClick={() => handleEdit(data)}>
                      Editar
                    </Button>{" "}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(data)}>
                      Deletar
                    </Button>
                  </td>
            
                </tr>
              ))}
            </>
          )}
        </tbody>
      </Table>
      <MedCloudModal show={show} setShow={setShow} data={data} service={props.service} />
    </>
  );
}

export default MedCloudTable;
