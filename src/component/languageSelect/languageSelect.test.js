import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import LanguageSelect from "./";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("LanguageSelect Component", () => {
	it("renders language selection menu", () => {
		const initialState = { language: "en" };
		const store = mockStore(initialState);

		const { getByTestId } = render(
			<Provider store={store}>
				<LanguageSelect />
			</Provider>
		);
		expect(getByTestId("language-toggle")).toBeInTheDocument();
	});

	it("toggles language selection menu when clicking on flag", () => {
		const initialState = { language: "en" };
		const store = mockStore(initialState);

		const { getByTestId, getByText, queryByTestId } = render(
			<Provider store={store}>
				<LanguageSelect />
			</Provider>
		);

		const toggleButton = getByTestId("language-toggle");
		fireEvent.click(toggleButton);

		const frenchLanguageButton = getByText("fr");
		fireEvent.click(frenchLanguageButton);
		const actions = store.getActions();
		const ExpectedAction = actions.some(
			(action) =>
				action.type === "language/setLanguage" && action.payload === "fr"
		);
		expect(ExpectedAction).toBe(true);
	});
});
