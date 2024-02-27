import { configureStore } from "@reduxjs/toolkit";

import languageReducer from "../features/Slice/language";
import employeesReducer from "../features/Slice/employees";
import dateReducer from "../features/Slice/date";

const store = configureStore({
	reducer: {
		employees: employeesReducer,
		language: languageReducer,
		date: dateReducer,
	},
});
export default store;
