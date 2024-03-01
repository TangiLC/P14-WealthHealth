export const addOverlayDefaultStyle = (overlayStyle) => {
	return {
		backgroundColor: "black",
		opacity: ".5",
		...overlayStyle,
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		zIndex: 999,
	};
};

export const addModalDefaultStyle = (modalStyle) => {
	return {
		width: "50%",
		top: "50%",
		left: "50%",
		transform: `translate(-50%, -50%)`,
		border: "1px solid black",
		borderRadius: "6px",
		backgroundColor: "white",
		textAlign: "center",
		padding: "12px",
		...modalStyle,
		position: "absolute",
		zIndex: "999",
	};
};

export const addCloseDefaultStyle = (closeStyle) => {
	return {
		width: "1.6rem",
		height: "1.6rem",
		borderRadius: "50%",
		backgroundColor: "black",
		color: "white",
		fontSize: "1.5rem",
		fontWeight: "600",
		textAlign: "center",
		lineHeight: "1.6rem",
		cursor: "pointer",
		...closeStyle,
	};
};

export const addCloseOffsetDefaultStyle = (closeOffsetStyle) => {
	return {
		top: "-.7rem",
		right: "-.7rem",
		...closeOffsetStyle,
		position: "absolute",
	};
};

export const addTitleDefaultStyle = (titleStyle) => {
	return {
		fontSize: "20px",
		fontWeight: "bold",
		...titleStyle,
	};
};

export const addMessageDefaultStyle = (messageStyle) => {
	return { fontSize: "16px", ...messageStyle };
};
