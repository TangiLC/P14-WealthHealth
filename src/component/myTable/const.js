export const labelStyle = (customLabelStyle) => {
	return {
		backgroundColor: "#fefefe",
		borderBottom: "1px solid #cccccc",
		lineHeight: "2rem",
		fontWeight: "600",
		textAlign: "center",
		...customLabelStyle,
		display: "flex",
	};
};

export const flexRowBetweenStyle = {
	margin: "5px 20px",
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between",
};

export const arrowDivStyle = (pos) => {
	return {
		width: "10%",
		fontSize: ".6rem",
		color: "lightgrey",
		marginBottom: pos === "top" ? "-.75rem" : null,
		marginTop: pos === "bottom" ? "-.75rem" : null,
		padding: "0px",
	};
};

export const evenStyle = (customEvenStyle) => {
	return {
		backgroundColor: "#eeeeee",
		borderBottom: "1px solid #dddddd",
		lineHeight: "1.8rem",
		...customEvenStyle,
	};
};

export const oddStyle = (customOddStyle) => {
	return {
		backgroundColor: "#fdfdfd",
		borderBottom: "1px solid #dddddd",
		lineHeight: "1.8rem",
		...customOddStyle,
	};
};

export const initCustomLabels = (customText) => ({
	length: customText.itemPerPage || "Items per page :",
	search: customText.search || "Search :",
	show: customText.showingItems || ["Showing items", "to", "out of"],
});
