/**
 * @jest-environment jsdom
 */
import React from 'react';
import reactDOM from 'react-dom';
import { Stars } from './sharedComponents.jsx';

describe('Shared Components', () => {
  let stars;
  beforeAll(() => {
    stars = document.createElement('div');
    document.body.appendChild(stars);
    reactDOM.render(<Stars reviewsMeta={{ averageRating: 4.25 }} />, stars);
  });
  describe('Stars component', () => {
    it('should have five children, nested in a div', () => {
      expect(stars.children[0].children.length).toEqual(5);
    });
    it('should have images as children', () => {
      expect(stars.children[0].children[0].children[0].tagName).toEqual('IMG');
    });
  });
});
