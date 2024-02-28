import { configureStore } from "@reduxjs/toolkit";

import currentPathSliceReducer from "../slice/currentPath";
import employeesListReducer from "../slice/employeesList";
import newEmployeeReducer from "../slice/newEmployee";
import modalDataReducer from "../slice/modalData";
import languageReducer from "../slice/language";
import dateReducer from "../slice/date";

import { periodicDataFetching } from "../slice/employeesList";

const store = configureStore({
	reducer: {
		employeesList: employeesListReducer,
		newEmployee: newEmployeeReducer,
		currentPath: currentPathSliceReducer,
		modal: modalDataReducer,
		language: languageReducer,
		date: dateReducer,
	},
});

store.dispatch(periodicDataFetching());
export default store;
