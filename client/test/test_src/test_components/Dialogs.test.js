import React from "react";
import { render ,fireEvent} from "@testing-library/react";
import ConfirmationDialog from "../../../src/components/Dialogs";
import { UserAction } from "../../../src/components/Dialogs";

test("renders ConfirmationDialog without crashing", () => {
    const setOpen = jest.fn(); // add this
    // pass setOpen and set open={true}
    const { queryByText } = render(<ConfirmationDialog open={true} setOpen={setOpen} />);
    
    // use not.toBeNull() in place of toBeInTheDocument()
    expect(queryByText(/Are you sure you want to delete the selected record?/i)).not.toBeNull(); 
  });

  test("On Cancel, it should call the setOpen function", () => {
    const setOpen = jest.fn();
    const { getByText } = render(<ConfirmationDialog open={true} setOpen={setOpen} />);
    
    fireEvent.click(getByText(/Cancel/i));
    
    expect(setOpen).toHaveBeenCalled();
  });
  
  test("If msg prop is provided, it should render that instead of the default message", () => {
    const setOpen = jest.fn();
    const customMsg = "Are you sure you want to complete this action?";
    const { getByText } = render(<ConfirmationDialog open={true} setOpen={setOpen} msg={customMsg} />);
    
    expect(getByText(customMsg)).not.toBeNull();
  });

  test("On Close, it should call the setOpen function", () => {
    const setOpen = jest.fn();
    const { getByText } = render(<UserAction open={true} setOpen={setOpen} />);
    
    fireEvent.click(getByText(/No/i));
    
    expect(setOpen).toHaveBeenCalled();
  });
  
  test("If yes is selected, it should call the onClick function", () => {
    const setOpen = jest.fn();
    const onClick = jest.fn();
    const { getByText } = render(<UserAction open={true} setOpen={setOpen} onClick={onClick} />);
    
    fireEvent.click(getByText(/Yes/i));
    
    expect(onClick).toHaveBeenCalled();
  });

  test("calls onClick when 'Delete' button is clicked", () => {
    const onClick = jest.fn();
    const setOpen = jest.fn(); 
    const { getByText } = render(<ConfirmationDialog open={true} setOpen={setOpen} onClick={onClick} />);
  
    fireEvent.click(getByText("Delete"));
  
    expect(onClick).toHaveBeenCalled(); 
  });

  test("calls setType and setMsg after closing dialog", () => {
    const setType = jest.fn();
    const setMsg = jest.fn();
    const setOpen = jest.fn(); 
    const { getByText } = render(<ConfirmationDialog open={true} setOpen={setOpen} setType={setType} setMsg={setMsg} />);
  
    fireEvent.click(getByText("Cancel"));
  
    expect(setType).toHaveBeenCalled(); 
    expect(setMsg).toHaveBeenCalled(); 
  });
  test("calls onClick when 'Yes' button is clicked", () => {
    const onClick = jest.fn();
    const setOpen = jest.fn(); 
    const { getByText } = render(<UserAction open={true} setOpen={setOpen} onClick={onClick} />);
  
    fireEvent.click(getByText("Yes"));
  
    expect(onClick).toHaveBeenCalled(); 
  });
  test("renders the correct action message", () => {
    const setOpen = jest.fn(); 
    const { getByText } = render(<UserAction open={true} setOpen={setOpen} />);
  
    expect(getByText(/Are you sure you want to activate or deactive this account?/i)).not.toBeNull();
  });