import React from 'react';
import { render ,fireEvent,waitFor} from '@testing-library/react';
import EditTask from '../../../src/components/EditTask';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

test('renders edit task form with initial values', () => {
    const task = {
      _id: "1",
      title: "Test task",
      date: "2022-01-01",
      stage: "todo",
      priority: "high",
      team: ["user1"],
      assets: [],
    };
  
    const { getByTestId, getByPlaceholderText, getByText } = render(<EditTask open={true} task={task} setOpen={() => {}} setTasks={() => {}} />);
  
    // Initial values are set properly
    expect(getByPlaceholderText('Task Title').value).toBe(task.title);
  
    // Retrieve date input by its placeholder
    // The way you used for getting date input might be failed
    const dateInput = getByPlaceholderText('Date');
  
    // Fire event to simulate form submission
    fireEvent.click(getByText('Submit'));
  
  });


  test('form inputs change when values update', () => {
    const task = {
      _id: "1",
      title: "Test task",
      date: "2022-01-01",
      stage: "todo",
      priority: "high",
      team: ["user1"],
      assets: [],
    };
  
    const { getByPlaceholderText } = render(<EditTask open={true} task={task} setOpen={() => {}} setTasks={() => {}} />);
  
    const titleInput = getByPlaceholderText('Task Title');
    const dateInput = getByPlaceholderText('Date');
  
    // Simulate user input
    fireEvent.change(titleInput, { target: { value: 'New Test Task' } });
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
  
    // Assert values have changed
    expect(titleInput.value).toBe('New Test Task');
    expect(dateInput.value).toBe('2023-01-01');
  });


  test('calls setOpen with false when the cancel button is clicked', () => {
    const task = {
      _id: "1",
      title: "Test task",
      date: "2022-01-01",
      stage: "todo",
      priority: "high",
      team: ["user1"],
      assets: [],
    };
  
    const setOpen = jest.fn();
    
    const { getByText } = render(<EditTask open={true} task={task} setOpen={setOpen} setTasks={() => {}} />);
  
    fireEvent.click(getByText('Cancel'));
  
    expect(setOpen).toHaveBeenCalledWith(false);
  });

  test('form calls API to submit the data', async () => {
    const axiosMock = new MockAdapter(axios);
  
    const task = {
      _id: "1",
      title: "Test task",
      date: "2022-01-01",
      stage: "todo",
      priority: "high",
      team: ["user1"],
      assets: [],
    };
  
    axiosMock.onGet('http://localhost:8000/api/users').reply(200, []);
    axiosMock.onPut(`http://localhost:8000/api/tasks/${task._id}`).reply(200);
  
    const { getByText } = render(<EditTask open={true} task={task} setOpen={() => {}} setTasks={() => {}} />);
  
    fireEvent.click(getByText('Submit'));
  
    await waitFor(() => expect(axiosMock.history.put.length).toBe(1));
    axiosMock.reset();
  });
  

  test('form handles API error gracefully', async () => {
    const axiosMock = new MockAdapter(axios);
  
    const task = {
      _id: "1",
      title: "Test task",
      date: "2022-01-01",
      stage: "todo",
      priority: "high",
      team: ["user1"],
      assets: [],
    };
  
    // Mock all the necessary API calls
    axiosMock.onGet('http://localhost:8000/api/users').reply(200, []);
    axiosMock.onGet(/\/api\/tasks\/.*/).reply(200, []); // Mock any GET request to /api/tasks/${id}
    axiosMock.onPut(`http://localhost:8000/api/tasks/${task._id}`).reply(500, { message: 'Error occurred while updating task' });
  
    const { container, getByText, queryByText } = render(<EditTask open={true} task={task} setOpen={() => {}} setTasks={() => {}} />);
    console.log(container.innerHTML);
  
    fireEvent.click(getByText('Submit'));
  
    await waitFor(() => expect(axiosMock.history.put.length).toBe(1));
  
    console.log(container.innerHTML);
    expect(queryByText(/Error occurred/i)).toBeNull();
  
    axiosMock.reset();
});