import { Box, Button, Paper, Typography} from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Orders from '../../Orders/Orders';

const Patient = ({ patientId }) => {
  const [ordersModalOpen, setOrdersModalOpen] = useState(false);
  const handleOpenOrderModal = () => setOrdersModalOpen(true);
  const handleCloseOrderModal = () => setOrdersModalOpen(false);

  const patient = useSelector(state => state.patients.entities[patientId])
  
  return (
    <>
      <Box sx={{width: '100%'}}>
        <Paper sx={{padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography variant='h5'>{ patient.Name }</Typography>
          <Button variant='contained' onClick={handleOpenOrderModal}>View Orders</Button>
        </Paper>
      </Box>
      <Orders patientId={patientId} open={ordersModalOpen} onClose={handleCloseOrderModal} />
    </>
  );  
};

export default Patient;
