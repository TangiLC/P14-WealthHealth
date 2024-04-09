import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import DropDownComponent from "./";
import { extractBorderRadius } from "./utils";

describe("extractBorderRadius function", () => {
	it("returns the bottom radius when there is only one value", () => {
		const borderRadius = "5px";
		const side = "left";
		const result = extractBorderRadius(borderRadius, side);
		expect(result).toBe("5px");
	});

	it("returns the correct bottom radius when there are two values", () => {
		const borderRadius = "5px 10px";
		let side = "left";
		let result = extractBorderRadius(borderRadius, side);
		expect(result).toBe("5px");

		side = "right";
		result = extractBorderRadius(borderRadius, side);
		expect(result).toBe("10px");
	});

	it("returns the correct bottom radius when there are four values", () => {
		const borderRadius = "5px 10px 15px 20px";
		let side = "left";
		let result = extractBorderRadius(borderRadius, side);
		expect(result).toBe("10px");

		side = "right";
		result = extractBorderRadius(borderRadius, side);
		expect(result).toBe("20px");
	});

	it("logs an error message for unsupported format", () => {
		const spyConsoleError = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});
		const borderRadius = "5px 10px 15px";
		const side = "left";
		extractBorderRadius(borderRadius, side);
		expect(spyConsoleError).toHaveBeenCalledWith("Format non pris en charge");
		spyConsoleError.mockRestore();
	});
});

describe("DropDownComponent handleKeyDown function", () => {
	it("handles arrow keys correctly", () => {
		const handleChange = jest.fn();
		const list = ["Option 1", "Option 2", "Option 3"];
		const { getByText } = render(
			<DropDownComponent
				label="Test Dropdown"
				placeholder="Select an option"
				list={list}
				handleChange={handleChange}
			/>
		);

		const dropdown = getByText("Select an option");
		fireEvent.click(dropdown);

		fireEvent.keyDown(dropdown, { key: "ArrowDown" });
		const selectedItem1 = getByText("Option 1");
		expect(selectedItem1).toBeInTheDocument();

		fireEvent.keyDown(dropdown, { key: "ArrowDown" });
		const selectedItem2 = getByText("Option 2");
		expect(selectedItem2).toBeInTheDocument();

		fireEvent.keyDown(dropdown, { key: "ArrowUp" });
		expect(selectedItem1).toBeInTheDocument();
	});

	it("handles typing keys correctly", () => {
		const handleChange = jest.fn();
		const list = ["Option 1", "Option 2", "Option 3"];
		const { getByText } = render(
			<DropDownComponent
				label="Test Dropdown"
				placeholder="Select an option"
				list={list}
				handleChange={handleChange}
			/>
		);

		const dropdown = getByText("Select an option");
		fireEvent.click(dropdown);

		fireEvent.keyDown(dropdown, { key: "o" });
		const selectedItem1 = getByText("Option 1");
		expect(selectedItem1).toBeInTheDocument();

		fireEvent.keyDown(dropdown, { key: "p" });
		const selectedItem2 = getByText("Option 1");
		expect(selectedItem2).toBeInTheDocument();

		fireEvent.keyDown(dropdown, { key: "z" });
		expect(selectedItem2).toBeInTheDocument();
	});

	test("it selects and handles item click correctly", () => {
		const handleChange = jest.fn();
		const setSelectedItem = jest.fn();
		const setIsOpen = jest.fn();
		const options = ["Option 1", "Option 2", "Option 3"];

		const { getAllByTestId, getByText, queryByText } = render(
			<DropDownComponent
				label="Test Dropdown"
				placeholder="Select an option"
				list={options}
				handleChange={handleChange}
			/>
		);

		const dropdown = getByText("Select an option");
		fireEvent.click(dropdown);

		const itemToClick = getAllByTestId("dropdown-item");
		fireEvent.click(itemToClick[0]);
		expect(handleChange).toHaveBeenCalledWith("Option 1");

		expect(getByText("Option 1")).toBeInTheDocument();
		expect(queryByText("Option 2")).not.toBeInTheDocument();
	});
});
