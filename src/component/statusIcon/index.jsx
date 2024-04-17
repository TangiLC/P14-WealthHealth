import React, { useState, useEffect } from "react";
import { ImSpinner2, ImBlocked, ImEllo, ImShocked } from "react-icons/im";

import "./style.css";

/**
 * StatusIcon component.
 * @param {object} props - React component props.
 * @param {string} props.status - Current status ("loading", "failed", "success").
 * @param {string} props.error - Error message to display if the status is "failed".
 * @returns {JSX.Element} Rendered status icon component that displays an icon based on the status.
 */

function StatusIcon({ status, error }) {
	//"loading"/"failed"/"success"
	const [currentStatus, setCurrentStatus] = useState(status);
	useEffect(() => {
		setCurrentStatus(status);
	}, [status]);
	let iconVal = {
		icon: null,
		iconColor: null,
		isSpinning: false,
		message: null,
	};

	switch (currentStatus) {
		case "loading":
			iconVal.icon = <ImSpinner2 />;
			iconVal.iconColor = "#ff8c00";
			iconVal.isSpinning = true;
			iconVal.message = "loading...";
			break;
		case "failed":
			iconVal.icon = <ImBlocked />;
			iconVal.iconColor = "#ff4500";
			iconVal.isSpinning = false;
			iconVal.message = "error :";
			break;
		case "success":
			iconVal.icon = <ImEllo />;
			iconVal.iconColor = "#32cd32";
			iconVal.isSpinning = false;
			iconVal.message = "data loaded sucessfully";
			break;
		default:
			iconVal.icon = <ImShocked />;
			iconVal.iconColor = "#dda0dd";
			iconVal.isSpinning = true;
	}

	return (
		<>
			<div
				data-testid={iconVal.isSpinning ? "spinner" : "notSpinner"}
				className={iconVal.isSpinning ? "spinner" : "notSpinner"}
				style={{
					color: iconVal.iconColor,
					fontSize: "2rem",
					textAlign: "center",
				}}
			>
				{iconVal.icon}
			</div>
			<div className="message" data-testid="message">
				{iconVal.message}
				<br />
				{error}
			</div>
		</>
	);
}

export default StatusIcon;
