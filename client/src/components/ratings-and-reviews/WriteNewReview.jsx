import React, { useState } from 'react';
import styled from 'styled-components';
import { Stars, Modal, FlexRow } from '../sharedComponents.jsx';
import characteristicsMap from './characteristicsMap';

const narrow = { margin: 0, padding: '4px' };

function printReviewScore(rating) {
  return ['Select a rating', 'Poor', 'Fair', 'Average', 'Good', 'Great'][rating];
}

function Input({ label, placeholder, value, id, context, type = 'text' }) {
  return (
    <div>
      <input
        style={{ width: '50%' }}
        id={id}
        type='text'
        value={value}
        onChange={(e) => context.handleTextChange(e, id)}
        placeholder={placeholder}
        //TODO: on lose focus, check if valid contents
      />
    </div>
  );
}

function Characteristic({ characteristic: [characteristic, value], updateCharacteristic }) {
  let characteristicDisplay = 'none selected';
  if (value) {
    characteristicDisplay = characteristicsMap[characteristic].labels[value - 1];
  }
  return (
    <FlexRow style={narrow}>
      {characteristic}:&nbsp;
      <div style={{ flex: 1 }}>
        {characteristicDisplay}
        <FlexRow style={{ justifyContent: 'space-around' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <input
              type='radio'
              key={characteristic + i}
              name={characteristic}
              checked={i === value}
              onChange={() => updateCharacteristic(characteristic, i)}
            />
          ))}
        </FlexRow>
        <FlexRow style={{ justifyContent: 'space-between' }}>
          <div>{characteristicsMap[characteristic].labels[0]}</div>
          <div>{characteristicsMap[characteristic].labels[4]}</div>
        </FlexRow>
      </div>
    </FlexRow>
  );
}

const blankState = {
  rating: 0,
  recommend: null,
  characteristics: {},
  summary: '',
  body: ['', '4em'],
  photos: '',
  nickname: '',
  email: '',
  errors: [],
};

export default class WriteNewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = blankState;
  }

  componentDidMount() {
    this.clearState();
  }

  clearState() {
    const newState = Object.assign({}, blankState);
    newState.characteristics = {};
    Object.keys(this.props.reviewsMeta.characteristics).forEach(
      (key) => (newState.characteristics[key] = 0)
    );
    this.setState(newState);
  }

  closeForm() {
    this.clearState();
    this.props.onClose();
  }

  handleTextChange(e, stateProp) {
    const stateOb = {};
    stateOb[stateProp] = e.target.value;
    this.setState(stateOb);
  }

  handleBodyChange(e) {
    const newState = { body: [e.target.value, e.target.scrollHeight] };
    this.setState(newState);
  }

  starsClick(index) {
    this.setState({ rating: index + 1 });
  }

  submitForm(e) {
    e.preventDefault();
    console.log('NOTHING WAS SUBMITTED');
    this.props.onClose();
  }

  updateCharacteristic(characteristic, value) {
    const characteristics = Object.assign({}, this.state.characteristics);
    characteristics[characteristic] = value;
    this.setState({ characteristics });
  }

  render() {
    return (
      <Modal onClose={this.closeForm.bind(this)} show={this.props.show}>
        <form onSubmit={this.submitForm.bind(this)}>
          <h2>Write Your Review</h2>
          <h3>About the {this.props.product.name}</h3>
          <br />
          <h4>Overall Rating*</h4>
          <FlexRow>
            <Stars
              reviewsMeta={{ averageRating: this.state.rating }}
              clickStar={this.starsClick.bind(this)}
            />
            {printReviewScore(this.state.rating)}
          </FlexRow>
          <br />
          <h4>Do you recommend this product?*</h4>
          <div>
            <input type='radio' id='yes' name='recommend' />
            <label htmlFor='yes'>Yes</label>
            <input type='radio' id='no' name='recommend' />
            <label htmlFor='no'>No</label>
          </div>
          <br />
          <h4>Characteristics*</h4>
          <div>
            {Object.entries(this.state.characteristics).map((characteristic) => (
              <Characteristic
                characteristic={characteristic}
                key={characteristic}
                updateCharacteristic={this.updateCharacteristic.bind(this)}
              />
            ))}
          </div>
          <br />
          <label htmlFor={'summary'}>
            <h4>{'Review Summary'}</h4>
          </label>
          <Input
            placeholder='Example: Best purchase ever!'
            value={this.state.summary}
            id={'summary'}
            context={this}
          />
          <br />
          <label htmlFor={'body'}>
            <h4>Review Body*</h4>
          </label>
          <div>
            <textarea
              style={{
                width: '90%',
                height: this.state.body[1],
                minHeight: '4em',
                maxHeight: '20em',
              }}
              id='body'
              type='text'
              value={this.state.body[0]}
              onChange={this.handleBodyChange.bind(this)}
              placeholder='Why did you like the product or not?'
            />
          </div>
          <br />
          {/*<div>Upload your Photos</div>*/}
          <label htmlFor={'nickname'}>
            <h4>{'Your nickname*'}</h4>
          </label>
          <Input
            placeholder='Example: jackson11!'
            value={this.state.nickname}
            id={'nickname'}
            context={this}
          />
          For privacy reasons, do not use your full name or email address
          <br />
          <br />
          <label htmlFor={'email'}>
            <h4>{'Your email*'}</h4>
          </label>
          <Input
            placeholder='Example: jackson11@email.com'
            value={this.state.email}
            id={'email'}
            context={this}
          />
          For authentication reasons, you will be emailed
          <FlexRow style={{ justifyContent: 'flex-end' }}>
            {/* Error printout here */}
            <button>Submit</button>
          </FlexRow>
        </form>
      </Modal>
    );
  }
}
