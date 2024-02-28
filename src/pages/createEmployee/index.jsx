import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputComponent from "../../component/formInput";
import SaveButton from "../../component/saveButton";

import styles from "./styles.module.css";

function CreateEmployee() {
	const regexName = /^[a-zA-ZÀ-ÖØ-öø-ÿ,.\-\s]+$/;
	const regexStreet = /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9,.\-\s]+$/;
	const regexZip = /^\[0-9]{5}[-\s]?(?:\d{4})?$/;
	const errorMessageName = "please use authorized characters only (A-Z ,.-)";
	const errorMessageZip = "please use only 5 or 5-4 digits only";
	const errorMessageStreet =
		"please use authorized characters only (A-Z ,.- 0-9)";

	//const newEmployee = useSelector((state) => state.newEmployee);

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
							item={"street"}
						/>
					</div>
					<div className={styles.column100}>
						<InputComponent
							label={"ZipCode"}
							regex={regexZip}
							errorMessage={errorMessageZip}
							item={"city"}
						/>
					</div>
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.column50}>
					<div className={styles.column100}>
						<InputComponent
							label={"Department"}
							regex={regexName}
							errorMessage={errorMessageName}
							item={"firstName"}
						/>
					</div>
				</div>
				<div className={styles.column50}>
					<div className={styles.column100}>
						{/*<SaveButton label={"SAVE"} />*/}
					</div>
				</div>
			</div>
		</>
	);
}
export default CreateEmployee;
