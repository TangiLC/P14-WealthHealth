import { configureStore } from "@reduxjs/toolkit";

import languageReducer from "../features/Slice/language";
import currentPathSliceReducer from "../features/Slice/currentPath";
import employeesListReducer, {
	periodicDataFetching,
} from "../features/Slice/employeesList";
import newEmployeeReducer from "../features/Slice/newEmployee";
import dateReducer from "../features/Slice/date";

const store = configureStore({
	reducer: {
		employeesList: employeesListReducer,
		newEmployee: newEmployeeReducer,
		language: languageReducer,
		date: dateReducer,
		currentPath: currentPathSliceReducer,
	},
});

store.dispatch(periodicDataFetching());
export default store;
