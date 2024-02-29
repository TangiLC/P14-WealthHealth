export const chevronOpen = {
	display: "inline-block",
	position: "absolute",
	top: "50%",
	right: "5px",
	width: "10px",
	height: "10px",
	lineHeight: "10px",
	transform: "translateY(-50%) rotate(-180deg)",
	transformOrigin: "70% 20%",
	transition: "transform 0.3s",
};
export const chevronClosed = {
	display: "inline-block",
	position: "absolute",
	top: "50%",
	right: "5px",
	width: "10px",
	height: "10px",
	lineHeight: "10px",
	transform: "translateY(-50%) rotate(0deg)",
	transformOrigin: "70% 20%",
	transition: "transform 0.3s",
};

export const getDefaultDropDownStyle = (selectStyle) => {
	return {
		width: "95%",
		padding: "8px 4px",
		margin: "3px",
		borderRadius: "4px",
		border: "1px solid #607c3c",
		backgroundColor: "white",
		...selectStyle,
		boxSizing: "border-box",
	};
};

export const getDefaultLabelStyle = (labelStyle) => {
	return {
		margin: "3px",
		...labelStyle,
	};
};

export const getDefaultFocusedItem = (focusedItemStyle) => {
	return {
		backgroundColor: "lightgrey",
		color: "white",
		fontWeight: "800",
		...focusedItemStyle,
	};
};
