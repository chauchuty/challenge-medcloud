import axios from "axios";
import Patient from "./../models/patient.model";
class PatientService {
  baseUrl: string = "http://localhost:5000/";
//   baseUrl: string = "https://eczbwstqo4.execute-api.sa-east-1.amazonaws.com/";
  uri: string = "api/patient/";

  getAll() {
    return axios
      .get(this.baseUrl + this.uri)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  update(patient: Patient) {
    return axios
      .put(this.baseUrl + this.uri + patient.id, patient)
      .then((response) => {
          console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  delete(id: Number) {
    return axios
      .delete(this.baseUrl + this.uri + id)
      .then((response) => {
          console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }
}

export default PatientService;
