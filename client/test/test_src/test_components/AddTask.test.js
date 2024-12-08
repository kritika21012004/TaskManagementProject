import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AddTask from "../../../src/components/AddTask";


global.alert = jest.fn();
const mockSubmit = jest.fn();

var mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet('http://localhost:8000/api/users').reply(200, {
  users: [
    { id: 1, name: 'John Smith' }
  ]
});

// Mock any POST request to /addTask
// arguments for reply are (status, data, headers)
mock.onPost('http://localhost:8000/api/tasks').reply(200, {
  message: "Task added successfully"
});


const setTasks = jest.fn();
const setOpen = jest.fn();

it("renders without crashing", async() => {
    render(<AddTask open={true} setOpen={setOpen} setTasks={setTasks} />);
    await waitFor(() => screen.getByText(/ADD TASK/i));
});

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


