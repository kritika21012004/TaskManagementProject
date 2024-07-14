import React from "react";
import { render, fireEvent, screen,waitFor } from "@testing-library/react";
import TaskDialog from "../../../src/components/TaskDialog";
import { useNavigate } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';

jest.mock('react-router-dom', () => ({
 ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
 useNavigate: jest.fn()
}));

const mockNavigate = useNavigate;

const task = {
  _id: "1",
  title: "Test Task"
};

describe("TaskDialog", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component", async () => {
    render(
      <MemoryRouter>
        <TaskDialog task={task} />
      </MemoryRouter>
    );
    const menuBtn = await screen.findByRole("button");
    expect(menuBtn).not.toBeNull();
});
});