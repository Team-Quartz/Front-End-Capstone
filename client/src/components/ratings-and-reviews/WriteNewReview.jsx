import React, { useState } from 'react';
import styled from 'styled-components';
import { Stars, Modal } from '../sharedComponents.jsx';

function printReviewScore(rating) {
  return ['Select a rating', 'Poor', 'Fair', 'Average', 'Good', 'Great'][rating];
}

function Input({ label, placeholder, value, id }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type='text'
        value={value}
        onChange={(e) => this.handleTextChange(e, id)}
        placeholder={placeholder}
        //TODO: on lose focus, check if valid contents
      />
    </div>
  );
}

const blankState = {
  rating: 0,
  recommend: null,
  characteristics: [],
  summary: '',
  body: '',
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

  handleTextChange(e, stateProp) {
    const stateOb = {};
    stateOb[stateProp] = e.target.value;
    this.setState(stateOb);
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
      <Modal onClose={this.props.onClose} show={this.props.show}>
        <form onSubmit={this.submitForm.bind(this)}>
          <h2>Write Your Review</h2>
          <h3>About the {this.props.product.name}</h3>
          <div>
            <Stars
              reviewsMeta={{ averageRating: this.state.rating }}
              clickStar={this.starsClick.bind(this)}
            />
            {printReviewScore(this.state.rating)}
          </div>
          <div className='FlexRow'>
            Do you recommend this product? Yes
            <input type='radio' id='yes' name='recommend' />
            No
            <input type='radio' id='no' name='recommend' />
          </div>
          <div>{`[characteristics]`}</div>
          <Input
            label='Review Summary'
            placeholder='Example: Best purchase ever!'
            value={this.state.summary}
            id={'summary'}
          />
          <Input
            label='Review Body'
            placeholder='Why did you like this product or not?'
            value={this.state.body}
            id={'body'}
          />
          <div>Upload your Photos</div>
          <Input
            label='Your nickname'
            placeholder='Example: jackson11!'
            value={this.state.nickname}
            id={'nickname'}
          />
          <Input
            label='Your email'
            placeholder='Your email'
            value={this.state.email}
            id={'email'}
          />
          <div>
            {`[error printout]`}
            <button>Submit</button>
          </div>
        </form>
      </Modal>
    );
  }
}
