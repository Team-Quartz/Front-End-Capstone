/**
 * @jest-environment jsdom
 */
import React from 'react';
import reactDOM from 'react-dom';
import { Stars } from '../src/components/sharedComponents.jsx';

describe('Shared Components', () => {
  let stars;
  beforeAll(() => {
    stars = document.createElement('div');
    document.body.appendChild(stars);
    reactDOM.render(<Stars reviewsMeta={{ averageRating: 3.25 }} />, stars);
  });
  describe('Stars component', () => {
    //TODO: replace this test with a DOM snapshot
    it('should have five children, nested in a div', () => {
      expect(stars.children[0].children.length).toEqual(5);
    });
  });
});
