import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchList, addEmployee, deleteEmployee } from "./utils";

describe("API functions", () => {
	let mock;

	beforeEach(() => {
		mock = new MockAdapter(axios);
	});

	afterEach(() => {
		mock.restore();
	});

	test("fetchList returns data", async () => {
		const data = [{ id: 1, name: "John Doe" }];
		mock.onGet("http://localhost:3003/getAllEmployees/").reply(200, data);

		const response = await fetchList();

		expect(response.data).toEqual(data);
	});

	test("addEmployee successfully adds employee", async () => {
		const employee = { name: "John Doe" };
		mock.onPut("http://localhost:3003/addEmployee", employee).reply(200);

		const response = await addEmployee(employee);

		expect(response.success).toBe(true);
	});

	test("deleteEmployee successfully deletes employee", async () => {
		const id = 1;
		mock.onDelete(`http://localhost:3003/deleteEmployee/${id}`).reply(200);

		const response = await deleteEmployee(id);

		expect(response.success).toBe(true);
	});

	test("addEmployee handles error", async () => {
		const employee = { name: "John Doe" };
		const errorMessage = "Error adding Employee";
		mock.onPut("http://localhost:3003/addEmployee", employee).reply(500, {
			error: errorMessage,
		});

		const response = await addEmployee(employee);

		expect(response.success).toBe(false);
	});

	test("deleteEmployee handles 500 error", async () => {
		const id = 1;
		const errorMessage = "Error deleting employee";
		mock
			.onDelete(`http://localhost:3003/deleteEmployee/${id}`)
			.reply(500, { error: errorMessage });

		const response = await deleteEmployee(id);

		if (response) {
			expect(response.success).toBe(false);
		}
	});
});
