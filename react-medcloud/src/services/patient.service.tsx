import axios from 'axios'
class PatientService {
    baseUrl: string = 'https://eczbwstqo4.execute-api.sa-east-1.amazonaws.com/';
    uri: string = 'api/patient';

    getAll(){
        return axios.get(this.baseUrl + this.uri)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
                return [];
            });
    }
}

export default PatientService;