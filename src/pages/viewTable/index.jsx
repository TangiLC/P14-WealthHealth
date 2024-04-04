import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeesList } from "../../slice/employeesList";
import { deleteEmployee } from "../../utils/utils";

//const TangiTable = lazy(() => import("../../component/myTable"));
import TalecTable from "talec-table";

import data from "../data.json";
import { BsTrash3Fill, BsPencilSquare, BsClipboardCheck } from "react-icons/bs";

function ViewTable() {
	const dispatch = useDispatch();
	const employees = useSelector((state) => state.employeesList.list);
	const language = useSelector((state) => state.language);
	const [labels, setLabels] = useState(data[language].labels);

	useEffect(() => {
		setLabels(data[language].labels);
	}, [language]);

	const deleteItem = async (id) => {
		try {
			await deleteEmployee(id);
			dispatch(fetchEmployeesList());

			console.log("delete", id);
		} catch (error) {
			console.error("Error deleting employee:", error);
		}
	};

	const editItem = (id) => {
		console.log("edit", id);
	};

	const copyToClipboard = (id) => {
		let data = employees.find((employee) => employee.id === id);
		if (data) {
			const { id, ...dataWithoutId } = data;
			const modifiedState = data.shortState
				? `${data.state} (${data.shortState})`
				: data.state;
			const modifiedData = { ...dataWithoutId, state: modifiedState };
			const { shortState, ...dataToCopy } = modifiedData;
			const text = Object.entries(dataToCopy)
				.map(([key, value]) => `${value}`)
				.join("\n");
			navigator.clipboard.writeText(text);
			console.log("copy to clipboard :", text);
		}
	};

	return (
		<>
			<div key={"viewTable"}>
				<TalecTable
					lines={employees}
					titles={labels}
					hide={["id", "state"]}
					custom={{
						lengthChoice: [10, 20, 40, 80],
						text: labels.tableText,
						columns: {
							values: [
								"firstName",
								"lastName",
								"startDate",
								"department",
								"dateOfBirth",
								"street",
								"city",
								"zipCode",
								"shortState",
							],
							width: ["11%", "11%", "8%", "11%", "8%", "16%", "8%", "8%", "5%"],
						},
						titleStyle: { backgroundColor: "#d0d08f" },
						evenLineStyle: { backgroundColor: "#abc32f" },
						oddLineStyle: { backgroundColor: "#ececa3" },
						actionColumn: {
							name: labels.actions,
							actions: [
								{
									icon: <BsTrash3Fill />,
									func: deleteItem,
									target: "id",
									label: labels.delete,
								},
								{
									icon: <BsClipboardCheck />,
									func: copyToClipboard,
									target: "id",
									label: labels.copy,
								},
								{
									icon: <BsPencilSquare />,
									func: editItem,
									target: "id",
									label: labels.edit,
								},
							],
						},
					}}
				/>
			</div>
		</>
	);
}
export default ViewTable;
