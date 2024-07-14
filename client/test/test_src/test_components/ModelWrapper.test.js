import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ModalWrapper from '../../../src/components/ModelWrapper';

describe('ModalWrapper', () => {
  const mockSetOpen = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });


  it('renders the ModalWrapper children correctly when open', () => {
    const { getByText } = render(
      <ModalWrapper open={true} setOpen={mockSetOpen}>
        Hello, Modal!
      </ModalWrapper>
    );

    expect(getByText('Hello, Modal!')).toBeTruthy();
  });


  it('handles closing of modal', async () => {
    const { getByRole } = render(
      <ModalWrapper open={true} setOpen={mockSetOpen}>
        Hello, Modal!
      </ModalWrapper>
    );

    fireEvent.keyDown(getByRole('dialog'), {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27
    });
  });


  it('does not render the ModalWrapper when not open', () => {
    const { queryByText } = render(
      <ModalWrapper open={false} setOpen={mockSetOpen}>
        Hello, Modal!
      </ModalWrapper>
    );

    expect(queryByText('Hello, Modal!')).toBeNull(); // modal is not open, so children shouldn't render
  });


  it('closes the modal on escape key press', () => {
    const { getByRole } = render(
      <ModalWrapper open={true} setOpen={mockSetOpen}>
        Hello, Modal!
      </ModalWrapper>
    );
  
    fireEvent.keyDown(getByRole('dialog'), {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27
    });
  
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });


  it('does not close the modal on other key press', () => {
    const { getByRole } = render(
      <ModalWrapper open={true} setOpen={mockSetOpen}>
        Hello, Modal!
      </ModalWrapper>
    );
  
    fireEvent.keyDown(getByRole('dialog'), {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      charCode: 13
    });
  
    expect(mockSetOpen).not.toHaveBeenCalledWith(false);
  });

  
  it('displays the correct button text', () => {
    const { getByText } = render(
      <ModalWrapper open={true} setOpen={mockSetOpen}>
        <button>Close</button>
      </ModalWrapper>
    );
  
    expect(getByText('Close')).toBeTruthy();
  });
  

  it('does not close the modal when clicking outside the button', () => {
    const { getByRole, getByText } = render(
      <ModalWrapper open={true} setOpen={mockSetOpen}>
        <button>Close</button>
      </ModalWrapper>
    );
  
    // Click outside the button
    fireEvent.mouseDown(getByRole('dialog'));
    
    // setOpen should not have been called because of click outside
    expect(mockSetOpen).not.toHaveBeenCalled();
  });
  

  it('does not throw an error if setOpen is not provided', () => {
    const { getByRole } = render(
      <ModalWrapper open={true}>
        Hello, Modal!
      </ModalWrapper>
    );

    expect(() => fireEvent.click(getByRole('dialog'))).not.toThrow();
  });

  it('should display modal content when open prop is true', () => {
    const { queryByText } = render(
      <ModalWrapper open={true} setOpen={mockSetOpen}>
        Hello, Modal!
      </ModalWrapper>
    );
  
    expect(queryByText('Hello, Modal!')).toBeTruthy();
  });

  it('should not display modal content when open prop is false', () => {
    const { queryByText } = render(
      <ModalWrapper open={false} setOpen={mockSetOpen}>
        Hello, Modal!
      </ModalWrapper>
    );
  
    expect(queryByText('Hello, Modal!')).toBeNull();
  });


  it('does not render multiple children when not open', () => {
    const { queryByText } = render(
      <ModalWrapper open={false} setOpen={mockSetOpen}>
        <div>Hello, Modal!</div>
        <div>How are you?</div>
      </ModalWrapper>
    );
  
    expect(queryByText('Hello, Modal!')).toBeNull();
    expect(queryByText('How are you?')).toBeNull();
  });

  it('renders multiple children correctly when open', () => {
    const { getByText } = render(
      <ModalWrapper open={true} setOpen={mockSetOpen}>
        <div>Hello, Modal!</div>
        <div>How are you?</div>
      </ModalWrapper>
    );
  
    expect(getByText('Hello, Modal!')).toBeTruthy();
    expect(getByText('How are you?')).toBeTruthy();
  });


  it('renders with correct CSS classes', () => {
    const { getByRole } = render(
      <ModalWrapper open={true} setOpen={mockSetOpen}>
        Hello, Modal!
      </ModalWrapper>
    );
  
    const dialogElement = getByRole('dialog');
    // Convert the classlist to an Array, then join it to form a space-separated string
    const elementClasses = Array.from(dialogElement.classList).join(' ');
  
    // Assuming 'modelwrapper-dialog' is an actual class in your modal
    expect(elementClasses).toMatch('modelwrapper-dialog');
  });
  
});
