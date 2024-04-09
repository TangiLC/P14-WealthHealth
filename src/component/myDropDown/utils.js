import React from "react";

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
