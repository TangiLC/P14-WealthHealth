export function extractBorderRadius(borderRadius, side) {
	const values = borderRadius.split(" ");

	let bottomRadius;

	if (values.length === 1) {
		bottomRadius = values[0];
	} else if (values.length === 2) {
		bottomRadius = side === "left" ? values[0] : values[1];
	} else if (values.length === 4) {
		bottomRadius = side === "left" ? values[1] : values[3];
	} else {
		console.error("Format non pris en charge");
	}

	return bottomRadius;
}

export function createDaysTable({
	weekDays,
	selectDate,
	onDateClick,
	focusStyle,
}) {
	const daysInMonth = new Date(
		selectDate.getFullYear(),
		selectDate.getMonth() + 1,
		0
	).getDate();
	const firstDayOfMonth = new Date(
		selectDate.getFullYear(),
		selectDate.getMonth(),
		0
	).getDay();
	const table = [];

	let dayDate = 1 - firstDayOfMonth;
	for (let i = 0; i < 6; i++) {
		const week = [];
		for (let j = 0; j < 7; j++) {
			let date;
			if (dayDate <= 0) {
				if (selectDate.getMonth() === 0) {
					const daysInPreviousMonth = new Date(
						selectDate.getFullYear() - 1,
						12,
						0
					).getDate();
					date = new Date(
						selectDate.getFullYear() - 1,
						11,
						daysInPreviousMonth + dayDate
					);
				} else {
					const daysInPreviousMonth = new Date(
						selectDate.getFullYear(),
						selectDate.getMonth(),
						0
					).getDate();
					date = new Date(
						selectDate.getFullYear(),
						selectDate.getMonth() - 1,
						daysInPreviousMonth + dayDate
					);
				}
			} else if (dayDate > daysInMonth) {
				if (selectDate.getMonth() === 11) {
					date = new Date(
						selectDate.getFullYear() + 1,
						0,
						dayDate - daysInMonth
					);
				} else {
					date = new Date(
						selectDate.getFullYear(),
						selectDate.getMonth() + 1,
						dayDate - daysInMonth
					);
				}
			} else {
				date = new Date(
					selectDate.getFullYear(),
					selectDate.getMonth(),
					dayDate
				);
			}
			week.push({ date, day: dayDate });
			dayDate++;
		}
		table.push(week);
	}
	const isCurrentDay = (dd) => {
		return dd.getDate() === selectDate.getDate();
	};

	const isCurrentMonth = (dd) => {
		return dd.getMonth() === selectDate.getMonth();
	};

	return (
		<div
			className="table-container"
			style={{
				textAlign: "center",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div
				className="table-head"
				style={{
					width: "100%",
					textAlign: "center",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
				}}
			>
				{weekDays.map((day, index) => (
					<div key={index} style={{ width: "14.2%" }}>
						{day.charAt(0).toUpperCase() + day.charAt(1).toLowerCase()}
					</div>
				))}
			</div>
			<div
				className="table-body"
				style={{
					width: "100%",
					textAlign: "center",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				{table.map((week, index) => (
					<div
						className="table-line"
						key={index}
						style={{
							textAlign: "center",
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
						}}
					>
						{week.map((cell, index) => (
							<div
								className="calendar-day"
								key={index}
								onClick={() => onDateClick("d", cell.date)}
								style={{
									width: "14.2%",
									...(!isCurrentMonth(cell.date) ? { color: "lightgray" } : {}),
									...(isCurrentDay(cell.date) && isCurrentMonth(cell.date)
										? focusStyle
										: {}),
								}}
							>
								{cell.day > 0 && cell.day <= daysInMonth
									? cell.day
									: cell.date.getDate()}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export function createMonthTable({
	monthList,
	selectDate,
	onMonthClick,
	focusStyle,
}) {
	const handleClick = (monthIndex) => {
		let newDate = new Date(selectDate);
		newDate.setMonth(monthIndex);
		onMonthClick(newDate);
	};

	const chunkArray = (arr, size) => {
		const chunkedArray = [];
		for (let i = 0; i < arr.length; i += size) {
			chunkedArray.push(arr.slice(i, i + size));
		}
		return chunkedArray;
	};

	const monthsInRows = chunkArray(monthList, 4);

	return (
		<div className="month-selector">
			{monthsInRows.map((row, rowIndex) => (
				<div
					key={rowIndex}
					className="month-row"
					style={{
						textAlign: "center",
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
					}}
				>
					{row.map((month, columnIndex) => {
						const index = rowIndex * 4 + columnIndex;
						return (
							<div
								key={index}
								style={{
									width: "25%",
									marginTop: "10px",
									...(index === selectDate.getMonth() ? focusStyle : {}),
								}}
								onClick={() => handleClick(index)}
							>
								{month}
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
}
