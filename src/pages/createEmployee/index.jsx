import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../slice/newEmployee";

import InputComponent from "../../component/formInput";
import DropDownComponent from "../../component/formDropDown";
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
	const [isSaveClickable, setIsSaveClickable] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const statesList = statesData.states.map((state) => state.fullName);
	const departmentsList = departmentsData.departments;

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};
	const handleChange = (field, value) => {
		dispatch(updateField({ field, value }));
	};

	const handleSave = () => {
		console.log("SAVE");
		setIsModalOpen(true);
	};

	useEffect(() => {
		const allValuesNonNull = Object.values(newEmployee).every(
			(value) => value !== null
		);
		if (allValuesNonNull) {
			setIsSaveClickable(true);
		}
	}, [newEmployee]);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.column50}>
					<div className={styles.column100}>
						<InputComponent
							label={"First Name"}
							regex={new RegExp(data.regex.regexName)}
							errorMessage={data[language].errorMessageName}
							handleChange={(value) => handleChange("firstName", value)}
						/>
					</div>
					<div className={styles.column100}>
						<InputComponent
							label={"Last Name"}
							regex={new RegExp(data.regex.regexName)}
							errorMessage={data[language].errorMessageName}
							handleChange={(value) => handleChange("lastName", value)}
						/>
					</div>
				</div>
				<div className={`${styles.column50} ${styles.addressBorder}`}>
					<div className={styles.relativePosTitle}>Address</div>
					<div className={styles.column100}>
						<InputComponent
							label={"Street"}
							regex={new RegExp(data.regex.regexStreet)}
							errorMessage={data[language].errorMessageStreet}
							handleChange={(value) => handleChange("street", value)}
						/>
					</div>
					<div className={styles.column100}>
						<InputComponent
							label={"City"}
							regex={new RegExp(data.regex.regexName)}
							errorMessage={data[language].errorMessageName}
							handleChange={(value) => handleChange("city", value)}
						/>
					</div>
					<div className={styles.column100}>
						<DropDownComponent
							label={"State"}
							selectMessage={"State..."}
							list={statesList}
							errorMessage={data[language].errorEmptyMessage}
							handleChange={(value) => handleChange("state", value)}
						/>
					</div>
					<div className={styles.column100}>
						<InputComponent
							label={"ZipCode"}
							regex={new RegExp(data.regex.regexZip)}
							errorMessage={data[language].errorMessageZip}
							handleChange={(value) => handleChange("zipCode", value)}
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
							label={"Department"}
							selectMessage={"Departments..."}
							list={departmentsList}
							errorMessage={data[language].errorEmptyMessage}
							handleChange={(value) => handleChange("department", value)}
						/>
					</div>
				</div>
				<div className={styles.column50}>
					<div className={styles.column100}>
						<SaveButton
							label={"SAVE"}
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
