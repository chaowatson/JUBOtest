import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import agent from './agent';
import { getOrdersByPatient } from './orders';

const patientsAdapter = createEntityAdapter({
	selectId: (patient) => patient.Id,
});

export const browsePatients = createAsyncThunk(
	'patients/getPatients',
	async () => {
		const res = await agent.get(`/patients`);
		return res.data.patients;
	}
)

const patientsSlice = createSlice({
	name: 'patients',
	initialState: patientsAdapter.getInitialState({}),
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(browsePatients.fulfilled, (state, action) => {
				patientsAdapter.upsertMany(state, action.payload);
			})
			.addCase(getOrdersByPatient.fulfilled, (state, action) => {
				patientsAdapter.upsertOne(state, { ...state.entities[action.payload.patientId], orderId: action.payload.orders.map(item => item.Id) });
			})
	}
})

export default patientsSlice;