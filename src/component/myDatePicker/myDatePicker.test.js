import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import DatePickerComponent from "./";

import { extractBorderRadius } from "./utils";
import { createMonthTable, createYearTable, createDaysTable } from "./utils";

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

describe("createMonthTable function", () => {
	it("renders month table correctly", () => {
		const monthList = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const selectDate = new Date("2024-01-01");
		const onMonthClick = jest.fn();
		const focusStyle = { fontWeight: "bold" };

		const { container } = render(
			<div>
				{createMonthTable({ monthList, selectDate, onMonthClick, focusStyle })}
			</div>
		);

		const monthSelector = container.querySelector(".month-selector");
		expect(monthSelector).toBeInTheDocument();

		const monthRows = container.querySelectorAll(".month-row");
		expect(monthRows.length).toBe(3);
	});
});

describe("createYearTable function", () => {
	it("renders year table correctly", () => {
		const selectDate = new Date("2024-01-01");
		const dateRange = {
			min: new Date("2020-01-01"),
			max: new Date("2030-12-31"),
		};
		const onYearClick = jest.fn();
		const scrollToYear = jest.fn();
		const focusStyle = { fontWeight: "bold" };

		const { container } = render(
			<div>
				{createYearTable({
					selectDate,
					dateRange,
					onYearClick,
					scrollToYear,
					focusStyle,
				})}
			</div>
		);

		const yearSelector = container.querySelector(".year-selector");
		expect(yearSelector).toBeInTheDocument();

		const yearRows = container.querySelectorAll(".year-row");
		expect(yearRows.length).toBe(3);
	});
});

describe("DatePickerComponent", () => {
	it("renders with default props", () => {
		const defaultDate = new Date("2000-01-01");
		const handleChange = jest.fn();
		const { getByTestId } = render(
			<DatePickerComponent
				defaultDate={defaultDate}
				handleChange={handleChange}
			/>
		);
		expect(getByTestId("custom-label")).toBeInTheDocument();
		expect(getByTestId("date-input-container")).toBeInTheDocument();
	});

	it("opens date picker when clicked", () => {
		const defaultDate = new Date("2000-01-01");
		const handleChange = jest.fn();
		const { getByTestId } = render(
			<DatePickerComponent
				defaultDate={defaultDate}
				handleChange={handleChange}
			/>
		);
		const input = getByTestId("date-input-container");
		expect(input).toBeInTheDocument();
		fireEvent.click(input);
		const datePicker = getByTestId("DatePicker-container");
		expect(datePicker).toBeInTheDocument();
	});

	it("changes date when date clicked", () => {
		const defaultDate = new Date("2000-01-01");
		const handleChange = jest.fn();

		const { getByTestId, getByText } = render(
			<DatePickerComponent
				defaultDate={defaultDate}
				handleChange={handleChange}
			/>
		);

		const input = getByTestId("date-input-container");
		fireEvent.click(input);

		const dateToPick = getByText("25");
		fireEvent.click(dateToPick);
		expect(handleChange).toHaveBeenCalledWith("2000-01-25");
	});
	it("changes date when arrows clicked", () => {
		const defaultDate = new Date("2000-01-01");
		const handleChange = jest.fn();

		const { getByTestId, getByText } = render(
			<DatePickerComponent
				defaultDate={defaultDate}
				handleChange={handleChange}
			/>
		);

		const input = getByTestId("date-input-container");
		fireEvent.click(input);

		const yearMinus = getByTestId("year-minus");
		fireEvent.click(yearMinus);
		expect(handleChange).toHaveBeenCalledWith("1999-01-01");
		const yearPlus = getByTestId("year-plus");
		fireEvent.click(yearPlus);
		fireEvent.click(yearPlus);
		expect(handleChange).toHaveBeenCalledWith("2001-01-01");

		const monthMinus = getByTestId("month-minus");
		fireEvent.click(monthMinus);
		fireEvent.click(monthMinus);
		expect(handleChange).toHaveBeenCalledWith("2000-11-01");
		const monthPlus = getByTestId("month-plus");
		fireEvent.click(monthPlus);
		expect(handleChange).toHaveBeenCalledWith("2000-12-01");

		const resetDate = getByTestId("reset-date");
		fireEvent.click(resetDate);
		expect(handleChange).toHaveBeenCalledWith("2000-01-01");
	});

	it("changes date within range when date input by keyboard", () => {
		const defaultDate = new Date("2000-01-01");
		const dateRange = {
			min: new Date("1990-01-01"),
			max: new Date("2025-01-01"),
		};
		const handleChange = jest.fn();

		const { getByTestId } = render(
			<DatePickerComponent
				defaultDate={defaultDate}
				handleChange={handleChange}
				dateRange={dateRange}
			/>
		);
		const input = getByTestId("date-input");
		fireEvent.change(input, { target: { value: "2022-02-22" } });
		fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
		expect(handleChange).toHaveBeenCalledWith("2022-02-22");
		fireEvent.change(input, { target: { value: "2026-01-11" } });
		fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
		expect(handleChange).toHaveBeenCalledWith("2025-01-01");
		fireEvent.change(input, { target: { value: "1900-01-01" } });
		fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
		expect(handleChange).toHaveBeenCalledWith("1990-01-01");
		fireEvent.change(input, { target: { value: "abcd" } });
		fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
		expect(handleChange).toHaveBeenCalledWith("1990-01-01");
	});

	it("changes date within min range when date input by keyboard", () => {
		const defaultDate = new Date("2000-01-01");
		const dateRange = {
			min: new Date("1990-01-01"),
		};
		const handleChange = jest.fn();

		const { getByTestId } = render(
			<DatePickerComponent
				defaultDate={defaultDate}
				handleChange={handleChange}
				dateRange={dateRange}
			/>
		);
		const input = getByTestId("date-input");
		fireEvent.change(input, { target: { value: "1900-01-01" } });
		fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
		expect(handleChange).toHaveBeenCalledWith("1990-01-01");
	});

	it("changes date within max range when date input by keyboard", () => {
		const defaultDate = new Date("2000-01-01");
		const dateRange = {
			max: new Date("2024-01-01"),
		};
		const handleChange = jest.fn();

		const { getByTestId } = render(
			<DatePickerComponent
				defaultDate={defaultDate}
				handleChange={handleChange}
				dateRange={dateRange}
			/>
		);
		const input = getByTestId("date-input");
		fireEvent.change(input, { target: { value: "2025-01-01" } });
		fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
		expect(handleChange).toHaveBeenCalledWith("2024-01-01");
	});
});
