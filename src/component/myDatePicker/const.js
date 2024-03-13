export const addChevronOpenDefaultStyle = (arrowStyle) => {
	return {
		top: "50%",
		right: "5px",
		width: "10px",
		height: "10px",
		color: "black",
		lineHeight: "10px",
		transform: "translateY(-50%) rotate(-180deg)",
		transformOrigin: "70% 20%",
		transition: "transform 0.3s",
		...arrowStyle,
		display: "inline-block",
		position: "absolute",
	};
};
export const addChevronClosedDefaultStyle = (arrowStyle) => {
	return {
		top: "50%",
		right: "5px",
		width: "10px",
		height: "10px",
		color: "black",
		lineHeight: "10px",
		transform: "translateY(-50%) rotate(0deg)",
		transformOrigin: "70% 20%",
		transition: "transform 0.3s",
		...arrowStyle,
		display: "inline-block",
		position: "absolute",
	};
};

export const addDatePickerDefaultStyle = (selectStyle) => {
	return {
		width: "auto",
		padding: "6px",
		margin: "auto",
		borderRadius: "6px",
		border: "1px solid black",
		backgroundColor: "white",
		...selectStyle,
		boxSizing: "border-box",
	};
};

export const addDatePickerErrorStyle = (errorStyle) => {
	return {
		width: "auto",
		padding: "6px",
		margin: "auto",
		borderRadius: "6px",
		border: "2px solid darkred",
		backgroundColor: "darksalmon",
		...errorStyle,
		boxSizing: "border-box",
	};
};

export const addLabelDefaultStyle = (labelStyle) => {
	return {
		margin: "3px",
		...labelStyle,
	};
};

export const addFocusedDefaultStyle = (focusedItemStyle) => {
	return {
		backgroundColor: "lightgrey",
		color: "white",
		fontWeight: "800",
		...focusedItemStyle,
	};
};

export const defaultNames = {
	months: [
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
	],
	days: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	],
};
