import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../features/Slice/employees";
import StatusIcon from "../statusIcon";

function Header() {
	const dispatch = useDispatch();
	const employees = useSelector((state) => state.employees);
	const today = useSelector((state) => state.date);
	const status = employees.status; //"loading"/"failed"/"success"
	const error = employees.error;

	useEffect(() => {
		dispatch(fetchEmployees());
	}, [dispatch]);

	return (
		<div>
			<h1>
				HR Net{today}
				<StatusIcon status={status} error={error} />
			</h1>
		</div>
	);
}

export default Header;
