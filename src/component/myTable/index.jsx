import React, { useState, useEffect } from "react";
import { sortedLines, PageButtons, darkenColor } from "./utils";
import { labelStyle, evenStyle, oddStyle } from "./const";

const MyTable = ({
	lines,
	labels,
	hide,
	customLengthChoice,
	customColumns,
	customLabelStyle,
	customEvenStyle,
	customOddStyle,
	customActionColumn,
	customEmptyArrayMessage,
	customSearchCol,
	customText,
}) => {
	const lastColumn = customActionColumn ? customActionColumn : null;
	const colWidth = customColumns?.width ? customColumns.width : [];
	const lengthChoice = customLengthChoice ? customLengthChoice : [10, 20, 50];
	const lengthLabel = customText?.itemPerPage
		? customText.itemPerPage
		: "Items per page :";
	const searchLabel = customText?.search ? customText.search : "Search :";
	const showLabel = customText?.showingItems
		? customText.showingItems
		: ["Showing items", "to", "out of"];

	const emptyArrayMessage = customEmptyArrayMessage
		? customEmptyArrayMessage
		: "No data";
	const [sortKey, setSortKey] = useState(null);
	const [filteredLines, setFilteredLines] = useState(lines);
	const [sortOrder, setSortOrder] = useState("asc");
	const [pageSize, setPageSize] = useState(lengthChoice[0]);
	const [currentPage, setCurrentPage] = useState(1);
	const [columns, setColumns] = useState([]);
	const searchColumns = customSearchCol ? customSearchCol : columns;
	const [searchTerm, setSearchTerm] = useState("");

	const lStyle = labelStyle(customLabelStyle);
	const eStyle = evenStyle(customEvenStyle);
	const oStyle = oddStyle(customOddStyle);
	const selectedEStyle = {
		backgroundColor: darkenColor(eStyle.backgroundColor),
	};
	const selectedOStyle = {
		backgroundColor: darkenColor(oStyle.backgroundColor),
	};

	useEffect(() => {
		if (customColumns) {
			setColumns(customColumns.values);
		} else if (lines && lines.length > 0) {
			setColumns(Object.keys(lines[0]));
		}
	}, [customColumns, lines]);

	const handleSort = (key) => {
		if (sortKey === key) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortKey(key);
			setSortOrder("asc");
		}
	};

	const handlePageSizeChange = (e) => {
		setPageSize(parseInt(e.target.value));
		setCurrentPage(1);
	};

	const totalPages = Math.ceil(filteredLines.length / pageSize);
	const paginatedLines = filteredLines.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	);

	const handleChangePage = (page) => {
		setCurrentPage(page);
	};

	const handleIconClick = (index, val) => {
		lastColumn.actions[index].func(val);
	};

	const filterLines = (searchTerm) => {
		return lines.filter((line) => {
			return searchColumns.some((column) =>
				line[column]
					?.toString()
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
			);
		});
	};
	useEffect(() => {
		if (searchTerm.length > 1) {
			setFilteredLines(filterLines(searchTerm));
		} else {
			setFilteredLines(lines);
		}
	}, [searchTerm]);

	return (
		<div>
			<div
				style={{
					margin: "5px 20px",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<div>
					{/* length */}
					<label>
						{lengthLabel}
						<select value={pageSize} onChange={handlePageSizeChange}>
							{lengthChoice.map((option, index) => (
								<option key={index} value={option}>
									{option}
								</option>
							))}
						</select>
					</label>
				</div>
				{/* search */}
				<div>
					<label>{searchLabel}</label>
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>
			{!Array.isArray(filteredLines) ? (
				<>{emptyArrayMessage}</>
			) : (
				<div>
					{/* Labels */}
					<div style={lStyle}>
						{columns.map(
							(key, index) =>
								!hide.includes(key) && (
									<div
										key={index}
										style={{
											width: colWidth[index] ? colWidth[index] : "auto",
											...(sortKey === key && selectedOStyle),
											display: "flex",
											flexDirection: "row",
											cursor: "pointer",
										}}
										onClick={() => handleSort(key)}
									>
										<div
											style={{
												width: "90%",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: '""',
											}}
										>
											{labels[key]}
										</div>

										{sortKey === key && (
											<div style={{ width: "10%", fontSize: ".7rem" }}>
												{sortOrder === "asc" ? " ▲" : " ▼"}
											</div>
										)}
										{sortKey !== key && (
											<div style={{ display: "flex", flexDirection: "column" }}>
												<div
													style={{
														width: "10%",
														fontSize: ".6rem",
														color: "lightgrey",
														marginBottom: "-.75rem",
														padding: "0px",
													}}
												>
													▲
												</div>
												<div
													style={{
														width: "10%",
														fontSize: ".6rem",
														color: "lightgrey",
														marginTop: "-.75rem",
														padding: "0px",
													}}
												>
													▼
												</div>
											</div>
										)}
									</div>
								)
						)}
						{
							<div style={{ flex: 1 }}>
								{lastColumn !== null ? lastColumn.name : null}
							</div>
						}
					</div>
					{/* Data */}
					{sortedLines(sortKey, sortOrder, paginatedLines).map(
						(line, index) => (
							<div
								key={index}
								style={{
									display: "flex",
									...(index % 2 === 0 ? eStyle : oStyle),
								}}
							>
								{columns.map(
									(key, subIndex) =>
										!hide.includes(key) && (
											<div
												key={subIndex}
												style={{
													width: colWidth[subIndex]
														? colWidth[subIndex]
														: "auto",
													//flex: 1,
													...(sortKey === key &&
														(index % 2 === 0
															? selectedEStyle
															: selectedOStyle)),
												}}
											>
												{line[key] ? line[key] : ""}
											</div>
										)
								)}
								{
									/* Last Column */
									lastColumn !== null ? (
										<div
											style={{
												flex: 1,
												display: "flex",
												justifyContent: "space-around",
											}}
										>
											{lastColumn.actions.map(
												({ icon, func, target, label }, iconIndex) => (
													<span
														key={iconIndex}
														onClick={() =>
															handleIconClick(iconIndex, line[target])
														}
														title={label}
													>
														{icon}
													</span>
												)
											)}
										</div>
									) : null
								}
							</div>
						)
					)}
					{/* Pagination */}
					<div
						style={{
							margin: "5px 20px",
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<div>
							{showLabel[0]}&nbsp;
							{1 + parseInt(lengthChoice) * (currentPage - 1)}&nbsp;
							{showLabel[1]}&nbsp;
							{parseInt(lengthChoice) * currentPage > filteredLines.length
								? filteredLines.length
								: parseInt(lengthChoice) * currentPage}
							&nbsp;
							{showLabel[2]}&nbsp;
							{filteredLines.length}
						</div>
						<div>
							{totalPages > 1 && (
								<div
									style={{
										display: "inline-flex",
										flexDirection: "row",
										justifyContent: "space-evenly",
									}}
								>
									<PageButtons
										totalPages={totalPages}
										handleChangePage={handleChangePage}
										currentPage={currentPage}
										colors={[eStyle.backgroundColor, oStyle.backgroundColor]}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MyTable;
