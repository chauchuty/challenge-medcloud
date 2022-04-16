import axios from "axios";
import moment from 'moment'
import Patient from "../models/patient.model";

class PatientsService {
  async getAll() {
    return await fetch("http://localhost:5000/api/patients");
  }

  async update(patient: Patient) {

    return await axios.put("http://localhost:5000/api/patients/" + patient.id, {
      name: patient.name,
      birth_date: moment(patient.birth_date).format('yyyy-MM-DD'),
      email: patient.email,
      address: patient.address,
    });
    
  }
}
export default PatientsService;
