import React from "react";

const MyModal = ({
	modalStyle,
	closeStyle,
	closeContent,
	modalTitle,
	titleStyle,
	modalMessage,
	messageStyle,
	isModalOpen,
	closeModal,
}) => {
	const defaultModalStyle = {
		zIndex: "999",
		width: "50%",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		border: "1px solid black",
		backgroundColor: "white",
		textAlign: "center",
        padding:"12px",
		...modalStyle,
	};

	const defaultCloseStyle = {
		width: "30px",
		height: "30px",
		borderRadius: "50%",
		backgroundColor: "black",
		color: "white",
        fontSize:"28px",
        fontWeight:"700",
		textAlign: "center",
		lineHeight: "30px",
		cursor: "pointer",
		...closeStyle,
	};
	const defaultTitleStyle = {
		fontSize: "20px",
		fontWeight: "bold",
		...titleStyle,
	};
	const defaultMessageStyle = { fontSize: "16px", ...messageStyle };

	if (!isModalOpen) {
		return null;
	}

	return (
		<div className="modal" style={defaultModalStyle}>
			<div style={{ position: "absolute", top: "-15px", right: "-15px" }}>
				<div
					className="modal-close"
					style={defaultCloseStyle}
					onClick={closeModal}
				>
					{closeContent ? closeContent : "×"}
				</div>
			</div>
			<div className="modal-title" style={defaultTitleStyle}>
				{modalTitle}
			</div>
			<div className="modal-message" style={defaultMessageStyle}>
				{modalMessage}
			</div>
		</div>
	);
};

export default MyModal;
