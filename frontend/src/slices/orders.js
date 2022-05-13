import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import agent from './agent';
import { browsePatients } from './patients';

const ordersAdapter = createEntityAdapter({
	selectId: order => order.Id
});

export const getOrdersByPatient = createAsyncThunk(
	'orders/getOrdersByPatient',
	async ({ patientId }, { getState }) => {
		const patientOrderIds = getState().patients.entities[patientId].OrderId;

		const res = await Promise.all(patientOrderIds.map(async id => await (await agent.get(`/orders?Id=${id}`)).data.orders[0]));
		console.log(res);
		return { patientId, orders: res };
	}
)

export const addOrderToPatient = createAsyncThunk(
	'orders/addOrderToPatient',
	async ({ patientId, message }, { dispatch }) => {
		console.log(patientId);
		await agent.post('/orders', {PatientId: patientId, Message: message});
		await dispatch(browsePatients());
		await dispatch(getOrdersByPatient({ patientId }));
	}
)

export const editOrderById = createAsyncThunk(
	'orders/editOrderById',
	async ({patientId, orderId, message}, {dispatch}) => {
		await agent.patch('/orders', {OrderId: orderId, Message: message});
		await dispatch(browsePatients());
		await dispatch(getOrdersByPatient({ patientId }));
	}
)

const ordersSlice = createSlice({
	name: 'orders',
	initialState: ordersAdapter.getInitialState({}),
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getOrdersByPatient.fulfilled, (state, action) => {
				ordersAdapter.upsertMany(state, action.payload.orders);
			})
	}
})

export default ordersSlice;