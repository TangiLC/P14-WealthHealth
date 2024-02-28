import { createSlice } from "@reduxjs/toolkit";

const modalDataSlice = createSlice({
	name: "modalData",
	initialState: {
		isModalOpen: false,
		modalMessage: null,
		modalTitle: null,
	},
	reducers: {
		toggleModal: (state) => {
			state.isModalOpen = !state.isModalOpen;
		},
		setTitle: (state, action) => {
			state.modalTitle = action.payload;
		},
		setMessage: (state, action) => {
			state.modalMessage = action.payload;
		},
	},
});

export const { toggleModal, setTitle, setMessage } = modalDataSlice.actions;
export default modalDataSlice.reducer;
