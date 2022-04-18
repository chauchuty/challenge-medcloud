import axios from 'axios'
import moment from 'moment'
import Patient from '../models/patient.model';

class PatientService {
    private API_URL = 'http://localhost:5000/api/patients';

    getAll(){
        return axios.get(`${this.API_URL}`);
    }

    update(patient: Patient){
        return axios.put(`${this.API_URL}/${patient.id}`, {...patient, birth_date: moment(patient.birth_date).format('YYYY-MM-DD')});
    }

    delete(patient: Patient){
        return axios.delete(`${this.API_URL}/${patient.id}`);
    }
}

export default PatientService