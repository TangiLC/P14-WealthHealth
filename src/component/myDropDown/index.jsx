import React, { useState, useRef, useEffect } from "react";
import { extractBorderRadius, setNewFocus } from "./utils";
import {
	chevronOpen,
	chevronClosed,
	getDefaultDropDownStyle,
	getDefaultLabelStyle,
	getDefaultFocusedItem,
} from "./const";

const DropDownComponent = ({
	label,
	labelStyle,
	placeholder,
	arrow,
	list,
	selectStyle,
	dropdownListStyle,
	focusedItemStyle,
	handleChange,
}) => {
	const [selectedItem, setSelectedItem] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const focusedItemRef = useRef(null);
	const [dropdownWidth, setDropdownWidth] = useState(null);
	const [dropdownPosition, setDropdownPosition] = useState(0);
	const [resizedWindow, setResizedWindow] = useState(null);
	const [focusedIndex, setFocusedIndex] = useState(null);

	const handleItemClick = (item) => {
		setSelectedItem(item);
		setIsOpen(false);
		handleChange(item);
	};
	useEffect(() => {
		if (isOpen && dropdownRef.current) {
			const thisWidth = dropdownRef.current.offsetWidth;
			setDropdownWidth(thisWidth);
			const leftPadding = window.getComputedStyle(
				dropdownRef.current
			).paddingLeft;
			const leftMargin = window.getComputedStyle(
				dropdownRef.current
			).marginLeft;
			const leftPosition =
				"-" +
				(
					1 +
					parseInt(leftPadding.substring(0, leftPadding.length - 2)) +
					parseInt(leftMargin.substring(0, leftMargin.length - 2))
				).toString() +
				"px";
			setDropdownPosition(leftPosition);
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
			dropdownRef.current.focus();
		}
	}, [isOpen, dropdownRef]);

	const handleFocus = (index) => {
		setFocusedIndex(index);
	};

	const handleKeyDown = (event) => {
		setFocusedIndex(setNewFocus(event, focusedIndex, list));
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

	const dropArrow = arrow || "▼";
	const defaultLabelStyle = getDefaultLabelStyle(labelStyle);
	const defaultDropDownStyle = getDefaultDropDownStyle(selectStyle);
	const defaultFocusedItem = getDefaultFocusedItem(focusedItemStyle);

	const defaultDropdownListStyle = {
		backgroundColor: defaultDropDownStyle.backgroundColor,
		width: dropdownWidth,
		padding: defaultDropDownStyle.padding,
		margin: defaultDropDownStyle.margin,
		left: dropdownPosition,
		border: defaultDropDownStyle.border,
		borderBottomLeftRadius: extractBorderRadius(
			defaultDropDownStyle.borderRadius,
			"left"
		),
		borderBottomRightRadius: extractBorderRadius(
			defaultDropDownStyle.borderRadius,
			"right"
		),
		maxHeight: "15dvh",
		lineHeight: "1.5rem",
		...dropdownListStyle,
		position: "absolute",
		overflowY: "auto",
		zIndex: "990",
		boxSizing: "border-box",
		whiteSpace: "nowrap",
	};

	return (
		<>
			<div style={defaultLabelStyle}>
				<label>{label}</label>
			</div>
			<div style={defaultDropDownStyle} ref={dropdownRef}>
				<div
					className="selected-item"
					style={{ position: "relative" }}
					onClick={() => setIsOpen(!isOpen)}
					onKeyDown={handleKeyDown}
					tabIndex={0}
				>
					{selectedItem ? selectedItem : placeholder}
					<span style={isOpen ? chevronOpen : chevronClosed}>{dropArrow}</span>
					{isOpen && (
						<div
							style={defaultDropdownListStyle}
							className="dropdown-container"
						>
							{list.map((item, index) => (
								<div
									className="dropdown-item"
									tabIndex={0}
									key={index}
									onClick={() => handleItemClick(item)}
									onMouseOver={() => handleFocus(index)}
									onFocus={() => handleFocus(index)}
									style={focusedIndex === index ? defaultFocusedItem : null}
									ref={focusedIndex === index ? focusedItemRef : null}
								>
									{item}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
};
export default DropDownComponent;
