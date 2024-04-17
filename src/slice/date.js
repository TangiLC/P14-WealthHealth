import { createSlice } from "@reduxjs/toolkit";

//Slice for managing the current date
const dateSlice = createSlice({
	name: "date",
	initialState: new Date().toISOString().slice(0, 10),
	reducers: {},
});

export default dateSlice.reducer;
