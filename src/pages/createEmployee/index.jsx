import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import InputComponent from "../../component/formInput";
import MyModal from "../../component/myModal";
import SaveButton from "../../component/saveButton";

import styles from "./styles.module.css";

function CreateEmployee() {
	const newEmployee = useSelector((state) => state.newEmployee);
	const [isSaveClickable, setIsSaveClickable] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(true);
	const handleCloseModal = () => {
		setIsModalOpen(false);
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

	return (
		<>
			<div className={styles.container}>
				<div className={styles.column50}>
					<div className={styles.column100}>
						<InputComponent
							label={"First Name"}
							regex={regexName}
							errorMessage={errorMessageName}
							item={"firstName"}
						/>
					</div>
					<div className={styles.column100}>
						<InputComponent
							label={"Last Name"}
							regex={regexName}
							errorMessage={errorMessageName}
							item={"lastName"}
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
							item={"street"}
						/>
					</div>
					<div className={styles.column100}>
						<InputComponent
							label={"City"}
							regex={regexName}
							errorMessage={errorMessageName}
							item={"city"}
						/>
					</div>
					<div className={styles.column100}>
						<InputComponent
							label={"State"}
							regex={regexStreet}
							errorMessage={errorMessageStreet}
							item={"state"}
						/>
					</div>
					<div className={styles.column100}>
						<InputComponent
							label={"ZipCode"}
							regex={regexZip}
							errorMessage={errorMessageZip}
							item={"zipCode"}
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
						<InputComponent
							label={"Department"}
							regex={regexName}
							errorMessage={errorMessageName}
							item={"department"}
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
