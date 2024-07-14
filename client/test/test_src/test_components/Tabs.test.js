import { render, fireEvent, screen } from "@testing-library/react";
import Tabs from "../../../src/components/Tabs";
import { HiOutlineCalendar, HiOutlineInbox } from "react-icons/hi";
import React from "react";
const tabs = [
  {
    title: "Inbox",
    icon: <HiOutlineInbox />,
  },
  {
    title: "Calendar",
    icon: <HiOutlineCalendar />,
  },
];

describe("Tabs", () => {
  it("Should render given tabs correctly", () => {
    render(
      <Tabs tabs={tabs} setSelected={() => {}}>
        
      </Tabs>
    );
  
    tabs.forEach((tab) => {
      const tabElement = screen.getByText(tab.title)
      expect(tabElement).toBeDefined();
    });
  });

  it("Should trigger setSelected with correct index", () => {
    const setSelectedMock = jest.fn();

    render(
      <Tabs tabs={tabs} setSelected={setSelectedMock}>
       
      </Tabs>
    );

    fireEvent.click(screen.getByText(tabs[0].title));
    fireEvent.click(screen.getByText(tabs[1].title));

    expect(setSelectedMock).toHaveBeenCalledTimes(2);
    expect(setSelectedMock).toHaveBeenNthCalledWith(1, 0); // assert setSelected was called with index 0 
    expect(setSelectedMock).toHaveBeenNthCalledWith(2, 1); // assert setSelected was called with index 1
  });

  // you might want to test 'selected' state styles here. But please be aware this StyleSheet test will depend on @headlessui/react
});