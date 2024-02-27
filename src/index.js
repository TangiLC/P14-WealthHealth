import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./component/header";
//import Footer from "./component/footer/footer";
import Home from "./pages/Home";
import ShowTable from "./pages/ShowTable";
import CreateEmployee from "./pages/CreateEmployee";
import store from "./utils/store";

//import "./styles/style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/table" element={<ShowTable />} />
					<Route path="/create" element={<CreateEmployee />} />
				</Routes>
				{/*<Footer />*/}
			</BrowserRouter>
		</React.StrictMode>
	</Provider>
);
