import React, { useState, useRef, useEffect } from "react";
import {
	extractBorderRadius,
	createDaysTable,
	createMonthTable,
	createYearTable,
} from "./utils";
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
}) => {
	const names = datesLabels || defaultNames;
	const [initDate, setInitDate] = useState(new Date(defaultDate) || new Date());
	const [showDate, setShowDate] = useState(initDate);
	const [selectedDate, setSelectedDate] = useState(initDate);
	const [itemToPick, setItemToPick] = useState("day");
	const [isOpen, setIsOpen] = useState(false);
	const DatePickerRef = useRef(null);
	const [DatePickerWidth, setDatePickerWidth] = useState(null);
	const [DatePickerPosition, setDatePickerPosition] = useState(0);
	const [resizedWindow, setResizedWindow] = useState(null);

	useEffect(() => {
		setItemToPick("day");
	}, [isOpen]);

	useEffect(() => {
		itemToPick === "year" ? scrollToYear() : null;
	}, [itemToPick]);

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
		const offset = showDate.getTimezoneOffset();
		showDate.setTime(showDate.getTime() - offset * 60000);
		setSelectedDate(showDate.toISOString().split("T")[0]);
		handleChange(showDate.toISOString().split("T")[0]);
	}, [showDate]);

	const handleDateClick = (pick, newDate) => {
		modifyDate(
			pick,
			new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())
		);
	};

	const scrollToYear = () => {
		const yearSelector = document.getElementById("year-selector");
		const focusedYear = document.getElementById("focused-year");

		if (yearSelector && focusedYear) {
			const yearSelectorRect = yearSelector.getBoundingClientRect();
			const focusedYearRect = focusedYear.getBoundingClientRect();

			const scrollTop =
				focusedYearRect.top -
				yearSelectorRect.top -
				(yearSelectorRect.height - focusedYearRect.height) / 2;

			yearSelector.scrollTo({
				top: scrollTop,
				behavior: "smooth",
			});
		}
	};

	const handleDateChange = (newDate) => {
		setShowDate(newDate);
	};

	const handleInputDate = (event) => {
		setSelectedDate(event.target.value);
	};

	const handleInputEnterKey = (event) => {
		if (event.key === "Enter") {
			if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(selectedDate)) {
				const checkDate = new Date(selectedDate);
				if (!isNaN(checkDate.getTime())) {
					setIsOpen(true);
					if (checkDate >= dateRange?.max) {
						setShowDate(dateRange.max);
					} else if (checkDate <= dateRange?.min) {
						setShowDate(dateRange.min);
					} else setShowDate(checkDate);
				}
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
							onChange={handleInputDate}
							onKeyDown={handleInputEnterKey}
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
										style={{ width: "10%", fontWeight: "800" }}
										onClick={() => handleDateChange(initDate)}
									>
										⟲
									</div>
									<div
										className="dropDown-day"
										style={{
											width: "30%",
											display: "flex",
											flexDirection: "row",
											justifyContent: "space-around",
										}}
										onClick={() => {
											itemToPick === "day"
												? setItemToPick(null)
												: setItemToPick("day");
										}}
									>
										{names.days[showDate.getDay()-1]}&nbsp;{showDate.getDate()}
										<div
											style={{
												width: "10%",
												height: "1rem",
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
												fontSize: ".6rem",
												...(itemToPick === "day"
													? { transform: "rotate(-180deg)" }
													: {}),
											}}
										>
											▼
										</div>
									</div>
									<div
										className="dropDown-month"
										style={{
											width: "30%",
											display: "flex",
											flexDirection: "row",
											justifyContent: "space-around",
										}}
										onClick={() => {
											itemToPick === "month"
												? setItemToPick("day")
												: setItemToPick("month");
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
												fontSize: ".6rem",
												...(itemToPick === "month"
													? { transform: "rotate(-180deg)" }
													: {}),
											}}
										>
											▼
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
										onClick={() => {
											itemToPick === "year"
												? setItemToPick("day")
												: setItemToPick("year");
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
												fontSize: ".6rem",
												...(itemToPick === "year"
													? { transform: "rotate(-180deg)" }
													: {}),
											}}
										>
											▼
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
							{itemToPick === "day" ? (
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
										{createDaysTable({
											dateRange:dateRange,
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
							) : itemToPick === "month" ? (
								createMonthTable({
									dateRange:dateRange,
									monthList: names.months,
									selectDate: showDate,
									onMonthClick: handleDateChange,
									focusStyle: customFocusedStyle,
								})
							) : itemToPick === "year" ? (
								createYearTable({
									dateRange: dateRange,
									selectDate: showDate,
									onYearClick: handleDateChange,
									scrollToYear: scrollToYear,
									focusStyle: customFocusedStyle,
								})
							) : null}
						</div>
					)}
				</div>
			</div>
		</>
	);
};
export default DatePickerComponent;
