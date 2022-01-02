import React, { useState } from 'react';
import styled from 'styled-components';
import { Stars, Modal } from '../sharedComponents.jsx';

function printReviewScore(rating) {
  return ['Select a rating', 'Poor', 'Fair', 'Average', 'Good', 'Great'][rating];
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

  starsClick(index) {
    this.setState({ rating: index + 1 });
  }

  submitForm(e) {
    e.preventDefault();
    console.log('submit')
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
          <div>Review Summary</div>
          <div>Review Body</div>
          <div>Upload your Photos</div>
          <div>Nickname</div>
          <div>Email</div>
          <div>
            {`[error printout]`}
            <button>Submit</button>
          </div>
        </form>
      </Modal>
    );
  }
}
