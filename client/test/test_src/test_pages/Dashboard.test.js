import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Dashboard from '../../../src/pages/Dashboard';
import fetchMock from 'fetch-mock';
import { wait } from "@testing-library/react";
import {UserTable,TaskTable} from '../../../src/pages/Dashboard';

var mock = new MockAdapter(axios);

const mockData = {
    tasks: [
      {
        title: "Task 1",
        priority: "high",
        date: "2022-09-25",
        stage: "in-progress",
      },
      {
        title: "Task 2",
        priority: "medium",
        team: ["team2"],
        date: "2022-09-26",
        stage: "completed",
      },
    ],
    
    users: [
      {
        name: "User 1",
        role: "developer",
      },
      {
        name: "User 2",
        role: "manager",
      },
    ],
  
    // for the tasks_count, just use an object with your counts
    tasksCount: {
      totalTasks: 2,
      inProgressTasks: 1,
      todoTasks: 0,
      completedTasks: 1,
    },
  };

  afterEach(() => {
    fetchMock.restore();
  });
 mock.onGet('http://localhost:8000/api/tasks_count').reply(200, mockData);

// Test Case 1: Dashboard renders without crashing
test('renders Dashboard component', () => {
  render(
    <Router>
      <Dashboard />
    </Router>
  );
});


test('renders data after Axios call', async () => {
  const { getByText } = render(
    <Router>
      <Dashboard />
    </Router>
  );
  await waitFor(() => expect(getByText('Tasks')).not.toBeNull());
});


// Test Case 6: Check if task list does not show empty message
test("Empty list message doesn't appear on a successful load", () => {
  render(
    <Router>
      <Dashboard />
    </Router>
  );
  expect(screen.queryByText(/no tasks found/i)).toBeNull();
});



it('Should render correct number of users', () => {
    render(
      <UserTable users={mockData.users} />
    );

    for(const user of mockData.users){
      const matchedUserName = screen.getAllByText(user.name);
      expect(matchedUserName).toHaveLength(1);
      const matchedRole = screen.getAllByText(user.role);
      expect(matchedRole).toHaveLength(1);
    }
});

it('Should render correct number of tasks', () => {
    render(<TaskTable tasks={mockData.tasks} getUserById={() => {}} />);

    for(const task of mockData.tasks){
      const matchedTask = screen.getAllByText(task.title);
      expect(matchedTask).toHaveLength(1);
    }
});

it("Should render the correct user initials", () => {
    render(<UserTable users={mockData.users} />);

    for(const user of mockData.users){
      const userInitials = screen.getAllByText(user.name.split(" ").map((n)=>n[0]).join(""));
      expect(userInitials).toHaveLength(1);
    }
});

it("Should render the correct user role", () => {
    render(<UserTable users={mockData.users} />);

    for(const user of mockData.users){
      const userRole = screen.getAllByText(user.role);
      expect(userRole).toHaveLength(1);
    }
});