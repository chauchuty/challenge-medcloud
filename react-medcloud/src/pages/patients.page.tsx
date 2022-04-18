import MedCloudNavBar from "../components/medcloud.navbar";
import MedCloudTable from "../components/medcloud.table";
import PatientService from "../service/patients.service";

function PatientsPage(){
    const service = new PatientService();
    
    const columns = [
        {label: 'Nome', field: 'name', type: 'text', required: true},
        {label: 'Data Nascimento', field: 'birth_date', type: 'date', required: true},
        {label: 'Email', field: 'email', type: 'email', required: true},
        {label: 'Endereço', field: 'address', type: 'text', required: true},
    ];
    
    return (
        <>
            <MedCloudNavBar />
            <MedCloudTable columns={columns} service={service} />
        </>
    );
}

export default PatientsPage