import React from "react";
import { Input } from '@mui/material'

const OrderEditContent = ({ value, setValue }) => {

	return <>
		<Input placeholder="Enter order message..." multiline value={value} onChange={e => setValue(e.target.value)} /> 
	</>
} 

export default OrderEditContent;