import React, { lazy } from "react";
import { useSelector } from "react-redux";

const MyTable = lazy(() => import("../../component/myTable"));

import data from "../data.json";
import { BsTrash3Fill, BsPencilSquare } from "react-icons/bs";

function ViewTable() {
	const employees = useSelector((state) => state.employeesList.list);
	const language = useSelector((state) => state.language);
	const labels = data[language].labels;

	const deleteItem = (id) => {
		console.log("delete", id);
	};

	const editItem = (id) => {
		console.log("edit", id);
	};

	return (
		<>
			<div>
				<MyTable
					lines={employees}
					labels={labels}
					hide={["id", "state"]}
					customLengthChoice={[6, 12, 18, 24]}
					customText={labels.tableText}
					customColumns={{
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
						width: ["15%", "15%", "7%", "10%", "7%", "10%", "10%", "7%", "5%"],
					}}
					customActionColumn={{
						name: labels.actions,
						actions: [
							{
								icon: <BsTrash3Fill />,
								func: deleteItem,
								target: "id",
								label: labels.delete,
							},
							{
								icon: <BsPencilSquare />,
								func: editItem,
								target: "id",
								label: labels.edit,
							},
						],
					}}
				/>
			</div>
		</>
	);
}
export default ViewTable;
