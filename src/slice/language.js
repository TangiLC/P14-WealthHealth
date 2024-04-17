import { createSlice } from "@reduxjs/toolkit";

//Slice for managing the current display language
const languageSlice = createSlice({
	name: "language",
	initialState: "en",
	reducers: {
		setLanguage: (state, action) => {
			return action.payload;
		},
	},
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
