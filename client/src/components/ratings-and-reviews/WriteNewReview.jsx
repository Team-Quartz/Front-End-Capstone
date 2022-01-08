import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Stars,
  Modal,
  FlexRow,
  TextButton,
  BodyText,
  ResponseText,
  BodyLabel,
} from '../sharedComponents.jsx';
import characteristicsMap from './characteristicsMap';
import utils from '../../Utils.js';
import { PhotoGallery, ConstrainedImg } from './PhotoGallery';

const narrow = { margin: 0, padding: '4px' };

const ErrorDialog = styled.div`
  color: red;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

const PlaceholderImage = styled.div`
  width: 20vmin;
  height: 20vmin;
  border: 1px solid LightGrey;
`;

function printReviewScore(rating) {
  return ['Select a rating', 'Poor', 'Fair', 'Average', 'Good', 'Great'][rating];
}

function Input({ label, placeholder, value, id, context, max = 60, type = 'text' }) {
  return (
    <div style={{ position: 'relative' }}>
      <input
        style={{ width: '50%' }}
        id={id}
        type='text'
        value={value}
        onChange={(e) => context.handleTextChange(e, id, max)}
        placeholder={placeholder}
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
      <BodyText>{characteristic}:&nbsp;</BodyText>&nbsp;&nbsp;
      <div style={{ flex: 1 }}>
        <BodyText>{characteristicDisplay}</BodyText>
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
          <ResponseText>{characteristicsMap[characteristic].labels[0]}</ResponseText>
          <ResponseText>{characteristicsMap[characteristic].labels[4]}</ResponseText>
        </FlexRow>
      </div>
    </FlexRow>
  );
}

function AddPhotosModal({ onAddPhoto, show, onClose }) {
  const [url, setUrl] = React.useState('');
  const [imageLoaded, setImageLoaded] = React.useState(false);

  function onChangeUrl(e) {
    setImageLoaded(false);
    setUrl(e.target.value);
  }

  function onSubmitImage() {
    onAddPhoto(url);
    setUrl('');
    setImageLoaded(false);
    onClose();
  }

  return (
    <Modal show={show} onClose={onClose}>
      {url.length == 0 ? (
        <PlaceholderImage />
      ) : (
        <ConstrainedImg src={url} onLoad={() => setImageLoaded(true)} />
      )}
      <input type='text' value={url} placeholder='Paste URL here' onChange={onChangeUrl} />
      {imageLoaded ? <TextButton onClick={onSubmitImage}>Add</TextButton> : null}
    </Modal>
  );
}

const blankState = {
  rating: 0,
  recommend: null,
  characteristics: {},
  summary: '',
  body: '',
  photos: [],
  nickname: '',
  email: '',
  errors: [],
  showAddPhoto: false,
};

export default class WriteNewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = blankState;
  }

  componentDidMount() {
    this.clearState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reviewsMeta !== this.props.reviewsMeta) {
      this.clearState();
    }
  }

  clearState() {
    const newState = Object.assign({}, blankState);
    newState.characteristics = {};
    if (this.props.reviewsMeta.characteristics) {
      Object.keys(this.props.reviewsMeta.characteristics).forEach(
        (key) => (newState.characteristics[key] = 0)
      );
    }
    this.setState(newState);
  }

  closeForm() {
    this.props.onClose();
  }

  handleTextChange(e, stateProp, max) {
    const stateOb = {};
    stateOb[stateProp] = e.target.value.substring(0, max);
    this.setState(stateOb);
  }

  handleBodyChange(e) {
    const newState = { body: e.target.value.substring(0, 1000) };
    this.setState(newState);
  }

  starsClick(index) {
    this.setState({ rating: index + 1 });
  }

  onOpenAddPhoto(e) {
    e.preventDefault();
    this.setState({ showAddPhoto: true });
  }
  addPhoto(url) {
    const photos = this.state.photos.slice();
    photos.push(url);
    this.setState({ photos });
  }
  removePhoto(url, i) {
    const photos = this.state.photos.slice().splice(i + 1, 1);
    this.setState({ photos });
  }

  submitForm(e) {
    e.preventDefault();
    const errors = this.checkFormCompleteness();
    if (errors.length > 0) return;
    const characteristics = {};
    Object.entries(this.state.characteristics).forEach(([characteristic, value]) => {
      characteristics[this.props.reviewsMeta.characteristics[characteristic].id] = value;
    });
    utils.submitReview(
      this.props.currentProduct.id,
      this.state.rating,
      this.state.summary,
      this.state.body,
      this.state.recommend,
      this.state.nickname,
      this.state.email,
      this.state.photos,
      characteristics
    );
    this.clearState();
    this.closeForm();
  }

  updateCharacteristic(characteristic, value) {
    const characteristics = Object.assign({}, this.state.characteristics);
    characteristics[characteristic] = value;
    this.setState({ characteristics });
  }

  checkEmailFormat() {
    return !this.state.email.match(/\w+@\w+\.\w\w+/);
  }

  checkFormCompleteness() {
    const characteristicErrors = Object.entries(this.state.characteristics).map(([key, val]) => [
      `Select a rating for the product ${key}`,
      val === 0,
    ]);
    const errors = [
      ['Select a product rating', this.state.rating === 0],
      ...characteristicErrors,
      ['Select a product recommendation', this.state.recommend === null],
      ['The review body must be 50 characters or more', this.state.body.length < 50],
      ['Add your nickname', this.state.nickname === ''],
      ['Add your email', this.state.email === ''],
      ['the email address provided is not in the correct email format', this.checkEmailFormat()],
      ['the images selected are invalid or unable to be uploaded', false],
    ].filter((entry) => entry[1]);
    this.setState({ errors });
    return errors;
  }

  render() {
    return (
      <div>
        <Modal onClose={this.closeForm.bind(this)} show={this.props.show}>
          <form onSubmit={this.submitForm.bind(this)}>
            <h2>Write Your Review</h2>
            <h3>About the {this.props.currentProduct.name}</h3>
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
              <input
                type='radio'
                id='yes'
                name='recommend'
                checked={this.state.recommend === true}
                onChange={() => this.setState({ recommend: true })}
              />
              <BodyLabel htmlFor='yes'>Yes</BodyLabel>
              <input
                type='radio'
                id='no'
                name='recommend'
                checked={this.state.recommend === false}
                onChange={() => this.setState({ recommend: false })}
              />
              <BodyLabel htmlFor='no'>No</BodyLabel>
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
            <BodyLabel htmlFor={'summary'}>
              <h4>{'Review Summary'}</h4>
            </BodyLabel>
            <Input
              placeholder='Example: Best purchase ever!'
              value={this.state.summary}
              id={'summary'}
              context={this}
            />
            <br />
            <BodyLabel htmlFor={'body'}>
              <h4>Review Body*</h4>
            </BodyLabel>
            <div style={{ position: 'relative' }}>
              <textarea
                style={{
                  width: '90%',
                  height: this.state.body[1],
                  minHeight: '4em',
                  maxHeight: '20em',
                }}
                id='body'
                type='text'
                value={this.state.body}
                onChange={this.handleBodyChange.bind(this)}
                placeholder='Why did you like the product or not?'
              />
            </div>
            <br />
            <PhotoGallery
              photos={this.state.photos}
              onClickThumbnail={this.removePhoto.bind(this)}
            />
            {this.state.photos.length < 5 ? (
              <TextButton onClick={this.onOpenAddPhoto.bind(this)}>Add photo</TextButton>
            ) : null}
            <br />
            <BodyLabel htmlFor={'nickname'}>
              <h4>{'Your nickname*'}</h4>
            </BodyLabel>
            <Input
              placeholder='Example: jackson11!'
              value={this.state.nickname}
              id={'nickname'}
              context={this}
            />
            For privacy reasons, do not use your full name or email address
            <br />
            <br />
            <BodyLabel htmlFor={'email'}>
              <h4>{'Your email*'}</h4>
            </BodyLabel>
            <Input
              placeholder='Example: jackson11@email.com'
              value={this.state.email}
              id={'email'}
              context={this}
            />
            For authentication reasons, you will be emailed
            <FlexRow style={{ justifyContent: 'flex-end' }}>
              <ErrorDialog>
                {this.state.errors.map((error, i) => (
                  <div key={i}>{error[0]}</div>
                ))}
              </ErrorDialog>
              <div>
                <TextButton>Submit</TextButton>
              </div>
            </FlexRow>
          </form>
        </Modal>
        <AddPhotosModal
          onAddPhoto={this.addPhoto.bind(this)}
          onClose={() => this.setState({ showAddPhoto: false })}
          show={this.state.showAddPhoto}
        />
      </div>
    );
  }
}
