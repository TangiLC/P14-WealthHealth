import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../slice/newEmployee";

import InputComponent from "../../component/formInput";
import DropDownComponent from "../../component/formDropDown";
import MyModal from "../../component/myModal";
import SaveButton from "../../component/saveButton";

import styles from "./styles.module.css";
import statesData from "../../assets/lists/states.json";
import departmentsData from "../../assets/lists/departments.json";

function CreateEmployee() {
	const dispatch = useDispatch();
	const newEmployee = useSelector((state) => state.newEmployee);
	const [isSaveClickable, setIsSaveClickable] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(true);

	const statesList = statesData.states.map((state) => state.fullName);
	const departmentsList = departmentsData.departments;

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};
	const handleChange = (field, value) => {
		dispatch(updateField({ field, value }));
	};

	useEffect(() => {
		const allValuesNonNull = Object.values(newEmployee).every(
			(value) => value !== null
		);
		if (allValuesNonNull) {
			setIsSaveClickable(true);
		}
	}, [newEmployee]);

	const regexName = /^[a-zA-ZÀ-ÖØ-öø-ÿ,.\-\s]{1,}$/;
	const regexStreet = /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9,.\-\s]{1,}$/;
	const regexZip = /^[0-9]{5}$/;
	const errorMessageName =
		"please use authorized characters only (A-Z ,.-), don't leave empty";
	const errorMessageZip = "please use only digits";
	const errorMessageStreet =
		"please use authorized characters only (A-Z ,.- 0-9), don't leave empty";
	const errorEmptyMessage = "please select an item";

	return (
		<>
			<div className={styles.container}>
				<div className={styles.column50}>
					<div className={styles.column100}>
						<InputComponent
							label={"First Name"}
							regex={regexName}
							errorMessage={errorMessageName}
							handleChange={(value) => handleChange("firstName", value)}
						/>
					</div>
					<div className={styles.column100}>
						<InputComponent
							label={"Last Name"}
							regex={regexName}
							errorMessage={errorMessageName}
							handleChange={(value) => handleChange("lastName", value)}
						/>
					</div>
				</div>
				<div className={`${styles.column50} ${styles.addressBorder}`}>
					<div className={styles.relativePosTitle}>Address</div>
					<div className={styles.column100}>
						<InputComponent
							label={"Street"}
							regex={regexStreet}
							errorMessage={errorMessageStreet}
							handleChange={(value) => handleChange("street", value)}
						/>
					</div>
					<div className={styles.column100}>
						<InputComponent
							label={"City"}
							regex={regexName}
							errorMessage={errorMessageName}
							handleChange={(value) => handleChange("city", value)}
						/>
					</div>
					<div className={styles.column100}>
						<DropDownComponent
							label={"State"}
							selectMessage={"State..."}
							list={statesList}
							errorMessage={errorEmptyMessage}
							handleChange={(value) => handleChange("state", value)}
						/>
					</div>
					<div className={styles.column100}>
						<InputComponent
							label={"ZipCode"}
							regex={regexZip}
							errorMessage={errorMessageZip}
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
							errorMessage={errorEmptyMessage}
							handleChange={(value) => handleChange("department", value)}
						/>
					</div>
				</div>
				<div className={styles.column50}>
					<div className={styles.column100}>
						<SaveButton label={"SAVE"} isClickable={isSaveClickable} />
					</div>
				</div>
			</div>
		</>
	);
}
export default CreateEmployee;
