import axios from "axios";

export const fetchList = () => {
	return axios.get("http://localhost:3003/getAllEmployees/");
};

export const getWeekDay = (date, language, isShort) => {
	const daysOfWeek = {
		en: [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		],
		fr: [
			"Dimanche",
			"Lundi",
			"Mardi",
			"Mercredi",
			"Jeudi",
			"Vendredi",
			"Samedi",
		],
		es: [
			"Domingo",
			"Lunes",
			"Martes",
			"Miércoles",
			"Jueves",
			"Viernes",
			"Sábado",
		],
	};

	const dayIndex = new Date(date).getDay();
	const days = daysOfWeek[language];
	if (isShort) {
		return days[dayIndex].substring(0, 3);
	} else {
		return days[dayIndex];
	}
};
