import React from 'react';
import { Box } from '@mui/material';

import Header from './layouts/Header';
import Patients from './components/Patients/Patients'

const App = () => {

  return (
    <Box sx={{backgroundColor: 'lightcyan', width: '100%', height: '100vh'}}>
      <Header />
      <Patients />
    </Box>
  );
};

export default App;
