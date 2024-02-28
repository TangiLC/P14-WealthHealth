import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPath } from "../../features/Slice/currentPath";
import { FaUserPlus } from "react-icons/fa6";

import styles from "./styles.module.css";

const newEmployee = useSelector((state) => state.newEmployee);

function SaveButton({ label }) {
	const handleClick = async () => {
		const allValuesNonNull = Object.values(newEmployee).every(
			(value) => value !== null
		);
		if (allValuesNonNull) {
		}
	};

	return (
		<>
			<div
				className={styles.button}
				onClick={() => {
					handleClick();
				}}
			>
				<FaUserPlus />
				&nbsp;{label}
			</div>
		</>
	);
}

export default SaveButton;
