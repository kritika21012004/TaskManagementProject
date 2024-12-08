
import '@testing-library/jest-dom'
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { AuthContext } from '../../../src/AuthContext';
import Login from '../../../src/pages/Login';
import userEvent from '@testing-library/user-event';
import mockAxios from 'jest-mock-axios';
import { createMemoryHistory } from 'history';
import { render, fireEvent, screen,within,waitFor } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');

afterEach(() => {
  mockAxios.reset();
});

describe('<Login/>', () => {
  const mockSetUser = jest.fn();
  const history = createMemoryHistory();

  it('renders without crashing', () => {
    render(
      <Router>
        <AuthContext.Provider value={{ setUser: mockSetUser }}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );
  });

  it('displays sign up and login buttons', () => {
    render(
      <Router>
        <AuthContext.Provider value={{ setUser: mockSetUser }}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );

    expect(screen.getByRole('button', { name: /Sign up/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });


  it('should update username field when typing in sign up form', () => {
    const { getByPlaceholderText } = render(
      <Router>
        <AuthContext.Provider value={{ setUser: mockSetUser }}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );
    const usernameInput = getByPlaceholderText(/User name/i);
    fireEvent.change(usernameInput, { target: { value: 'MyTestUser' } });
    expect(usernameInput.value).toBe('MyTestUser');
  });
  
  it('should update email field in login form', () => {
    const { container } = render(
      <Router>
        <AuthContext.Provider value={{ setUser: mockSetUser }}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );
  
    const loginContainer = container.querySelector('.login');
    const emailInput = within(loginContainer).getByPlaceholderText(/Email/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    expect(emailInput.value).toBe('test@test.com');
  });
  
  it('should clear form fields after successful sign up', async () => {
    const { container, getByRole } = render(
        <Router>
            <AuthContext.Provider value={{ setUser: mockSetUser }}>
                <Login />
            </AuthContext.Provider>
        </Router>
    );

    const signupContainer = container.querySelector('.signup');
    const usernameInput = within(signupContainer).getByPlaceholderText(/User name/i);
    const emailInput = within(signupContainer).getByPlaceholderText(/Email/i);
    const passwordInput = within(signupContainer).getByPlaceholderText(/Password/i);
    const roleSelect = within(signupContainer).getByRole('combobox', { name: '' });

    userEvent.type(usernameInput, 'test user');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, 'Password@123');
    userEvent.selectOptions(roleSelect, ['Tester']);

    fireEvent.submit(getByRole('button', { name: /Sign up/i }));

    await waitFor(() => {
        expect(usernameInput.value).toBe('');
        expect(emailInput.value).toBe('');
        expect(passwordInput.value).toBe('');
    });
});


it('should clear form fields after successful login', async () => {
    const { container, getByRole } = render(
        <Router>
            <AuthContext.Provider value={{ setUser: mockSetUser }}>
                <Login />
            </AuthContext.Provider>
        </Router>
    );
  
    const loginContainer = container.querySelector('.login');
    const emailInput = within(loginContainer).getByPlaceholderText(/Email/i);
    const passwordInput = within(loginContainer).getByPlaceholderText(/Password/i);
  
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, 'Password@123');
  
    fireEvent.submit(getByRole('button', { name: /Login/i }));
  
    await waitFor(() => {
        expect(emailInput.value).toBe('');
        expect(passwordInput.value).toBe('');
    });
  });

  

});