/**
 * @jest-environment jsdom
 */
import React from 'react';
import reactDOM from 'react-dom';
import { Stars } from '../src/components/sharedComponents.jsx';
import renderer from 'react-test-renderer';

describe('Shared Components', () => {
  let stars;
  beforeAll(() => {
    stars = document.createElement('div');
    document.body.appendChild(stars);
    reactDOM.render(<Stars reviewsMeta={{ averageRating: 3.25 }} />, stars);
  });
  describe('Stars component', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<Stars reviewsMeta={{ averageRating: 3.25 }} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
