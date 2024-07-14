import React from 'react';
import { render } from '@testing-library/react';
import Loading from '../../../src/components/Loader';

describe('Loading', () => {
    it('renders without crashing', () => {
      render(<Loading />);
    });
  
    it('renders five dot elements', () => {
      const { getAllByTestId } = render(<Loading />);
      const dots = getAllByTestId('dot');
      expect(dots.length).toBe(5);
    });
    
    it('dot element has class "dot"', () => {
        const { getAllByTestId } = render(<Loading />);
        const dots = getAllByTestId('dot');
        dots.forEach((dot) => {
          expect(dot.classList.contains('dot')).toBe(true);
        });
      });


      it('is visible', () => {
        const { getByTestId } = render(<Loading />);
        const dotsContainer = getByTestId('dots-container');
        const style = window.getComputedStyle(dotsContainer);
        expect(style.display).not.toBe('none');
        expect(style.visibility).not.toBe('hidden');
        expect(style.opacity).not.toBe('0');
      });
  });