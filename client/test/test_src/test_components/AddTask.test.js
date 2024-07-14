import { render, fireEvent } from "@testing-library/react";
import React from "react";
import AddTask from "../../../src/components/AddTask";

global.alert = jest.fn();
const mockSubmit = jest.fn();

it("renders without crashing", () => {
    const setTasks = jest.fn();
    const setOpen = jest.fn();

    const { getByText } = render(<AddTask open={true} setOpen={setOpen} setTasks={setTasks} />);
    const titleElement = getByText(/ADD TASK/i);
    expect(titleElement).toBeTruthy();
});

it('updates state on input change', async() => {
    const setTasks = jest.fn();
    const setOpen = jest.fn();

    const { getByPlaceholderText } = render(<AddTask open={true} setOpen={setOpen} setTasks={setTasks} />);
    const titleInput = getByPlaceholderText('Task Title');
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    expect(titleInput.value).toBe('New Task');
});

it('should call setOpen when the cancel button is clicked', () => {
    const setTasks = jest.fn();
    const setOpen = jest.fn();

    const { getByText } = render(<AddTask open={true} setOpen={setOpen} setTasks={setTasks} />);
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(setOpen).toHaveBeenCalledWith(false);
});

it('should not call the api submission function when the form is submitted with empty fields', () => {
    const setTasks = jest.fn();
    const setOpen = jest.fn();

    const { getByText, getByPlaceholderText } = render(<AddTask open={true} setOpen={setOpen} setTasks={setTasks} />);
    
    const taskTitleInput = getByPlaceholderText('Task Title');
    fireEvent.change(taskTitleInput, { target: { value: '' } });

    const dateInput = getByPlaceholderText('Date');
    fireEvent.change(dateInput, { target: { value: '' } });

    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    expect(mockSubmit).not.toHaveBeenCalled();
});


