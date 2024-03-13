import React, { useState, useRef, useEffect } from "react";
import { extractBorderRadius, setNewFocus, createMonthTable } from "./utils";
import {
	addChevronOpenDefaultStyle,
	addChevronClosedDefaultStyle,
	addDatePickerDefaultStyle,
	addDatePickerErrorStyle,
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
	datePickerErrorStyle,
	datePickerCalendarStyle,
	focusedStyle,
	handleChange,
	isError,
}) => {
	const names = datesLabels || defaultNames;
	const [initDate, setInitDate] = useState(new Date(defaultDate) || new Date());

	const [selectedItem, setSelectedItem] = useState(null);

	const [showDate, setShowDate] = useState({
		full: initDate,
		year: initDate.getFullYear(),
		month: initDate.getMonth(),
		day: initDate.getDate(),
		weekDay: initDate.getDay(),
	});
	const [isOpen, setIsOpen] = useState(false);
	const DatePickerRef = useRef(null);
	const focusedItemRef = useRef(null);
	const [DatePickerWidth, setDatePickerWidth] = useState(null);
	const [DatePickerPosition, setDatePickerPosition] = useState(0);
	const [resizedWindow, setResizedWindow] = useState(null);
	const [focusedIndex, setFocusedIndex] = useState(null);

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

	const handleFocus = (index) => {
		setFocusedIndex(index);
	};

	const handleKeyDown = (event) => {
		setFocusedIndex(setNewFocus(event, focusedIndex, defaultDate));
	};

	useEffect(() => {
		if (focusedIndex !== -1 && focusedItemRef.current) {
			focusedItemRef.current.scrollIntoView({
				behavior: "auto",
				block: "center",
				inline: "center",
			});
		}
	}, [focusedIndex]);

	const customDropArrow = arrow || "▼";
	const customLabelStyle = addLabelDefaultStyle(labelStyle);
	const customDatePickerStyle = addDatePickerDefaultStyle(datePickerStyle);
	const customDatePickerErrorStyle =
		addDatePickerErrorStyle(datePickerErrorStyle);
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
		let newDate = new Date(showDate.full);
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

		setShowDate({
			full: newDate,
			year: newDate.getFullYear(),
			month: newDate.getMonth(),
			day: newDate.getDate(),
			weekDay: newDate.getDay(),
		});
	};

	useEffect(() => {
		setSelectedItem(
			showDate.full.toLocaleDateString(language || "en").split("T")
		);

		handleChange(showDate.full.toLocaleDateString("en-CA").split("T")[0]);
	}, [showDate]);

	const handleDateClick = (newDate) => {
		modifyDate(
			"d",
			new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())
		);
	};

	return (
		<>
			<div style={customLabelStyle}>
				<label>{label}</label>
			</div>
			<div
				style={isError ? customDatePickerErrorStyle : customDatePickerStyle}
				ref={DatePickerRef}
			>
				<div
					className="selected-item"
					style={
						selectedItem
							? { position: "relative" }
							: { position: "relative", color: "grey" }
					}
					onKeyDown={handleKeyDown}
					tabIndex={0}
				>
					<div onClick={() => setIsOpen(!isOpen)}>
						{selectedItem ? selectedItem : placeholder}
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
									style={{ width: "20%" }}
									onClick={() => modifyDate("y", -1)}
								>
									◄◄
								</div>
								<div
									className="year"
									style={{ width: "60%", textAlign: "center" }}
								>
									{showDate.year}
								</div>
								<div
									className="year-plus"
									style={{ width: "20%", textAlign: "end" }}
									onClick={() => modifyDate("y", 1)}
								>
									►►
								</div>
							</div>
							<div className="month-container" style={{ display: "flex" }}>
								<div
									className="month-minus"
									style={{ width: "5%", display: "flex", alignSelf: "center" }}
									onClick={() => modifyDate("m", -1)}
								>
									◄
								</div>
								<div
									className="month"
									style={{
										width: "90%",
										textAlign: "center",
									}}
								>
									{names.months[showDate.month]}
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
										width: "5%",
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
