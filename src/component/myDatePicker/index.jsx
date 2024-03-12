import React, { useState, useRef, useEffect } from "react";
import { extractBorderRadius, setNewFocus } from "./utils";
import {
	addChevronOpenDefaultStyle,
	addChevronClosedDefaultStyle,
	addDatePickerDefaultStyle,
	addDatePickerErrorStyle,
	addFocusedDefaultStyle,
	addLabelDefaultStyle,
} from "./const";

const DatePickerComponent = ({
	label,
	labelStyle,
	placeholder,
	arrow,
	arrowStyle,
	defaultDate,
	dateRange,
	datePickerStyle,
	datePickerErrorStyle,
	datePickerCalendarStyle,
	focusedStyle,
	handleChange,
	isError,
}) => {
	const initDate = new Date(defaultDate) || new Date();

	const [selectedItem, setSelectedItem] = useState(null);

	const [showDate, setShowDate] = useState({
		year: initDate.getFullYear(),
		month: initDate.getMonth() + 1,
		day: initDate.getDate(),
	});
	const [isOpen, setIsOpen] = useState(false);
	const DatePickerRef = useRef(null);
	const focusedItemRef = useRef(null);
	const [DatePickerWidth, setDatePickerWidth] = useState(null);
	const [DatePickerPosition, setDatePickerPosition] = useState(0);
	const [resizedWindow, setResizedWindow] = useState(null);
	const [focusedIndex, setFocusedIndex] = useState(null);

	const handleItemClick = (item) => {
		setSelectedItem(item);
		setIsOpen(false);
		handleChange(item);
	};
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
		maxHeight: "16dvh",
		lineHeight: "1.5rem",
		...datePickerCalendarStyle,
		position: "absolute",
		overflowY: "auto",
		zIndex: "990",
		boxSizing: "border-box",
		whiteSpace: "nowrap",
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
					onClick={() => setIsOpen(!isOpen)}
					onKeyDown={handleKeyDown}
					tabIndex={0}
				>
					{selectedItem ? selectedItem : placeholder}
					<span style={isOpen ? customChevronOpen : customChevronClose}>
						{customDropArrow}
					</span>
					{isOpen && (
						<div
							style={customDatePickerListStyle}
							className="DatePicker-container"
						>
							<div className="year-container">{showDate.year}</div>
							<div className="month-container">{showDate.month}</div>
							
							{showDate.day}
						</div>
					)}
				</div>
			</div>
		</>
	);
};
export default DatePickerComponent;
