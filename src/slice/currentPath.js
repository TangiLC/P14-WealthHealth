import { createSlice } from "@reduxjs/toolkit";

//Slice for managing the current path state
const currentPathSlice = createSlice({
	name: "currentPath",
	initialState: "create",
	reducers: {
		setPath: (state, action) => {
			return action.payload;
		},
	},
});

export const { setPath } = currentPathSlice.actions;
export default currentPathSlice.reducer;
