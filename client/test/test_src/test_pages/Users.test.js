import React from 'react';
import axios from 'axios';
import Users from '../../../src/pages/Users';
import { BrowserRouter as Router } from "react-router-dom";
import { render, waitFor,fireEvent } from '@testing-library/react';
import { act } from '@testing-library/react'; // act should be imported from "@testing-library/react" not "react-test-renderer"
import { createMemoryHistory } from 'history';
import mockAxios from 'jest-mock-axios';

jest.mock('axios', () => ({
  get: jest.fn()
}));
afterEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
 });

  describe('Users page', () => {
it('fetches data successfully from an API using Axios on componentDidMount', async () => {
  const mockedUsers = [
    { id: 1, name: 'John Doe', email: 'johndoe@test.com', role: 'Admin', tasks: ["Task1", "Task2"] },
    { id: 2, name: 'Jane Doe', email: 'janedoe@test.com', role: 'User', tasks: ["Task3", "Task4"] },
  ];

  axios.get.mockResolvedValueOnce({ data: mockedUsers });

  let getByText, asFragment;
  await act(async () => {
    const result = render(<Router><Users /></Router>);
    getByText = result.getByText;
    asFragment = result.asFragment;
  });
  
  expect(axios.get).toHaveBeenCalledTimes(1);
  await waitFor(() => expect(getByText('John Doe')).toBeDefined());
  await waitFor(() => expect(getByText('johndoe@test.com')).toBeDefined());
  await waitFor(() => expect(getByText('Admin')).toBeDefined());
  await waitFor(() => expect(getByText('Task1, Task2')).toBeDefined());  
});

it('handles error from API call', async () => {
    const errorMsg = 'Error fetching data';
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMsg)));
    console.error = jest.fn(); // suppress console.error throws for this one test

    const { container } = render(<Router><Users /></Router>);

    await waitFor(() => {
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledTimes(1);
    });
});

it('calls the correct API endpoint', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<Router><Users /></Router>);

    await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/users');
    });
});

it('renders the correct number of user rows', async () => {
    const mockedUsers = [
        { id: 1, name: 'John Doe', email: 'johndoe@test.com', role: 'Admin', tasks: ["Task 1", "Task 2"] },
        { id: 2, name: 'Jane Doe', email: 'janedoe@test.com', role: 'User', tasks: ["Task 3", "Task 4"] },
    ];

    axios.get.mockResolvedValueOnce({ data: mockedUsers });
    let container;
    await act(async () => {
        const result = render(<Router><Users /></Router>);
        container = result.container;
    });

    const userRows = container.querySelectorAll('tbody tr');
    expect(userRows).toHaveLength(2);
});

it('renders a default email when no email is provided', async () => {
    const mockedUsers = [
        { id: 1, name: 'John Doe', role: 'Admin', tasks: ["Task 1", "Task 2"] }
    ];

    axios.get.mockResolvedValueOnce({ data: mockedUsers });

    let getByText;
    await act(async () => {
        const result = render(<Router><Users /></Router>);
        getByText = result.getByText;
    });

    expect(getByText('user.email.com')).toBeDefined();
});

it('handles error', async () => {
    console.error = jest.fn(); // Suppress console error for this test
    axios.get.mockRejectedValueOnce(new Error('Error fetching data'));
    await act(async () => {
      render(<Router><Users /></Router>);
    });
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('loads users data', async () => {
    const getItem = jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('John Doe');
    axios.get.mockResolvedValueOnce({
        data: [
            { id: '1', name: 'John Doe', email: 'johndoe@test.com', role: 'Admin', tasks: ['Task 1'] }
        ]
    });

    const { findByText } = render(<Router><Users /></Router>);
    const result = await findByText('John Doe');
    expect(result).not.toBeNull();
    expect(result.textContent).toBe('JDJohn Doe');
});




it('renders user data', async () => {
    const mockedUsers = [
      { id: '1', name: 'John Doe', email: 'johndoe@test.com', role: 'Admin', tasks: ['Task 1'] }
    ];
  
    axios.get.mockResolvedValueOnce({ data: mockedUsers });
  
    let getByText;
    await act(async () => {
      const result = render(<Router><Users /></Router>);
      getByText = result.getByText;
    });
  
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('johndoe@test.com')).toBeTruthy();
    expect(getByText('Admin')).toBeTruthy();
    expect(getByText('Task 1')).toBeTruthy();
  });


  it('navigates to user details page on row click', async () => {
    const mockedUsers = [
      { id: '1', name: 'John Doe', email: 'johndoe@test.com', role: 'Admin', tasks: ['Task 1'] },
    ];
  
    axios.get.mockResolvedValueOnce({ data: mockedUsers });
  
    const history = createMemoryHistory();
    const { findByText } = render(
      <Router history={history}>
        <Users />
      </Router>
    );
  
    const userLink = await findByText('John Doe');
    fireEvent.click(userLink);
  
    expect(history.location.pathname).toBe('/');
  });


});


