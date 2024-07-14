import { render, screen ,fireEvent} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../../../src/components/Sidebar'; 
import React from 'react';

describe('Sidebar', () => {
    beforeEach(() => {
        render(
            <Router>
                <Sidebar />
            </Router>
        );
    });

  test('should render sidebar correctly', () => {
    // Check that all sidebar links are rendered
    const linkNodeDashboard = screen.getByText('Dashboard');
    expect(linkNodeDashboard).toBeDefined();

    const linkNodeTasks = screen.getByText('Tasks');
    expect(linkNodeTasks).toBeDefined();
    
    const linkNodeUsers = screen.getByText('Users');
    expect(linkNodeUsers).toBeDefined();

    // Check that the app title is rendered
    const titleNode = screen.getByText('TaskMe');
    expect(titleNode).toBeDefined();
  });

  test('Dashboard link should navigate to /dashboard', () => {
    const linkNodeDashboard = screen.getByText('Dashboard');
    fireEvent.click(linkNodeDashboard);
    expect(window.location.pathname).toBe('/dashboard');
  });

  test('Tasks link should navigate to /tasks', () => {
    const linkNodeTasks = screen.getByText('Tasks');
    fireEvent.click(linkNodeTasks);
    expect(window.location.pathname).toBe('/tasks');
  });

  test('Users link should navigate to /users', () => {
    const linkNodeUsers = screen.getByText('Users');
    fireEvent.click(linkNodeUsers);
    expect(window.location.pathname).toBe('/users');
  });
});