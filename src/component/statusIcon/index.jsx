import React from "react";
import { ImSpinner2, ImBlocked, ImEllo, ImShocked } from "react-icons/im";

import "./style.css";

function StatusIcon({ status, error }) {
	//"loading"/"failed"/"success"

	let icon = null;
	let iconColor = null;
	let isSpinning = false;

	switch (status) {
		case "loading":
			icon = <ImSpinner2 />;
			iconColor = "#ff8c00";
			isSpinning = true;
			break;
		case "failed":
			icon = <ImBlocked />;
			iconColor = "#ff4500";
			isSpinning = false;
			break;
		case "success":
			icon = <ImEllo />;
			iconColor = "#32cd32";
			isSpinning = false;
			break;
		default:
			icon = <ImShocked />;
			iconColor = "#dda0dd";
			isSpinning = true;
	}

	return (
		<>
			<div
				className={isSpinning ? "spinner" : "notSpinner"}
				style={{ color: iconColor }}
			>
				{icon}
			</div>
			<div>
				{status}
				{error}
			</div>
		</>
	);
}

export default StatusIcon;
