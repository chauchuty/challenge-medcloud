import * as React from "react";
import moment from "moment";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Patient from "../models/patient.model";
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import PatientService from "../services/patient.service";
import TextField from "@mui/material/TextField/TextField";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import Alert from "@mui/material/Alert/Alert";
import Button from "@mui/material/Button/Button";

function MedTable(props: {
  patients: Patient[];
  service: PatientService;
  setPatients: any;
}) {
  const [open, setOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Nome",
      width: 150,
      editable: true,
    },
    {
      field: "birth_date",
      headerName: "Data Nascimento",
      width: 200,
      editable: true,
      renderCell: (params: any) => {
        return (
          <TextField
            type="date"
            defaultValue={moment(Date.parse(params.row.birth_date)).format(
              "YYYY-MM-DD"
            )}
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              params.api.updateRows([
                { ...params.row, birth_date: e.target.value },
              ])
            }
          />
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
    {
      field: "address",
      headerName: "Endereço",
      width: 110,
      editable: true,
    },
    {
      field: "options",
      headerName: "Ações",
      width: 100,
      renderCell: (params: any) => {
        return (
          <div>
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={() => onSave(params.row)}
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => props.service.delete(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const rows = props.patients;
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
      <Snackbar
      color="success"
        open={open}
        autoHideDuration={6000}
        message={snackMsg}
      />
    </div>
  );



  function onSave(row: Patient) {
    const patient = new Patient(
      row.id,
      row.name,
      moment(row.birth_date, "YYYY-MM-DD").toDate(),
      row.email,
      row.address
    );
    props.service.update(patient);
    props.service.getAll().then((patients) => {
      setOpen(true)
      setSnackMsg("Cadastrado com sucesso!")
      props.setPatients(patients);
    });
  }
}

export default MedTable;
