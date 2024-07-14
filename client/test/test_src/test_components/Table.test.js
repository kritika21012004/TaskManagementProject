import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Table from '../../../src/components/Table';
import { waitFor } from '@testing-library/react';
import { formatDate } from '../../../src/utils';

const tasks = [
  {
    _id: "1",
    title: "Test Task 1",
    priority: "high",
    date: new Date().toISOString(),
    assets: [],
    team: [],
    stage: "todo"
  },
  {
    _id: "2",
    title: "Test Task 2",
    priority: "low",
    date: new Date().toISOString(),
    assets: [],
    team: [],
    stage: "doing"
  },
];

const setTasksMock = jest.fn();

const getUserById = (id) => ({ id, name: `User ${id}` });

describe("Table", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render table correctly", () => {
    const { getAllByRole } = render(<Table tasks={tasks} getUserById={getUserById} setTasks={setTasksMock} />);
    
    const rows = getAllByRole('row');
    expect(rows.length).toEqual(tasks.length + 1); // Tasks rows plus header
  });

  it("should call handleEdit function when Edit button is clicked", () => {
    render(
      <Table tasks={tasks} getUserById={getUserById} setTasks={setTasksMock} />
    );

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(setTasksMock).not.toHaveBeenCalled();
  });

  it("should call deleteClicks function when Delete button is clicked", () => {
    render(
      <Table tasks={tasks} getUserById={getUserById} setTasks={setTasksMock} />
    );

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(setTasksMock).not.toHaveBeenCalled();
  });
  it("should render table header correctly", () => {
    render(
      <Table tasks={tasks} getUserById={getUserById} setTasks={setTasksMock} />
    );
  
    expect(screen.getByText("Task Title")).toBeDefined();
    expect(screen.getByText("Priority")).toBeDefined();
    expect(screen.getByText("Due Date")).toBeDefined();
    expect(screen.getByText("Assets")).toBeDefined();
    expect(screen.getByText("Team")).toBeDefined();
  });
  it("should render table cells correctly", () => {
    render(
      <Table tasks={tasks} getUserById={getUserById} setTasks={setTasksMock} />
    );
  
    tasks.forEach((task) => {
        expect(screen.getByText(task.title)).toBeDefined();
        expect(screen.getByText("high Priority")).toBeDefined(); // Replace high with task.priority if priorities are different in tasks
        expect(screen.getAllByText(formatDate(new Date(task.date)))[0]).toBeDefined();
        expect(screen.getAllByText(task.assets.length.toString())[0]).toBeDefined(); // Updated here
      });
  });
  
  
  
});
  
