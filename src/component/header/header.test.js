import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { setPath } from "../../slice/currentPath";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Header from "./";

const mockStore = configureStore([]);

describe("Header Component", () => {
	let store;

	beforeEach(() => {
		store = mockStore({
			employeesList: {
				status: "success",
				error: null,
			},
			language: "en",
			date: new Date(),
			currentPath: "home",
		});
	});

	it("renders without crashing", () => {
		render(
			<Provider store={store}>
				<Router>
					<Header />
				</Router>
			</Provider>
		);
	});

	it("renders 'view' and 'create' buttons when currentPath is 'home'", () => {
		const initialState = {
			currentPath: "home",
			employeesList: { status: "success" },
		};
		const store = mockStore(initialState);

		const { getByTestId } = render(
			<Provider store={store}>
				<Router>
					<Header />
				</Router>
			</Provider>
		);

		expect(store.getState().currentPath).toBe("home");
		expect(getByTestId("view")).toBeInTheDocument();
		expect(getByTestId("create")).toBeInTheDocument();
	});

	it("renders 'create' button and hides 'view' button when currentPath is 'view'", () => {
		const initialState = {
			currentPath: "view",
			employeesList: { status: "success" },
		};
		const store = mockStore(initialState);

		const { getByTestId, queryByTestId } = render(
			<Provider store={store}>
				<Router>
					<Header />
				</Router>
			</Provider>
		);

		expect(store.getState().currentPath).toBe("view");
		expect(queryByTestId("view")).not.toBeInTheDocument();
		expect(getByTestId("create")).toBeInTheDocument();
	});

	it("renders 'view' button and hides 'create' button when currentPath is 'create'", () => {
		const initialState = {
			currentPath: "create",
			employeesList: { status: "success" },
		};
		const store = mockStore(initialState);

		const { getByTestId, queryByTestId } = render(
			<Provider store={store}>
				<Router>
					<Header />
				</Router>
			</Provider>
		);

		expect(store.getState().currentPath).toBe("create");
		expect(getByTestId("view")).toBeInTheDocument();
		expect(queryByTestId("create")).not.toBeInTheDocument();
	});
	it("changes path to 'View' on View button click", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<Router>
					<Header />
				</Router>
			</Provider>
		);

		fireEvent.click(getByTestId("view"));
		const actions = store.getActions();
		const ExpectedAction = actions.some(
			(action) =>
				action.type === "currentPath/setPath" && action.payload === "view"
		);
		expect(ExpectedAction).toBe(true);
	});

	it("changes path to 'Create' on Create button click", () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<Router>
					<Header />
				</Router>
			</Provider>
		);

		fireEvent.click(getByTestId("create"));
		const actions = store.getActions();
		const ExpectedAction = actions.some(
			(action) =>
				action.type === "currentPath/setPath" && action.payload === "create"
		);
		expect(ExpectedAction).toBe(true);
	});
	it("changes path to 'Home' on Home button click", () => {
		const initialState = {
			currentPath: "view",
			employeesList: { status: "success" },
		};
		const store = mockStore(initialState);

		const { getByTestId } = render(
			<Provider store={store}>
				<Router>
					<Header />
				</Router>
			</Provider>
		);

		fireEvent.click(getByTestId("home"));
		const actions = store.getActions();
		const ExpectedAction = actions.some(
			(action) =>
				action.type === "currentPath/setPath" && action.payload === "home"
		);
		expect(ExpectedAction).toBe(true);
	});
});
