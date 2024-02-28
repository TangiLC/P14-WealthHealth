import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateField } from "../../features/Slice/newEmployee";

import styles from "./styles.module.css";

const InputComponent = ({ label, regex, errorMessage, item }) => {
	const dispatch = useDispatch();
	const [inputValue, setInputValue] = useState("");
	const [showErrorMessage, setShowErrorMessage] = useState(false);

	const handleChange = (e) => {
		const { value } = e.target;

		setInputValue(value);
		if (!regex.test(value) && value.length !== 0) {
			setShowErrorMessage(true);
			dispatch(updateField({ field: item, value: "" }));
		} else {
			setShowErrorMessage(false);
			dispatch(updateField({ field: item, value }));
		}
	};

	return (
		<div>
			<div className={styles.label}>
				<label>{label}</label>
			</div>
			<div>
				<input
					type="text"
					className={showErrorMessage ? styles.errorInput : styles.input}
					value={inputValue}
					onChange={handleChange}
				/>
			</div>
			<div className={styles.error}>
				{showErrorMessage ? <span>{errorMessage}</span> : <span>&nbsp;</span>}
			</div>
		</div>
	);
};
export default InputComponent;
