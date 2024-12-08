import React from 'react';
import { render } from '@testing-library/react';
import BoardView from '../../../src/components/BoardView';
import TaskCard from '../../../src/components/TaskCard';
import axios from 'axios';

jest.mock('../../../src/components/TaskCard', () => jest.fn(() => null)); // Mock the TaskCard
jest.mock('axios');

describe('BoardView', () => {
    const setTasks = jest.fn();
    const getUserById = jest.fn();
    const tasks = [
      { title: 'Task 1', _id: 1 }, 
      { title: 'Task 2', _id: 2 }
    ];
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('does not render TaskCard when tasks is empty', () => {
        render(<BoardView tasks={[]} getUserById={getUserById} setTasks={setTasks} />);
        expect(TaskCard).toHaveBeenCalledTimes(0);
      });

      it('does not render TaskCard when tasks is null', () => {
        render(<BoardView tasks={null} getUserById={getUserById} setTasks={setTasks} />);
        expect(TaskCard).toHaveBeenCalledTimes(0);
      });

      it('does not render TaskCard when tasks is unassigned', () => {
        render(<BoardView getUserById={getUserById} setTasks={setTasks} />);
        expect(TaskCard).toHaveBeenCalledTimes(0);
      });
  
    it('renders without crashing', () => {
      const { container } = render(<BoardView tasks={tasks} getUserById={getUserById} setTasks={setTasks} />);
      expect(container).toBeTruthy();
    });
  
    it('renders TaskCard for each task', () => {
      render(<BoardView tasks={tasks} getUserById={getUserById} setTasks={setTasks} />);
      expect(TaskCard).toHaveBeenCalledTimes(tasks.length);
    });



});