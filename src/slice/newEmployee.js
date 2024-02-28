import { createSlice } from "@reduxjs/toolkit";

export const newEmployeeSlice = createSlice({
	name: "newEmployee",
	initialState: {
		firstName: null,
		lastName: null,
		dateOfBirth: 123,
		startDate: 123,
		department: null,
		street: null,
		city: null,
		zipCode: null,
		state: null,
	},
	reducers: {
		updateField: (state, action) => {
			const { field, value } = action.payload;
			state[field] = value;
		},
	},
});

export const { updateField } = newEmployeeSlice.actions;

export default newEmployeeSlice.reducer;
