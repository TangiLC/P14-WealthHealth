import axios from "axios";

export const fetchList = () => {
	return axios.get("http://localhost:3003/getAllEmployees/");
};

export const addEmployee = async (body) => {
	try {
		const response = await axios.put("http://localhost:3003/addEmployee", body);
		return { success: true };
	} catch (error) {
		console.error("Error adding employee:", error);
		return { success: false, error: error };
	}
};

export const deleteEmployee = async (id) => {
	try {
		const response = await axios.delete(
			`http://localhost:3003/deleteEmployee/${id}`
		);
		return { success: true };
	} catch (error) {
		if (error.response) {
			console.error("Error deleting employee:", error.response.data.error);
		} else if (error.request) {
			console.error("Error making request:", error.request);
		} else {
			console.error("Error:", error.message);
		}
	}
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
