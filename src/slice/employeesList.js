import { createSlice } from "@reduxjs/toolkit";
import { fetchList } from "../utils/utils";

export const employeesListSlice = createSlice({
	name: "employeesList",
	initialState: {
		list: [],
		status: "idle",
		error: null,
		statusMessage: null,
	},
	reducers: {
		fetchListStart: (state) => {
			state.status = "loading";
			state.error = null;
			state.statusMessage = null;
		},
		fetchListSuccess: (state, action) => {
			state.status = "success";
			state.list = action.payload;
			state.statusMessage = "Employees fetched successfully";
		},
		fetchListFailure: (state, action) => {
			state.status = "failed";
			state.error = action.payload;
			state.statusMessage = "Failed to fetch employees";
		},
	},
});

export const { fetchListStart, fetchListSuccess, fetchListFailure } =
	employeesListSlice.actions;

export const fetchEmployeesList = () => async (dispatch) => {
	try {
		dispatch(fetchListStart());
		const response = await fetchList();
		dispatch(fetchListSuccess(response.data));
	} catch (error) {
		dispatch(fetchListFailure(error.message));
	}
};

export const periodicDataFetching = () => async (dispatch) => {
    dispatch(fetchEmployeesList());
    setInterval(async () => {
        dispatch(fetchEmployeesList());
    }, 100000);
};

export default employeesListSlice.reducer;
