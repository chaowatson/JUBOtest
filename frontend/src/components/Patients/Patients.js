import React, { useEffect } from 'react';
import Patient from './Patient/Patient';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { browsePatients } from '../../slices/patients';

const Patients = () => {
  const patients = useSelector((state) => state.patients);
  const dispatch = useDispatch();

  console.log(patients);

  useEffect(() => {
    dispatch(browsePatients());
  }, [dispatch])

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3}}>
      <Box sx={{width: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
        {patients.ids.map(id => <Patient key={`patient-${id}`} patientId={id} /> )}
      </Box>
    </Box>
  );
};

export default Patients;
