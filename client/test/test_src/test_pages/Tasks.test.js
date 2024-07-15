import '@testing-library/jest-dom'
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../../src/AuthContext';
import Tasks from '../../../src/pages/Tasks';
import userEvent from '@testing-library/user-event';
import mockAxios from 'jest-mock-axios';
import { createMemoryHistory } from 'history';
import { render, fireEvent, screen,within,waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

jest.mock('axios', () => {
    return {
        get: jest.fn(() => Promise.resolve({ data: {} })),
    }
});
afterEach(() => {
    jest.clearAllMocks();
  });

test('renders Task component', () => {
    render(
      <Router>
        <Tasks />
      </Router>
    );
  });

  test('displays loading spinner', async () => {
    axios.get.mockResolvedValueOnce({ data: [] }); // mock user API
    axios.get.mockResolvedValueOnce({ data: [] }); // mock tasks API
  
    render(
      <MemoryRouter initialEntries={['/tasks']}>
        <Tasks />
      </MemoryRouter>
    );
  
    const loadElement = screen.queryByTestId('loader');
    expect(loadElement).toBeDefined();
  });

test('renders Create Task button and is clickable', async () => {
    axios.get.mockResolvedValueOnce({ data: [] }) // mock response for users API
      .mockResolvedValueOnce({ data: [] }); // mock response for tasks API
  
    render(
      <MemoryRouter initialEntries={['/tasks']}>
        <Tasks />
      </MemoryRouter>
    );
  
    // Update here
    const createTaskButton = await screen.findByText('Create Task');
    expect(createTaskButton).toBeInTheDocument();
    fireEvent.click(createTaskButton);
  });

test('renders Board View and List View tabs', async () => {
    render(
        <Router>
            <Tasks />
        </Router>
    );
    await waitFor(() => {
        const boardViewTab = screen.getByText('Board View');
        const listViewTab = screen.getByText('List View');

        expect(boardViewTab).toBeDefined();
        expect(listViewTab).toBeDefined();
    });
});

test('does not render loader after data load', async () => {
    axios.get.mockResolvedValueOnce({ data: [] }) // mock response for users API
      .mockResolvedValueOnce({ data: [] }); // mock response for tasks API
    
    render(
      <Router>
        <Tasks />
      </Router>
    );
  
    // Await for loader to disappear
    await waitFor(() => {
      const loaderElem = screen.queryByTestId('loader');
      expect(loaderElem).toBeNull();
    });
  });


