import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPath } from "../../features/Slice/currentPath";
import StatusIcon from "../statusIcon";
import { FaUsers, FaUserPlus } from "react-icons/fa6";
import whLogo from "../../assets/images/WH_logo.png";

import styles from "./styles.module.css";

function Header() {
	const employees = useSelector((state) => state.employeesList);
	const today = useSelector((state) => state.date);
	const status = employees.status; //"loading"/"failed"/"success"
	const error = employees.error;
	const currentPath = useSelector((state) => state.currentPath);
	const [isViewButton, setIsViewButton] = useState(true);
	const [isCreateButton, setIsCreateButton] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (currentPath === "home") {
			setIsViewButton(true);
			setIsCreateButton(true);
		} else if (currentPath === "view") {
			setIsViewButton(false);
			setIsCreateButton(true);
		} else if (currentPath === "create") {
			setIsViewButton(true);
			setIsCreateButton(false);
		}
	}, [currentPath]);

	useEffect(() => {
		navigate(`/${currentPath}`);
	}, [currentPath, navigate]);

	const handleClick = (target) => {
		dispatch(setPath(target));
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.column60}>
					<div
						className={styles.column30}
						onClick={() => {
							handleClick("home");
						}}
					>
						<img
							src={whLogo}
							style={{ maxWidth: "100px", height: "auto" }}
							alt="Wealth Health"
						/>
					</div>
					<div className={styles.column70}>
						<h1>HR Net</h1>
					</div>
				</div>
				<div className={styles.column40}>
					<div className={styles.column50}>
						{isViewButton ? (
							<div
								className={styles.button}
								onClick={() => {
									handleClick("view");
								}}
							>
								<FaUsers />
								&nbsp;View
							</div>
						) : null}
						{isCreateButton ? (
							<div
								className={styles.button}
								onClick={() => {
									handleClick("create");
								}}
							>
								<FaUserPlus />
								&nbsp;Create
							</div>
						) : null}
					</div>
					<div className={styles.column30}>
						<div className={styles.date}>{today}</div>
						<div>
							<StatusIcon status={status} error={error} />
						</div>
					</div>
					<div className={styles.column20}>Lg</div>
				</div>
			</div>
		</>
	);
}

export default Header;
