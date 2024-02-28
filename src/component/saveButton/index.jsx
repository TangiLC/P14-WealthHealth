import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPath } from "../../slice/currentPath";
import { FaUserPlus } from "react-icons/fa6";

import styles from "./styles.module.css";

function SaveButton({ label, isClickable }) {
	const newEmployee = useSelector((state) => state.newEmployee);

	return (
		<>
			{!isClickable ? (
				<div className={`${styles.button} ${styles.inactive}`}>
					<FaUserPlus />
					&nbsp;{label}
				</div>
			) : (
				<div className={`${styles.button} ${styles.active}`}>
					<FaUserPlus />
					&nbsp;{label}
				</div>
			)}
		</>
	);
}

export default SaveButton;
