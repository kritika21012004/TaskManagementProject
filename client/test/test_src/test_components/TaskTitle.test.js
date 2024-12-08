import { render, screen, fireEvent } from '@testing-library/react';
import TaskTitle from '../../../src/components/TaskTitle';
import React from 'react';

describe("TaskTitle", () => {
    test("Renders label correctly", () => {
      const testLabel = "Test label";
      render(<TaskTitle label={testLabel} />);
  
      const pElements = screen.getAllByText(testLabel);
      expect(pElements.length).toBeGreaterThanOrEqual(1);
    });
  
    test("Renders with default className", () => {
      render(
        <TaskTitle label="Test Title" />
      );
  
      const divElement = screen.getByText('Test Title').closest('div');
      expect(divElement.className.includes('task-title-inner')).toBe(true);
    });
  
    test("Renders with additional className", () => {
        render(<TaskTitle label="Test title" className="test-extra-class" />);
            
        const divElement = screen.getByText('Test title').closest('div').firstChild;
        expect(divElement.className.includes('test-extra-class')).toBe(true);
      });
  
      test("Renders button correctly", () => {
        render(<TaskTitle label="Test Title" />);
        
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeTruthy();
      
        expect(buttonElement.childNodes.length).toBeGreaterThanOrEqual(1);
      });

      test("TaskTitle's default button does not accept onClick prop", () => {
        const handleClick = jest.fn();
        render(<TaskTitle label="Test Label" onClick={handleClick} />);
        
        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);
    
        expect(handleClick).not.toHaveBeenCalled();
      });
      test("Renders with correct title and className", () => {
        const { container } = render(<TaskTitle label="Test Title" className="test-extra-class" />);
        const divs = container.querySelectorAll('div');
    
        expect(divs.length).toBeGreaterThan(1);
        expect(divs[0].className).toBe('task-title');
      });
    
      test("Checks if parent container has correct class", () => {
        const { container } = render(<TaskTitle label="Test class" />);
        const parentContainer = container.firstChild;
    
        expect(parentContainer.className).toBe('task-title');
      });
  });