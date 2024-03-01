import React from "react";
import {
	addCloseDefaultStyle,
	addCloseOffsetDefaultStyle,
	addMessageDefaultStyle,
	addModalDefaultStyle,
	addOverlayDefaultStyle,
	addTitleDefaultStyle,
} from "./const";

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
	const customOverlayStyle = addOverlayDefaultStyle(overlayStyle);
	const customModalStyle = addModalDefaultStyle(modalStyle);
	const customCloseStyle = addCloseDefaultStyle(closeStyle);
	const customCloseOffset = addCloseOffsetDefaultStyle(closeOffsetStyle);
	const customTitleStyle = addTitleDefaultStyle(titleStyle);
	const customMessageStyle = addMessageDefaultStyle(messageStyle);

	if (!isModalOpen) {
		return null;
	}

	return (
		<>
			<div style={customOverlayStyle} onClick={closeModal}></div>
			<div className="modal" style={customModalStyle}>
				<div style={customCloseOffset}>
					<div
						className="modal-close"
						style={customCloseStyle}
						onClick={closeModal}
					>
						{closeContent ? closeContent : "×"}
					</div>
				</div>
				<div className="modal-title" style={customTitleStyle}>
					{modalTitle}
				</div>
				<div className="modal-message" style={customMessageStyle}>
					{modalMessage}
				</div>
			</div>
		</>
	);
};

export default MyModal;
