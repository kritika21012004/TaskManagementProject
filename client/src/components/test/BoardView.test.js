import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BoardView from '../BoardView';
import axios from 'axios';

describe('BoardView', () => {
  const tasks = [
    { id: 1, title: 'Task 1' },
    { id: 2, title: 'Task 2' }
  ];
  
  const mockGetUserById = jest.fn();
  const mockSetTasks = jest.fn();

  it('renders without crashing', () => {
    const { getByTestId } = render(<BoardView tasks={tasks} getUserById={mockGetUserById} setTasks={mockSetTasks} />);
    const boardView = getByTestId('board-view');
    expect(boardView).toBeInTheDocument();
  });

  it('displays correct number of tasks', () => {
    const { getAllByText } = render(<BoardView tasks={tasks} getUserById={mockGetUserById} setTasks={mockSetTasks} />);
    const cards = getAllByText(/Task /);
    expect(cards.length).toBe(tasks.length);
});
});