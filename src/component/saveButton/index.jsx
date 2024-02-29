import React from "react";
import { FaUserPlus } from "react-icons/fa6";

import styles from "./styles.module.css";

function SaveButton({ label, isClickable, handleSave }) {
	const handleClick = () => {
		handleSave();
	};

	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			{!isClickable ? (
				<div className={`${styles.button} ${styles.inactive}`}>
					<FaUserPlus />
					&nbsp;{label}
				</div>
			) : (
				<div
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
