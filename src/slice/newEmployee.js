import { createSlice } from "@reduxjs/toolkit";

export const newEmployeeSlice = createSlice({
	name: "newEmployee",
	initialState: {
		firstName: null,
		lastName: null,
		dateOfBirth: 0,
		startDate: 0,
		department: null,
		street: null,
		city: null,
		zipCode: null,
		state: null,
		shortState: null,
	},
	reducers: {
		updateField: (state, action) => {
			const { field, value } = action.payload;
			state[field] = value;
		},
		resetFields: (state) => {
			state.firstName = null;
			state.lastName = null;
			state.dateOfBirth = 0;
			state.startDate = 0;
			state.department = null;
			state.street = null;
			state.city = null;
			state.zipCode = null;
			state.state = null;
			state.shortState = null;
		},
	},
});

export const { updateField, resetFields } = newEmployeeSlice.actions;

export default newEmployeeSlice.reducer;
