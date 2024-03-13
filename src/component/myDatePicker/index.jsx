import React, { useState, useRef, useEffect } from "react";
import { extractBorderRadius, createMonthTable } from "./utils";
import {
	addChevronOpenDefaultStyle,
	addChevronClosedDefaultStyle,
	addDatePickerDefaultStyle,
	addDatePickerInputDefaultStyle,
	addFocusedDefaultStyle,
	addLabelDefaultStyle,
	defaultNames,
} from "./const";

const DatePickerComponent = ({
	language,
	label,
	labelStyle,
	placeholder,
	arrow,
	arrowStyle,
	defaultDate,
	dateRange,
	datesLabels,
	datePickerStyle,
	datePickerInputStyle,
	datePickerCalendarStyle,
	focusedStyle,
	handleChange,
	isError,
}) => {
	const names = datesLabels || defaultNames;
	const [initDate, setInitDate] = useState(new Date(defaultDate) || new Date());
	const [showDate, setShowDate] = useState(initDate);
	const [selectedDate, setSelectedDate] = useState(initDate);

	const [isOpen, setIsOpen] = useState(false);
	const DatePickerRef = useRef(null);

	const [DatePickerWidth, setDatePickerWidth] = useState(null);
	const [DatePickerPosition, setDatePickerPosition] = useState(0);
	const [resizedWindow, setResizedWindow] = useState(null);

	useEffect(() => {
		if (isOpen && DatePickerRef.current) {
			const thisWidth = DatePickerRef.current.offsetWidth;
			setDatePickerWidth(thisWidth);
			const leftPadding = window.getComputedStyle(
				DatePickerRef.current
			).paddingLeft;
			const leftMargin = window.getComputedStyle(
				DatePickerRef.current
			).marginLeft;
			const leftPosition =
				"-" +
				(
					1 +
					parseInt(leftPadding.substring(0, leftPadding.length - 2)) +
					parseInt(leftMargin.substring(0, leftMargin.length - 2))
				).toString() +
				"px";
			setDatePickerPosition(leftPosition);
		}
		const handleResize = () => {
			setResizedWindow(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [isOpen, resizedWindow]);

	useEffect(() => {
		if (isOpen) {
			DatePickerRef.current.focus();
		}
	}, [isOpen, DatePickerRef]);

	const customDropArrow = arrow || "▼";
	const customLabelStyle = addLabelDefaultStyle(labelStyle);
	const customDatePickerStyle = addDatePickerDefaultStyle(datePickerStyle);
	const customDatePickerInputStyle =
		addDatePickerInputDefaultStyle(datePickerInputStyle);
	const customFocusedStyle = addFocusedDefaultStyle(focusedStyle);
	const customChevronOpen = addChevronOpenDefaultStyle(arrowStyle);
	const customChevronClose = addChevronClosedDefaultStyle(arrowStyle);

	const customDatePickerListStyle = {
		backgroundColor: customDatePickerStyle.backgroundColor,
		color: "black",
		width: DatePickerWidth,
		padding: customDatePickerStyle.padding,
		margin: customDatePickerStyle.margin,
		left: DatePickerPosition,
		border: customDatePickerStyle.border,
		borderBottomLeftRadius: extractBorderRadius(
			customDatePickerStyle.borderRadius,
			"left"
		),
		borderBottomRightRadius: extractBorderRadius(
			customDatePickerStyle.borderRadius,
			"right"
		),
		maxHeight: "24dvh",
		lineHeight: "1.5rem",
		...datePickerCalendarStyle,
		position: "absolute",
		overflowY: "auto",
		zIndex: "990",
		boxSizing: "border-box",
		whiteSpace: "nowrap",
	};

	const modifyDate = (type, value) => {
		let newDate = new Date(showDate);
		switch (type) {
			case "y":
				newDate.setFullYear(newDate.getFullYear() + value);
				break;
			case "m":
				newDate.setMonth(newDate.getMonth() + value);
				break;
			case "d":
				newDate = value;
				break;
			default:
				break;
		}
		setShowDate(newDate);
	};

	useEffect(() => {
		setSelectedDate(
			showDate.toLocaleDateString(language || "en").split("T")[0]
		);
		handleChange(showDate.toLocaleDateString("en-CA").split("T")[0]);
	}, [showDate]);

	/*useEffect(() => {
		setShowDate(selectedDate);
		modifyDate();
	}, [selectedDate]);*/

	const handleDateClick = (newDate) => {
		modifyDate(
			"d",
			new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())
		);
	};

	const handleChangeDate = (event) => {
		const inputDate = event.target.value;
		setSelectedDate(inputDate);
		if (inputDate.length > 7) {
			const checkDate = new Date(inputDate);
			if (!isNaN(checkDate.getTime())) {
				setShowDate(checkDate);
			}
		}
	};

	return (
		<>
			<div style={customLabelStyle}>
				<label>{label}</label>
			</div>
			<div style={customDatePickerStyle} ref={DatePickerRef}>
				<div
					className="selected-item"
					style={
						selectedDate
							? { position: "relative" }
							: { position: "relative", color: "grey" }
					}
					//onKeyDown={handleKeyDown}
					tabIndex={0}
				>
					<div onClick={() => setIsOpen(!isOpen)}>
						<input
							style={customDatePickerInputStyle}
							type="text"
							value={selectedDate}
							placeholder={placeholder}
							onChange={handleChangeDate}
							onClick={(e) => e.stopPropagation()}
						/>
						<span style={isOpen ? customChevronOpen : customChevronClose}>
							{customDropArrow}
						</span>
					</div>
					{isOpen && (
						<div
							style={customDatePickerListStyle}
							className="DatePicker-container"
						>
							<div className="year-container" style={{ display: "flex" }}>
								<div
									className="year-minus"
									style={{ width: "10%", fontSize: "1.2rem" }}
									onClick={() => modifyDate("y", -1)}
								>
									⬅
								</div>
								<div
									className="table-header"
									style={{
										width: "80%",
										textAlign: "center",
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-around",
										fontSize: "1.2rem",
									}}
								>
									<div
										className="reset-date"
										style={{ width: "30%", fontWeight: "800" }}
									>
										⟲
									</div>
									<div
										className="dropDown-month"
										style={{
											width: "30%",
											display: "flex",
											flexDirection: "row",
											justifyContent: "space-around",
										}}
									>
										{names.months[showDate.getMonth()]}
										<div
											style={{
												width: "10%",
												height: "1rem",
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
											}}
										>
											<div style={{ height: "49%", fontSize: ".6rem" }}>▲</div>
											<div style={{ height: "49%", fontSize: ".6rem" }}>▼</div>
										</div>
									</div>
									<div
										className="dropDown-year"
										style={{
											width: "30%",
											display: "flex",
											flexDirection: "row",
											justifyContent: "space-around",
										}}
									>
										{showDate.getFullYear()}
										<div
											style={{
												width: "10%",
												height: "1rem",
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
											}}
										>
											<div style={{ height: "49%", fontSize: ".6rem" }}>▲</div>
											<div style={{ height: "49%", fontSize: ".6rem" }}>▼</div>
										</div>
									</div>
								</div>
								<div
									className="year-plus"
									style={{ width: "10%", textAlign: "end", fontSize: "1.2rem" }}
									onClick={() => modifyDate("y", 1)}
								>
									➡
								</div>
							</div>
							<div
								className="month-container"
								style={{ display: "flex", justifyContent: "space-between" }}
							>
								<div
									className="month-minus"
									style={{ display: "flex", alignSelf: "center" }}
									onClick={() => modifyDate("m", -1)}
								>
									◄
								</div>
								<div
									className="month-table"
									style={{
										width: "90%",
										textAlign: "center",
									}}
								>
									{createMonthTable({
										weekDays: names.days,
										selectDate: showDate,
										focusStyle: customFocusedStyle,
										onDateClick: handleDateClick,
									})}
								</div>
								<div
									className="month-plus"
									style={{
										textAlign: "end",
										display: "flex",
										alignSelf: "center",
									}}
									onClick={() => modifyDate("m", 1)}
								>
									►
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
export default DatePickerComponent;
