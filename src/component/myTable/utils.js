import React from "react";

export const sortedLines = (key, order, lines) => {
	if (!key) return lines;

	return lines.slice().sort((a, b) => {
		const valueA = a[key];
		const valueB = b[key];

		const numA = parseFloat(valueA);
		const numB = parseFloat(valueB);

		if (!isNaN(numA) && !isNaN(numB)) {
			return order === "asc" ? numA - numB : numB - numA;
		} else if (valueA instanceof Date && valueB instanceof Date) {
			return order === "asc" ? valueA - valueB : valueB - valueA;
		} else {
			if (valueA < valueB) return order === "asc" ? -1 : 1;
			if (valueA > valueB) return order === "asc" ? 1 : -1;
			return 0;
		}
	});
};

export const filterLines = (searchTerm,lines,searchColumns) => {
    return lines.filter((line) => {
        return searchColumns.some((column) =>
            line[column]
                ?.toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    });
};

export const PageButtons = ({
	totalPages,
	currentPage,
	handleChangePage,
	colors,
}) => {
	const generateDOMButtons = () => {
		const buttons = [];
		if (currentPage !== 1) {
			buttons.push(
				<div key="gotoFirst" onClick={() => handleChangePage(1)}>
					⏮
				</div>
			);
			buttons.push(
				<div key="prev" onClick={() => handleChangePage(currentPage - 1)}>
					&nbsp;⏴&nbsp;
				</div>
			);
		}
		if (currentPage > 2) {
			buttons.push(<div key="beforeEllipsis">...</div>);
		}
		let start = Math.max(currentPage - 2, 1);
		let end = Math.min(currentPage + 2, totalPages);

		for (let i = start; i <= end; i++) {
			buttons.push(
				<div
					key={i}
					onClick={() => handleChangePage(i)}
					style={
						currentPage === i
							? {
									padding: "3px",
									fontWeight: "bold",
									border: "1px solid black",
									background: colors[0],
									background: `linear-gradient(0deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
							  }
							: { paddingTop: "4px" }
					}
				>
					&nbsp;{i}&nbsp;
				</div>
			);
		}

		if (currentPage < totalPages - 2) {
			buttons.push(<div key="afterEllipsis">...</div>);
		}

		if (currentPage !== totalPages) {
			buttons.push(
				<div key="next" onClick={() => handleChangePage(currentPage + 1)}>
					&nbsp;⏵&nbsp;
				</div>
			);
			buttons.push(
				<div key="gotoEnd" onClick={() => handleChangePage(totalPages)}>
					⏭
				</div>
			);
		}

		return buttons;
	};

	return generateDOMButtons();
};

export const darkenColor = (color) => {
	let r, g, b;
	if (color.startsWith("#")) {
		r = parseInt(color.slice(1, 3), 16);
		g = parseInt(color.slice(3, 5), 16);
		b = parseInt(color.slice(5, 7), 16);
	} else if (color.startsWith("rgb")) {
		[r, g, b] = color.match(/\d+/g).map(Number);
	} else {
		return color;
	}
	const darkenedR = Math.round(r * 0.88);
	const darkenedG = Math.round(g * 0.88);
	const darkenedB = Math.round(b * 0.88);
	return `rgb(${darkenedR}, ${darkenedG}, ${darkenedB})`;
};
