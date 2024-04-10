import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import SaveButton from "./";

describe("SaveButton", () => {
	test("renders with label and icon", () => {
		const label = "Save";
		const { getByText, getByTestId } = render(
			<SaveButton label={label} isClickable={true} handleSave={() => {}} />
		);
		expect(getByText(label)).toBeInTheDocument();
		expect(getByTestId("save-active")).toBeInTheDocument();
	});

	test("calls handleSave when clicked", () => {
		const handleSave = jest.fn();
		const { getByTestId } = render(
			<SaveButton label="Save" isClickable={true} handleSave={handleSave} />
		);
		fireEvent.click(getByTestId("save-active"));
		expect(handleSave).toHaveBeenCalled();
	});

	test("renders as inactive when isClickable is false", () => {
		const { getByTestId } = render(
			<SaveButton label="Save" isClickable={false} handleSave={() => {}} />
		);
		expect(getByTestId("save-inactive")).toBeInTheDocument();
	});
});
