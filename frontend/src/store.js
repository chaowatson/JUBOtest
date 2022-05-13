import { configureStore } from "@reduxjs/toolkit";
import ordersSlice from "./slices/orders";
import patientsSlice from "./slices/patients";

const store = configureStore({
	reducer: {
		orders: ordersSlice.reducer,
		patients: patientsSlice.reducer
	}
})

export default store;