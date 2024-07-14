import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../../../src/components/Navbar";

describe("Navbar", () => {
  it("renders the Navbar component", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Asserts
  })

  it("renders the UserAvatar component within Navbar", () => {
    const { getByRole } = render(
      <Router>
        <Navbar />
      </Router>
    );

    // Assuming UserAvatar includes a button with a unique name "NU"
    expect(getByRole('button', {name: 'NU'})).toBeTruthy();
  });
  it("renders the Navbar component", () => {
    const { container } = render(
      <Router>
        <Navbar />
      </Router>
    );
    // Check if Navbar element is present
    expect(container.querySelector(".navbar")).toBeTruthy();
  });

  it("renders the UserAvatar component within Navbar", () => {
    const { getByRole } = render(
      <Router>
        <Navbar />
      </Router>
    );
    // Assuming UserAvatar includes a button with a unique name "NU"
    expect(getByRole('button', {name: 'NU'})).toBeTruthy();
  });

  it("renders search icon within the Navbar", () => {
    const { container } = render(
      <Router>
        <Navbar />
      </Router>
    );
    // Assuming search icon is rendered with a unique class 'search-icon-div'
    expect(container.querySelector('.search-icon-div')).toBeTruthy();
  });

  it("shows the Profile Data", () => {
    const { container } = render(
      <Router>
        <Navbar />
      </Router>
    );
  
    // Verify Profile Avatar Data exists
    // Replace 'NU' with the actual Profile Avatar Data your component uses
    expect(container.textContent).toContain('NU');
  });

  it("renders div containers", () => {
    const { container } = render(
      <Router>
        <Navbar />
      </Router>
    );
    
    // Assuming your Navbar div has className="navbar" and your UserAvatar has className="useravatar-div"
    expect(container.querySelector('.navbar')).toBeTruthy();
    expect(container.querySelector('.useravatar-div')).toBeTruthy();
  }); 
  
  it("renders UserAvatar", () => {
      const { getByRole } = render(
        <Router>
          <Navbar />
        </Router>
      );
      
      expect(getByRole('button', {name: 'NU'})).toBeTruthy();
  });
});