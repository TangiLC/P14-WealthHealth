import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../slice/newEmployee";

import InputComponent from "../../component/formInput";
import DropDownComponent from "../../component/myDropDown";
import DatePickerComponent from "../../component/myDatePicker";
import MyModal from "../../component/myModal";
import SaveButton from "../../component/saveButton";

import styles from "./styles.module.css";
import data from "./data.json";
import statesData from "../../assets/lists/states.json";
import departmentsData from "../../assets/lists/departments.json";

function CreateEmployee() {
	const dispatch = useDispatch();
	const newEmployee = useSelector((state) => state.newEmployee);
	const language = useSelector((state) => state.language);
	const today = useSelector((state) => state.date);
	const [isSaveClickable, setIsSaveClickable] = useState(false);
	const [isCheckEmpty, setIsCheckEmpty] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const isEmpty = useRef(false);

	const statesList = statesData.states.map((state) => state.fullName);
	const departmentsList = departmentsData.departments;

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};
	const handleChange = (field, value) => {
		dispatch(updateField({ field, value }));
	};

	const handleSave = () => {
		if (isSaveClickable) {
			console.log("SAVE");
			setIsModalOpen(true);
		} else {
			setIsCheckEmpty(true);
		}
	};

	useEffect(() => {
		if (isCheckEmpty) {
			const timer = setTimeout(() => {
				setIsCheckEmpty(false);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [isCheckEmpty]);

	const dropdownStyle = {
		labelStyle: { margin: "3px" },
		dropdownStyle: {
			width: "95%",
			padding: "8px 4px",
			margin: "3px",
			borderRadius: "4px",
			border: "1px solid #607c3c",
		},
		dropdownErrorStyle: {
			width: "95%",
			padding: "8px 4px",
			margin: "3px",
			borderRadius: "4px",
			border: "2px solid darkred",
			backgroundColor: "darksalmon",
		},
		focusedStyle: { backgroundColor: "#f7f7da", color: "#607c3c" },
		arrowStyle: { color: "#809c13" },
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.column50}>
					<div className={styles.column100}>
						<InputComponent
							label={data[language].labels.firstName}
							regex={new RegExp(data.regex.regexName)}
							errorMessage={data[language].errorMessageName}
							handleChange={(value) => handleChange("firstName", value)}
							isError={isCheckEmpty && newEmployee.firstName === null}
						/>
					</div>
					<div className={styles.column100}>
						<InputComponent
							label={data[language].labels.lastName}
							regex={new RegExp(data.regex.regexName)}
							errorMessage={data[language].errorMessageName}
							handleChange={(value) => handleChange("lastName", value)}
							isError={isCheckEmpty && newEmployee.lastName === null}
						/>
					</div>
					<div className={styles.column100}>
						<DatePickerComponent
							label={data[language].labels.dateOfBirth}
							placeholder={data[language].labels.dateFormat}
							defaultDate={today}
							dateRange={[-36500,0]}
							handleChange={(value) => handleChange("dateOfBirth", value)}
							labelStyle={dropdownStyle.labelStyle}
							datePickerStyle={dropdownStyle.dropdownStyle}
							datePickerErrorStyle={dropdownStyle.dropdownErrorStyle}
							focusedStyle={dropdownStyle.focusedStyle}
							arrowStyle={dropdownStyle.arrowStyle}
							isError={isCheckEmpty && newEmployee.state === null}
						/>
					</div>
				</div>
				<div className={`${styles.column50} ${styles.addressBorder}`}>
					<div className={styles.relativePosTitle}>
						{data[language].labels.address}
					</div>
					<div className={styles.column100}>
						<InputComponent
							label={data[language].labels.street}
							regex={new RegExp(data.regex.regexStreet)}
							errorMessage={data[language].errorMessageStreet}
							handleChange={(value) => handleChange("street", value)}
							isError={isCheckEmpty && newEmployee.street === null}
						/>
					</div>
					<div className={styles.column100}>
						<InputComponent
							label={data[language].labels.city}
							regex={new RegExp(data.regex.regexName)}
							errorMessage={data[language].errorMessageName}
							handleChange={(value) => handleChange("city", value)}
							isError={isCheckEmpty && newEmployee.city === null}
						/>
					</div>
					<div className={styles.column100}>
						<DropDownComponent
							label={data[language].labels.state}
							placeholder={data[language].labels.state + "..."}
							list={statesList}
							handleChange={(value) => handleChange("state", value)}
							labelStyle={dropdownStyle.labelStyle}
							dropdownStyle={dropdownStyle.dropdownStyle}
							dropdownErrorStyle={dropdownStyle.dropdownErrorStyle}
							focusedStyle={dropdownStyle.focusedStyle}
							arrowStyle={dropdownStyle.arrowStyle}
							isError={isCheckEmpty && newEmployee.state === null}
						/>
						<div
							className={
								isCheckEmpty && newEmployee.state === null
									? `${styles.warning}`
									: `${styles.hidden}`
							}
						>
							{data[language].errorMessageEmpty}
						</div>
					</div>
					<div className={styles.column100}>
						<InputComponent
							label={data[language].labels.zipCode}
							regex={new RegExp(data.regex.regexZip)}
							errorMessage={data[language].errorMessageZip}
							handleChange={(value) => handleChange("zipCode", value)}
							isError={isCheckEmpty && newEmployee.zipCode === null}
						/>
					</div>
				</div>
			</div>
			<div className={styles.modalPosition}>
				<MyModal
					modalStyle={""}
					modalTitle={"Title"}
					titleStyle={""}
					modalMessage={"Message"}
					messageStyle={""}
					isModalOpen={isModalOpen}
					closeModal={handleCloseModal}
				/>
			</div>
			<div className={styles.container}>
				<div className={styles.column50}>
					<div className={styles.column100}>
						<DropDownComponent
							label={data[language].labels.department}
							placeholder={data[language].labels.department + "..."}
							list={departmentsList}
							handleChange={(value) => handleChange("department", value)}
							labelStyle={dropdownStyle.labelStyle}
							dropdownStyle={dropdownStyle.dropdownStyle}
							dropdownErrorStyle={dropdownStyle.dropdownErrorStyle}
							focusedStyle={dropdownStyle.focusedStyle}
							arrowStyle={dropdownStyle.arrowStyle}
							isError={isCheckEmpty && newEmployee.department === null}
						/>
					</div>
					<div
						className={
							isCheckEmpty && newEmployee.department === null
								? `${styles.warning}`
								: `${styles.hidden}`
						}
					>
						{data[language].errorMessageEmpty}
					</div>
				</div>
				<div className={styles.column50}>
					<div className={styles.column100}>
						<SaveButton
							label={data[language].labels.save}
							isClickable={isSaveClickable}
							handleSave={handleSave}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
export default CreateEmployee;
