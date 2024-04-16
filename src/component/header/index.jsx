import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPath } from "../../slice/currentPath";
import StatusIcon from "../statusIcon";
import LanguageSelect from "../languageSelect";
import { getWeekDay } from "../../utils/utils";
import { FaUsers, FaUserPlus } from "react-icons/fa6";
import whLogo from "../../assets/images/WH_logo.webp";

import data from "./data.json";
import styles from "./styles.module.css";

function Header() {
	const employees = useSelector((state) => state.employeesList);
	const language = useSelector((state) => state.language);
	const today = useSelector((state) => state.date);
	const localToday = new Date(today).toLocaleDateString(language, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
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
						data-testid="home"
						className={styles.column30}
						onClick={() => {
							handleClick("home");
						}}
					>
						<img
							src={whLogo}
							width="100px"
							height="100px"
							style={{ maxWidth: "100px", height: "auto" }}
							alt="Wealth Health"
						/>
					</div>
					<div className={styles.column70}>
						<h1>HR Net</h1>
						{data[language]?.hrnet
							? data[language]?.hrnet
							: "Employees files managment App"}
					</div>
				</div>
				<div className={styles.column40}>
					<div className={styles.column50}>
						{isViewButton ? (
							<div
								data-testid="view"
								className={styles.button}
								onClick={() => {
									handleClick("view");
								}}
							>
								<FaUsers />
								&nbsp;{data[language]?.view ? data[language].view : "View"}
							</div>
						) : null}
						{isCreateButton ? (
							<div
								data-testid="create"
								className={styles.button}
								onClick={() => {
									handleClick("create");
								}}
							>
								<FaUserPlus />
								&nbsp;
								{data[language]?.create ? data[language].create : "Create"}
							</div>
						) : null}
					</div>
					<div className={styles.column30}>
						<div className={styles.date}>{localToday}</div>
						<div>
							<StatusIcon status={status} error={error} />
						</div>
					</div>
					<div className={styles.column20}>
						<div className={styles.date}>
							{getWeekDay(today, language, false)}
						</div>
						<div>
							<LanguageSelect />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Header;
