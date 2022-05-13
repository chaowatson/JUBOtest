import React from 'react';
import Patient from './Patient/Patient';
import { useSelector } from 'react-redux';

const Patients = () => {
  const patients = useSelector((state) => state.patients);
  console.log(patients);
  return (
    <>
      <h1>Patients</h1>
      <Patient />
      <Patient />
    </>
  );
};

export default Patients;
