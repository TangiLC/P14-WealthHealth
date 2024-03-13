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

export function setNewFocus(event, focusedIndex, list) {
	switch (event.key) {
		case "ArrowUp":
			event.preventDefault();
			if (focusedIndex > 0) {
				return focusedIndex - 1;
			}
			break;
		case "ArrowDown":
			event.preventDefault();
			if (focusedIndex < list.length - 1) {
				return focusedIndex + 1;
			}
			break;
		case "Tab":
			if (event.shiftKey) {
				event.preventDefault();
				if (focusedIndex > 0) {
					return focusedIndex - 1;
				}
			} else {
				event.preventDefault();
				if (focusedIndex < list.length - 1) {
					return focusedIndex + 1;
				}
			}
			break;
		default:
			if (event.key.length === 1) {
				const charPressed = event.key.toLowerCase();
				const index = list.findIndex((item) =>
					item.toLowerCase().startsWith(charPressed)
				);
				if (index !== -1) {
					return index;
				}
			}
			break;
	}
	return focusedIndex;
}

export function createMonthTable({
	weekDays,
	selectDate,
	onDateClick,
	focusStyle,
}) {
	const daysInMonth = new Date(selectDate.year, selectDate.month + 1, 0).getDate();
	const firstDayOfMonth = new Date(selectDate.year, selectDate.month, 0).getDay();
	const table = [];

	let dayDate = 1 - firstDayOfMonth;
	for (let i = 0; i < 6; i++) {
		const week = [];
		for (let j = 0; j < 7; j++) {
			let date;
			if (dayDate <= 0) {
				if (selectDate.month === 0) {
					const daysInPreviousMonth = new Date(selectDate.year - 1, 12, 0).getDate();
					date = new Date(selectDate.year - 1, 11, daysInPreviousMonth + dayDate);
				} else {
					const daysInPreviousMonth = new Date(selectDate.year, selectDate.month, 0).getDate();
					date = new Date(selectDate.year, selectDate.month - 1, daysInPreviousMonth + dayDate);
				}
			} else if (dayDate > daysInMonth) {
				if (selectDate.month === 11) {
					date = new Date(selectDate.year + 1, 0, dayDate - daysInMonth);
				} else {
					date = new Date(selectDate.year, selectDate.month + 1, dayDate - daysInMonth);
				}
			} else {
				date = new Date(selectDate.year, selectDate.month, dayDate);
			}
			week.push({ date, day: dayDate });
			dayDate++;
		}
		table.push(week);
	}
	const isCurrentDay = (dd) => {
		return dd.getDate() === selectDate.day;
	};

	const isCurrentMonth = (dd) => {
		return dd.getMonth() === selectDate.month;
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
								onClick={() => onDateClick(cell.date)}
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
