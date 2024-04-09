import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import StatusIcon from "./";

describe("StatusIcon component", () => {
	it("renders loading status correctly", () => {
		const { getByText, getByTestId } = render(<StatusIcon status="loading" />);
		expect(getByTestId("spinner")).toBeInTheDocument();
		expect(getByText("loading...")).toBeInTheDocument();
	});

	it("renders failed status correctly", () => {
		const errorMessage = "Data loading failed";
		const { getByTestId } = render(
			<StatusIcon status="failed" error={errorMessage} />
		);
		expect(getByTestId("notSpinner")).toBeInTheDocument();
		expect(getByTestId("message")).toBeInTheDocument();
		expect(getByTestId("message")).toHaveTextContent("error :");
		expect(getByTestId("message")).toHaveTextContent(errorMessage);
	});

	it("renders success status correctly", () => {
		const { getByText } = render(<StatusIcon status="success" />);
		expect(getByText("data loaded sucessfully")).toBeInTheDocument();
	});

	it("renders default status correctly", () => {
		const { getByTestId } = render(<StatusIcon />);
		expect(getByTestId("spinner")).toBeInTheDocument();
	});
});
