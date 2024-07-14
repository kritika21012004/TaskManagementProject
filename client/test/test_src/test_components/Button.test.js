import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../src/components/Button';
import React from 'react';

describe("Button", () => {
  test("Renders button correctly", () => {
    render(<Button label="Upload"/>);
    
    const buttonElement = screen.getByRole('button');
    expect(buttonElement.textContent).toBe('Upload');
  });

  test("Renders with specified class", () => {
    render(<Button label="Upload" className="btn-upload"/>);
    
    const buttonElement = screen.getByRole('button');
    expect(buttonElement.className).toContain('btn-upload');
  });

  test("does not trigger onClick when not provided", () => {
    const mockOnClick = jest.fn();
    render(
      <Button label="Test Button" />
    );

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test("Correctly triggers onClick event", () => {
    const handleClick = jest.fn();
    render(<Button label="Upload" onClick={handleClick}/>);

    fireEvent.click(screen.getByText(/Upload/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("Button is of type submit when specified", () => {
    render(<Button label="Upload" type="submit"/>);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement.getAttribute('type')).toBe('submit');
  });
  test("renders correct icon when icon prop is present", () => {
    const icon = <div>Test Icon</div>;
    render(
      <Button label="Test Button" icon={icon} />
    );
    
    const iconElement = screen.getByText(/Test Icon/i);
    expect(iconElement).toBeTruthy()
  });
  
  test("does not render icon when icon prop is not present", () => {
    render(
      <Button label="Test Button" />
    );
  
    const iconElement = screen.queryByText("Test Icon");
    expect(iconElement).toBeNull()
  });

});