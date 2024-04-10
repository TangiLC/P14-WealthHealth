import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import MyModal from "./";

describe("MyModal", () => {
	test("renders default modal", () => {
		const mockCloseModal = jest.fn();

		const { getByText } = render(
			<MyModal
				modalTitle="Test Title"
				modalMessage="Test Message"
				isModalOpen={true}
				closeModal={mockCloseModal}
			/>
		);

		expect(getByText("Test Title")).toBeInTheDocument();
		expect(getByText("Test Message")).toBeInTheDocument();

		const closeButton = getByText("×");
		expect(closeButton).toBeInTheDocument();

		fireEvent.click(closeButton);
		expect(mockCloseModal).toHaveBeenCalledTimes(1);
	});

	test("renders modal correctly when open", () => {
		const mockCloseModal = jest.fn();

		const { getByText } = render(
			<MyModal
				overlayStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
				modalStyle={{ backgroundColor: "white" }}
				closeStyle={{ color: "red" }}
				closeContent="Close"
				modalTitle="Modal Title"
				modalMessage="Modal Message"
				isModalOpen={true}
				closeModal={mockCloseModal}
			/>
		);

		expect(getByText("Modal Title")).toBeInTheDocument();
		expect(getByText("Modal Message")).toBeInTheDocument();

		const closeButton = getByText("Close");
		expect(closeButton).toBeInTheDocument();

		fireEvent.click(closeButton);
		expect(mockCloseModal).toHaveBeenCalledTimes(1);
	});

	test("does not render modal when closed", () => {
		const { queryByText } = render(
			<MyModal
				isModalOpen={false}
				closeModal={() => {}} // Mock closeModal function
			/>
		);

		expect(queryByText("Modal Title")).not.toBeInTheDocument();
		expect(queryByText("Modal Message")).not.toBeInTheDocument();
	});
});
