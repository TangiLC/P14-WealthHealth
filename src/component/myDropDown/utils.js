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
