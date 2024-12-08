import { act, render, screen ,fireEvent} from '@testing-library/react';
import UserInfo from '../../../src/components/UserInfo'; 
import React from 'react';

describe('UserInfo', () => {
  test('does not render without user data', () => {
    const { container } = render(<UserInfo />);

    expect(container.innerHTML).toBe(""); // checks that component rendered nothing
  });

  test("Renders only initials when user's name is provided", () => {
    const user = { name: 'John Doe', email: 'john@example.com', role: 'User' };
    act(() => {
      render(<UserInfo user={user} />);
    });

    const buttonElement = screen.getByRole('button');
    expect(buttonElement.textContent).toBe('JD');
  });

  test("Displays the initials when user's name is provided", () => {
    const user = { name: 'John Doe', email: 'john@example.com', role: 'User' };
    render(<UserInfo user={user} />);
    
    const buttonElement = screen.getByRole('button');
    expect(buttonElement.textContent).toBe('JD');
  });

  test("Does not render when no user name is provided", () => {
    const user = { email: 'john@example.com', role: 'User' };
    const { container } = render(<UserInfo user={user} />);
    expect(container.firstChild).toBeNull();
  });

  test("Renders the initials correctly when user's first and last names are provided", () => {
    const user = { name: 'John Doe', email: 'john@example.com', role: 'User' };
    render(<UserInfo user={user} />);
    
    const initialsElement = screen.getByText('JD');
    expect(initialsElement.textContent).toBe('JD');
  });
  
  test("Renders the initials correctly when user's single name is provided", () => {
    const user = { name: 'John', email: 'john@example.com', role: 'User' };
    render(<UserInfo user={user} />);
    
    const initialsElement = screen.getByText('J');
    expect(initialsElement.textContent).toBe('J');
  });


});