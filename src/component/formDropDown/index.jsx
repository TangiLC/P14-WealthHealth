import React, { useState } from "react";

import styles from "./styles.module.css";

const DropDownComponent = ({
	label,
	selectMessage,
	list,
	errorMessage,
	handleChange,
}) => {
	const [selectedValue, setSelectedValue] = useState(null);

	const normalizeList = (dataList) => {
		return dataList.map((item) => ({
			label: item,
			value: item,
		}));
	};

	const optionList = normalizeList(list);

	const handleSelectChange = (e) => {
		const value = e.target.value;
		setSelectedValue(value);
		handleChange(value);
	};

	return (
		<div>
			<div className={styles.label}>
				<label>{label}</label>
			</div>
			<select onChange={handleSelectChange} className={styles.input}>
				<option value="">{selectMessage}</option>
				{optionList.map((item, index) => (
					<option key={index} value={item.value}>
						{item.label}
					</option>
				))}
			</select>
			<div className={styles.error}>
				{selectedValue === "" ? (
					<span>{errorMessage}</span>
				) : (
					<span>&nbsp;</span>
				)}
			</div>
		</div>
	);
};
export default DropDownComponent;
