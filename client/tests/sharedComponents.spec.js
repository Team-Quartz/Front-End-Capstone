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
    //this setup uses jsdom to generate a headless browser instance, and render the Stars object into it
    //then we can use regular js DOM manipulation to get information about how it rendered and test on that
    stars = document.createElement('div');
    document.body.appendChild(stars);
    reactDOM.render(<Stars reviewsMeta={{ averageRating: 3.25 }} />, stars);
  });
  describe('Stars component, jsdom', () => {
    it('should have five children, nested in a div', () => {
      expect(stars.children[0].children.length).toEqual(5);
    });
    it('should have images as children', () => {
      expect(stars.children[0].children[0].children[0].tagName).toEqual('IMG');
    });
  });
  describe('Stars component, react-test-renderer', () => {
    it('renders correctly', () => {
      //this test uses react-test-renderer to generate a json object version of the DOM
      //the snapshot method compares it to a saved, known-correct version
      //but also regular object traversal can be used to check for specific properties, etc
      const tree = renderer.create(<Stars reviewsMeta={{ averageRating: 3.25 }} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
