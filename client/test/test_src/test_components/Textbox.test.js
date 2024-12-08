import { fireEvent, render, screen } from '@testing-library/react';
import Textbox from '../../../src/components/Textbox';
import { useForm } from "react-hook-form";
import React from 'react';

describe("Textbox", () => {
    const Wrapper = ({ children }) => {
        const { register, handleSubmit, formState: { errors } } = useForm();
        const onSubmit = data => console.log(data);

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                {children(register, errors)}
            </form>
        );
    };

    test("renders label correctly", () => {
        render(
            <Wrapper>
                {(register, errors) => (
                    <Textbox type="text" placeholder="enter text" label="Test Label" register={register} name="test-input" error={errors['test-input']} />
                )}
            </Wrapper>
        );

        const labelElement = screen.getByText(/Test Label/i);
        expect(labelElement).not.toBeNull();

    });

    test("renders error message correctly", () => {
        render(
            <Wrapper>
                {(register, errors) => (
                    <Textbox type="text" placeholder="enter text" label="Test Label" register={register} name="test-input" error="Test error message" />
                )}
            </Wrapper>
        );

        const errorElement = screen.getByText(/Test error message/i);
        expect(errorElement).not.toBeNull();

    });

    test("test the input of text", () => {
        render(
            <Wrapper>
                {(register, errors) => (
                    <Textbox type="text" placeholder="enter text" label="Test Label" register={register} name="test-input" error={errors['test-input']} />
                )}
            </Wrapper>
        );

        const inputElement = screen.getByPlaceholderText(/enter text/i);
        fireEvent.change(inputElement, { target: { value: 'Test value' } });
        expect(inputElement.value).toBe('Test value');
    });

    test("test if input type is correct", () => {
        render(
            <Wrapper>
                {(register, errors) => (
                    <Textbox type="text" placeholder="enter text" label="Test Label" register={register} name="test-input" error={errors['test-input']} />
                )}
            </Wrapper>
        );

        const inputElement = screen.getByRole('textbox');
        expect(inputElement.getAttribute('type')).toBe('text');
    });
    test("check whether input field is available", () => {
        render(
            <Wrapper>
                {(register, errors) => (
                    <Textbox type="text" placeholder="enter text" label="Test Label" register={register} name="test-input" error={errors['test-input']} />
                )}
            </Wrapper>
        );

        const inputElement = screen.getByPlaceholderText(/enter text/i);
        expect(inputElement).not.toBeNull();
    });


    test("test if input name is correct", () => {
        render(
          <Wrapper>
            {(register, errors) => (
              <Textbox type="text" placeholder="enter text" label="Test Label" register={register} name="test-input" error={errors['test-input']} />
            )}
          </Wrapper>
        );
    
        const inputElement = screen.getByRole('textbox');
        expect(inputElement.getAttribute('name')).toBe('test-input');
    });
    
    
    test("test if ARIA invalid attribute is correct when error is not null", () => {
        render(
          <Wrapper>
            {(register, errors) => (
              <Textbox type="text" placeholder="enter text" label="Test Label" register={register} name="test-input" error="Test error message" />
            )}
          </Wrapper>
        );
    
        const inputElement = screen.getByRole('textbox');
        expect(inputElement.getAttribute('aria-invalid')).toBe('true');
    });
    
    test("should not render label without label prop", () => {
        render(
          <Wrapper>
            {(register, errors) => (
              <Textbox type="text" placeholder="enter text" register={register} name="test-input" error={errors['test-input']} />
            )}
          </Wrapper>
        );
    
        const labelElement = screen.queryByText(/Test Label/i);
        expect(labelElement).toBeNull();
    });
    
    test("should not display error message without error prop", () => {
        render(
          <Wrapper>
            {(register, errors) => (
              <Textbox type="text" placeholder="enter text" label="Test Label" register={register} name="test-input" />
            )}
          </Wrapper>
        );
    
        const errorElement = screen.queryByText(/Test error message/i);
        expect(errorElement).toBeNull();
    });
    
    
    
    test("should handle onchange event if onChange prop is given", () => {
      const mockOnChange = jest.fn();
      const changedValue = 'Changed value';
      render(
          <Wrapper>
              {(register, errors) => (
                  <Textbox type="text" placeholder="enter text" label="Test Label" register={register} name="test-input"
                           error={errors['test-input']} onChange={mockOnChange} />
              )}
          </Wrapper>
      );
    
      const inputElement = screen.getByRole('textbox');
      fireEvent.change(inputElement, { target: { value: changedValue } });
      expect(mockOnChange).toBeCalledTimes(1);
      expect(inputElement.value).toBe(changedValue);
    });


});