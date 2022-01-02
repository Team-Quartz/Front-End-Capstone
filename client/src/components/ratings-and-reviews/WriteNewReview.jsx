import React, { useState } from 'react';
import styled from 'styled-components';
import { Stars, Modal, FlexRow } from '../sharedComponents.jsx';
import characteristicsMap from './characteristicsMap';

function printReviewScore(rating) {
  return ['Select a rating', 'Poor', 'Fair', 'Average', 'Good', 'Great'][rating];
}

function Input({ label, placeholder, value, id, context, type = 'text' }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
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
  return (
    <FlexRow>
      {characteristic}
      {characteristicsMap[characteristic].labels.map((characteristicLabel, i) => {
        const buttonId = characteristic + i;
        return (
          <div key={characteristicLabel}>
            <label htmlFor={buttonId}>{characteristicLabel}</label>
            <br />
            <input type='radio' id={buttonId} name={characteristic} />
          </div>
        );
      })}
    </FlexRow>
  );
}

const blankState = {
  rating: 0,
  recommend: null,
  characteristics: [],
  summary: '',
  body: ['', '4em'],
  photos: '',
  nickname: '',
  email: '',
  errors: [],
};

//{ onClose, show, reviewsMeta, product }
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
    newState.characteristics = Object.keys(this.props.reviewsMeta.characteristics).map((key) => [
      key,
      null,
    ]);
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
    console.log('submit');
  }

  render() {
    return (
      <Modal onClose={this.closeForm.bind(this)} show={this.props.show}>
        <form onSubmit={this.submitForm.bind(this)}>
          <h2>Write Your Review</h2>
          <h3>About the {this.props.product.name}</h3>
          <FlexRow>
            <Stars
              reviewsMeta={{ averageRating: this.state.rating }}
              clickStar={this.starsClick.bind(this)}
            />
            {printReviewScore(this.state.rating)}
          </FlexRow>
          <div className='FlexRow'>
            Do you recommend this product? Yes
            <input type='radio' id='yes' name='recommend' />
            No
            <input type='radio' id='no' name='recommend' />
          </div>
          <div>
            {this.state.characteristics.map((characteristic) => (
              <Characteristic characteristic={characteristic} key={characteristic} />
            ))}
          </div>
          <Input
            label='Review Summary:'
            placeholder='Example: Best purchase ever!'
            value={this.state.summary}
            id={'summary'}
            context={this}
          />
          <div>
            <label htmlFor={'body'}>Review Body:</label>
            <br />
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
          {/*<div>Upload your Photos</div>*/}
          <Input
            label='Your nickname:'
            placeholder='Example: jackson11!'
            value={this.state.nickname}
            id={'nickname'}
            context={this}
          />
          For privacy reasons, do not use your full name or email address
          <Input
            label='Your email:'
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
