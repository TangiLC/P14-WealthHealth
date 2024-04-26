import React, { useState, useEffect } from "react";

import styles from "./styles.module.css";

/**
 * Component InputComponent
 *
 * @param {Object} props - react props
 * @param {string} props.label - label above input form
 * @param {RegExp} props.regex - regex to validate user entry
 * @param {string} props.initVal - initial value of input
 * @param {string} props.errorMessage - error message if input is not in regex
 * @param {function} props.handleChange - parent callback function to change value
 * @param {boolean} props.isError - allow to show errorMessage and change style if true
 * @returns {JSX.Element} React component -Input field with regex validation
 */

const InputComponent = ({
	label,
	regex,
	initVal,
	errorMessage,
	handleChange,
	isError,
}) => {
	const [inputValue, setInputValue] = useState(initVal || "");
	const [showErrorMessage, setShowErrorMessage] = useState(isError);

	useEffect(() => {
		setInputValue("");
	}, []);

	const handleInputChange = (e) => {
		const value = e.target.value;
		setInputValue(value);
		if (regex.test(value)) {
			setShowErrorMessage(false);
			handleChange(value);
		} else {
			setShowErrorMessage(true);
		}
	};

	useEffect(() => {
		setShowErrorMessage(isError);
	}, [isError]);

	return (
		<div>
			<div className={styles.label}>
				<label htmlFor={label}>{label}</label>
			</div>
			<div>
				<input
					id={label}
					type="text"
					name="input"
					data-testid="input"
					className={showErrorMessage ? styles.errorInput : styles.input}
					value={inputValue}
					onChange={handleInputChange}
				/>
			</div>
			<div className={styles.error}>
				{showErrorMessage ? <span>{errorMessage}</span> : <span>&nbsp;</span>}
			</div>
		</div>
	);
};
export default InputComponent;
