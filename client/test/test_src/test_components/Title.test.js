import { render, screen } from '@testing-library/react';
import Title from '../../../src/components/Title';
import React from 'react';

describe("Title", () => {
  test("renders title correctly", () => {
    const testTitle = "Test title";
    render(
      <Title title={testTitle} />
    );
    
    const titleElement = screen.getByText(testTitle);
    expect(titleElement.textContent).toEqual(testTitle);
  });

  test("renders with at least one class", () => {
    render(<Title title="Test Title" />);
    const titleElement = screen.getByText("Test Title");
    expect(titleElement.className.length).toBeGreaterThanOrEqual(1);
  });

  test("renders at least two classes when additional className is provided", () => {
    render(<Title title="Test Title" className="test-extra-class" />);
    const titleElement = screen.getByText("Test Title");
    const classes = titleElement.className.split(' ');
    expect(classes.length).toBeGreaterThanOrEqual(2);
  });

  test("does not render text when no title is provided", () => {
    const { container } = render(<Title />);
    const titleElements = container.getElementsByTagName('h2');
  
    // If no title is provided we assume there's a single h2 element
    expect(titleElements.length).toBe(1);
  
    // The h2 element should not contain any text
    expect(titleElements[0].textContent).toBe('');
  });
});