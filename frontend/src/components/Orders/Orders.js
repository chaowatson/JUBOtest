import React, { useEffect, useState } from "react"
import { Button, Dialog, DialogTitle, DialogContent, Box, DialogActions, CircularProgress } from '@mui/material'
import Order from "./Order"
import { useSelector, useDispatch } from "react-redux"
import { getOrdersByPatient } from "../../slices/orders"

const Orders = ({ open, onClose, patientId }) => {
	const dispatch = useDispatch();
	const patient = useSelector(state => state.patients.entities[patientId]);
	const [add, setAdd] = useState();

	useEffect(() => {
		dispatch(getOrdersByPatient({ patientId }));
	}, [dispatch, patientId])

	const handleClickAddOrder = () => setAdd(true);
	const closeAddOrder = () => setAdd(false);
	
	return (
		<Dialog open={open} fullWidth onClose={onClose} PaperProps={{sx: {backgroundColor: 'lightblue'}}}>
			<DialogTitle sx={{ display: 'flex', paddingY: 3, justifyContent: 'space-between'}}>
				{`${patient.Name}'s Orders`} 
				<Button variant="contained" onClick={handleClickAddOrder} disabled={add}>Add order</Button>
			</DialogTitle>
			<DialogContent>
				<Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
				{add && <Order patientId={patientId} isAdd onCancelAdd={closeAddOrder}  /> }
				{
					patient.orderId?.map(id => <Order patientId={patientId} orderId={id} />) ?? <CircularProgress size={30} sx={{ alignSelf: 'center', justifySelf: 'center' }} />
				}				
				</Box>
			</DialogContent>
			<DialogActions sx={{padding: 3, paddingTop: 0}}>
				<Button variant="contained" color="secondary" onClick={onClose}>Close</Button>
			</DialogActions>
		</Dialog>
	)
}

export default Orders