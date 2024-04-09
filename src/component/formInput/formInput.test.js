import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, queryByText } from "@testing-library/react";
import InputComponent from "./";

describe("InputComponent", () => {
	it("renders without crashing", () => {
		render(<InputComponent />);
	});

	it("renders label correctly", () => {
		const { getByText } = render(<InputComponent label="Test Label" />);
		expect(getByText("Test Label")).toBeInTheDocument();
	});

	it("handles input change correctly", () => {
		const handleChange = jest.fn();
		const { getByTestId, queryByText } = render(
			<InputComponent
				label="Test"
				handleChange={handleChange}
				regex={/^[0-9]+$/}
				errorMessage="Invalid input"
			/>
		);

		const input = getByTestId("input");
		fireEvent.change(input, { target: { value: "123" } });
		expect(handleChange).toHaveBeenCalledWith("123");
		expect(queryByText("Invalid input")).not.toBeInTheDocument();
	});

	it("handles displays error message on wrong input", () => {
		const handleChange = jest.fn();
		const { getByTestId, queryByText } = render(
			<InputComponent
				label="Test"
				handleChange={handleChange}
				regex={/^[0-9]+$/}
				errorMessage="ERROR MESSAGE"
			/>
		);

		const input = getByTestId("input");
		fireEvent.change(input, { target: { value: "ab$" } });
		expect(handleChange).not.toHaveBeenCalled();
		expect(queryByText("ERROR MESSAGE")).toBeInTheDocument();
	});
});
