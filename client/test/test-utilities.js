import { render } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import jsdomGlobal from 'jsdom-global';

jsdomGlobal();

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Router, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };