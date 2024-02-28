import { createSlice } from "@reduxjs/toolkit";

export const newEmployeeSlice = createSlice({
	name: "newEmployee",
	initialState: {
		id: null,
		firstName: null,
		lastName: null,
		dateOfBirth: null,
		startDate: null,
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
