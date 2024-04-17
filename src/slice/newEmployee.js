import { createSlice } from "@reduxjs/toolkit";

//slice for managing creation of a new employee
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
			state.firstName = "";
			state.lastName = "";
			state.dateOfBirth = 0;
			state.startDate = 0;
			state.department = "";
			state.street = "";
			state.city = "";
			state.zipCode = "";
			state.state = "";
			state.shortState = "";
		},
	},
});

export const { updateField, resetFields } = newEmployeeSlice.actions;

export default newEmployeeSlice.reducer;
