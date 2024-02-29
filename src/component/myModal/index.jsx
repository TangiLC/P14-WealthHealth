import React from "react";

const MyModal = ({
	overlayStyle,
	modalStyle,
	closeStyle,
	closeOffsetStyle,
	closeContent,
	modalTitle,
	titleStyle,
	modalMessage,
	messageStyle,
	isModalOpen,
	closeModal,
}) => {
	const defaultOverlayStyle = {
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

	const defaultModalStyle = {
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

	const defaultCloseStyle = {
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
	const defaultCloseOffset = {
		top: "-.7rem",
		right: "-.7rem",
		...closeOffsetStyle,
		position: "absolute",
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
		<>
			<div style={defaultOverlayStyle} onClick={closeModal}></div>
			<div className="modal" style={defaultModalStyle}>
				<div style={defaultCloseOffset}>
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
		</>
	);
};

export default MyModal;
