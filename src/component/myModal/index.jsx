import React from "react";
import {
	addCloseDefaultStyle,
	addCloseOffsetDefaultStyle,
	addMessageDefaultStyle,
	addModalDefaultStyle,
	addOverlayDefaultStyle,
	addTitleDefaultStyle,
} from "./const";

/**
 * Modal component
 * @param {object} props - Component props.
 * @param {CSSObjectStyle} props.overlayStyle - Custom CSS style for the overlay.
 * @param {CSSObjectStyle} props.modalStyle - Custom CSS style for the modal.
 * @param {CSSObjectStyle} props.closeStyle - Custom CSS style for the close button.
 * @param {CSSObjectStyle} props.closeOffsetStyle - Custom CSS style for the close button offset.
 * @param {string} props.closeContent - Content for the close button, default is "×".
 * @param {string} props.modalTitle - Title content of the modal
 * @param {CSSObjectStyle} props.titleStyle - Custom CSS style for the modal title.
 * @param {string} props.modalMessage - Message content of the modal.
 * @param {CSSObjectStyle} props.messageStyle - Custom CSS style for the modal message.
 * @param {boolean} props.isModalOpen - Flag indicating whether the modal is open or closed.
 * @param {function} props.closeModal - Parent callback function to close the modal.
 * @returns {JSX.Element} Rendered modal component that displays a customizable modal dialog.
 */

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

	return isModalOpen === false ? (
		<></>
	) : (
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
