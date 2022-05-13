import axios from 'axios';

const url = 'http://localhost:5000/patients';

export const fetchPatients = () => axios.get(url);
