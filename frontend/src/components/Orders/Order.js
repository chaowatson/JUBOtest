import React, {useMemo, useState} from "react";
import { Button, Paper, Typography, Box } from '@mui/material'
import OrderEditContent from "./OrderEditContent";
import { useDispatch, useSelector } from "react-redux";
import { addOrderToPatient, editOrderById } from "../../slices/orders";

const Order = ({ patientId, orderId, isAdd, onCancelAdd }) => {
	const [edit, setEdit] = useState(false);
	const [editValue, setEditValue] = useState('')
	const order = useSelector(state => state.orders.entities[orderId]);
	const dispatch = useDispatch()
	const handleEditDone = () => {
		if (isAdd) {
			dispatch(addOrderToPatient({patientId, message: editValue}));
			onCancelAdd();
		}	else {
			if (edit) dispatch(editOrderById({patientId, orderId, message: editValue}));
			setEdit(state => !state);
			setEditValue(order?.Message);
		}
	}

	const handleEditCancel = () => {
		setEdit(false);
		setEditValue('');
		onCancelAdd();
	}
	
	const buttonText = useMemo(() => {
		if (isAdd) return 'Add';
		if (edit) return 'Done';
		return 'Edit';
	}, [isAdd, edit]);

	return <Paper sx={{padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
		{
			(isAdd || edit) ? 
				<OrderEditContent value={editValue} setValue={setEditValue} />
			:
				<Typography variant="body1">{ order?.Message }</Typography> 
		}
		
		<Box sx={{display: 'flex', gap: 1}}>
		{
			(isAdd || edit) &&  <Button onClick={ handleEditCancel } variant='contained' color="warning">Cancel</Button> }
			<Button onClick={ handleEditDone } variant={(isAdd || edit) ? 'contained' : null}>{ buttonText }</Button>
		</Box>
		
	</Paper>
} 

export default Order;