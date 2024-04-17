import React from "react";
import { FaUserPlus } from "react-icons/fa6";

import styles from "./styles.module.css";

/**
 * SaveButton component 
 * @param {object} props - React Component props.
 * @param {string} props.label - Label/text to display on the button.
 * @param {boolean} props.isClickable - Flag indicating whether the button is clickable or not.
 * @param {function} props.handleSave - Parent callback function to handle the save action.
 * @returns {JSX.Element} Rendered button component that displays a button for saving data.
 */

function SaveButton({ label, isClickable, handleSave }) {
	const handleClick = () => {
		handleSave();
	};

	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			{!isClickable ? (
				<div
					data-testid="save-inactive"
					className={`${styles.button} ${styles.inactive}`}
					onClick={handleClick}
				>
					<FaUserPlus />
					&nbsp;{label}
				</div>
			) : (
				<div
					data-testid="save-active"
					className={`${styles.button} ${styles.active}`}
					onClick={handleClick}
				>
					<FaUserPlus />
					&nbsp;{label}
				</div>
			)}
		</div>
	);
}

export default SaveButton;
