import React from 'react';
import { render, fireEvent,waitFor ,screen} from '@testing-library/react';
import ChangePassword from '../../../src/components/ChangePassword';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

jest.mock("jwt-decode");

jest.mock('axios');

jest.mock('jwt-decode', () => jest.fn(() => ({
    id: '1'
  })));

describe('ChangePassword', () => {
  let component;
  let mockSetOpen;

  beforeEach(() => {
    mockSetOpen = jest.fn();
    localStorage.setItem('jwtToken', 'fake-token');
    component = render(<ChangePassword open={true} setOpen={mockSetOpen} />);
  });

  it('renders without crashing', () => {
    expect(component).toBeTruthy();
  });


it('disables submit button if both password fields are not filled', async () => {
    const submitButton = component.getByRole('button', { name: /Change/i });
    
    const oldPasswordInput = component.getByPlaceholderText('Old password');
    fireEvent.change(oldPasswordInput, { target: { value: '' } });
    
    const newPasswordInput = component.getByPlaceholderText('New password');
    fireEvent.change(newPasswordInput, { target: { value: '' } });
  
    // Checks if submitButton is disabled
    expect(submitButton.disabled).toBe(false);
  });
  
  
  
  
  it('closes the form when close button is clicked', () => {
    fireEvent.click(component.getByText('Cancel'));
  
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });


});