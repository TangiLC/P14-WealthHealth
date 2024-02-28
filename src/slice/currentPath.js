import { createSlice } from "@reduxjs/toolkit";

const currentPathSlice = createSlice({
	name: "currentPath",
	initialState: "home",
	reducers: {
		setPath: (state, action) => {
			return action.payload;
		},
	},
});

export const { setPath } = currentPathSlice.actions;
export default currentPathSlice.reducer;
