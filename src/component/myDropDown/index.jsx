import React, { useState, useRef, useEffect } from "react";
import { extractBorderRadius, setNewFocus } from "./utils";
import {
	addChevronOpenDefaultStyle,
	addChevronClosedDefaultStyle,
	addDropDownDefaultStyle,
	addDropDownErrorStyle,
	addFocusedDefaultStyle,
	addLabelDefaultStyle,
} from "./const";

const DropDownComponent = ({
	label,
	labelStyle,
	placeholder,
	arrow,
	arrowStyle,
	list,
	dropdownStyle,
	dropdownErrorStyle,
	dropdownListStyle,
	focusedStyle,
	handleChange,
	isError,
}) => {
	const [selectedItem, setSelectedItem] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const focusedItemRef = useRef(null);
	const [dropdownWidth, setDropdownWidth] = useState(null);
	const [dropdownPosition, setDropdownPosition] = useState(0);
	const [resizedWindow, setResizedWindow] = useState(null);
	const [focusedIndex, setFocusedIndex] = useState(null);
	const [previousKey, setPreviousKey] = useState(null);

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

	useEffect(() => {
		if (focusedItemRef.current) {
			focusedItemRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [focusedIndex]);

	const handleKeyDown = (event) => {
		event.preventDefault();
		if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			const newIndex =
				event.key === "ArrowDown" ? focusedIndex + 1 : focusedIndex - 1;
			const clampedIndex = Math.max(0, Math.min(newIndex, list.length - 1));
			setFocusedIndex(clampedIndex);
		} else if (/^[a-zA-Z]$/.test(event.key)) {
			const key = event.key.toLowerCase();
			if (key === previousKey) {
				const currentIndex = focusedIndex !== null ? focusedIndex + 1 : 0;
				const index = list
					.slice(currentIndex)
					.findIndex((item) => item.toLowerCase().startsWith(key));
				if (index !== -1) {
					setFocusedIndex(index + currentIndex);
				}
			} else {
				const index = list.findIndex((item) =>
					item.toLowerCase().startsWith(key)
				);
				if (index !== -1) {
					setFocusedIndex(index);
				}
			}
			setPreviousKey(key);
		}
	};
	/*const handleKeyDown = (event) => {
		setFocusedIndex(setNewFocus(event, focusedIndex, list));
	};*/

	const customDropArrow = arrow || "▼";
	const customLabelStyle = addLabelDefaultStyle(labelStyle);
	const customDropdownStyle = addDropDownDefaultStyle(dropdownStyle);
	const customDropdownErrorStyle = addDropDownErrorStyle(dropdownErrorStyle);
	const customFocusedStyle = addFocusedDefaultStyle(focusedStyle);
	const customChevronOpen = addChevronOpenDefaultStyle(arrowStyle);
	const customChevronClose = addChevronClosedDefaultStyle(arrowStyle);

	const customDropdownListStyle = {
		backgroundColor: customDropdownStyle.backgroundColor,
		color: "black",
		width: dropdownWidth,
		padding: customDropdownStyle.padding,
		margin: customDropdownStyle.margin,
		left: dropdownPosition,
		border: customDropdownStyle.border,
		borderBottomLeftRadius: extractBorderRadius(
			customDropdownStyle.borderRadius,
			"left"
		),
		borderBottomRightRadius: extractBorderRadius(
			customDropdownStyle.borderRadius,
			"right"
		),
		maxHeight: "16dvh",
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
			<div style={customLabelStyle}>
				<label>{label}</label>
			</div>
			<div
				style={isError ? customDropdownErrorStyle : customDropdownStyle}
				ref={dropdownRef}
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
						<div style={customDropdownListStyle} className="dropdown-container">
							{list.map((item, index) => (
								<div
									className="dropdown-item"
									tabIndex={0}
									key={index}
									onClick={() => handleItemClick(item)}
									onMouseOver={() => handleFocus(index)}
									onFocus={() => handleFocus(index)}
									style={focusedIndex === index ? customFocusedStyle : null}
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
