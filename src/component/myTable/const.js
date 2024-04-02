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
