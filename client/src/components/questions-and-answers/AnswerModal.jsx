import React from 'react';
import styled from 'styled-components';
import { Modal, ImageThumbnail, Details, TextButton } from '../sharedComponents.jsx';
import ErrorModal from './ErrorModal.jsx';
import axios from '../../haxios';
import utils from '../../Utils.js';

const PlaceholderImage = styled(ImageThumbnail)`
  height: 3rem;
  max-width: 6rem;
  border: 1px solid LightGrey;
`;

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: 'Loading Product Name...',
      questionBody: this.props.questionBody,
      answerInput: '',
      nicknameInput: '',
      emailInput: '',
      photoUrlToAdd: '',
      photosList: [],
      showErrorModal: false,
      errorMessage: 'inputs must not be blank, and email address and photo URLs must be valid'
    }
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhotoUrlChange = this.handlePhotoUrlChange.bind(this);
    this.uploadPhoto= this.uploadPhoto.bind(this);
    this.checkAnswersInputValidity = this.checkAnswersInputValidity.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.openErrorModal = this.openErrorModal.bind(this);
    this.closeUponSuccess = this.closeUponSuccess.bind(this);
    this.validatePhoto = this.validatePhoto.bind(this);
    this.cancelAnswerModal = this.cancelAnswerModal.bind(this);
    this.renderImages = this.renderImages.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.productName !== this.props.productName) {
      this.setState({productName: this.props.productName.name})
    }
  }

  handleAnswerChange(e) {
    e.preventDefault();
    this.setState({answerInput: e.target.value});
  }

  handleNicknameChange(e) {
    e.preventDefault();
    this.setState({nicknameInput: e.target.value});
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.setState({emailInput: e.target.value});
  }

  handlePhotoUrlChange(e) {
    e.preventDefault();
    this.setState({photoUrlToAdd: e.target.value});
  }

  validatePhoto(photoUrl) {
    let regex = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
    if (!photoUrl.match(regex)) {
      return false;
    }
    //TODO: use axios HEAD request to validate photo

    // const http = new XMLHttpRequest();
    // http.open('HEAD', 'https://cors-anywhere.herokuapp.com/' + photoUrl);
    // http.send();
    // console.log('HTTP Status', http.status)
    // return http.status !== 404;
    return true;
  }

  renderImages(photos = this.state.photosList) {
    return photos.map((photo, idx) => {
      return <PlaceholderImage key={idx} src={photo} />
    })
  }

  uploadPhoto() {
    if (this.state.photoUrlToAdd === '' ||
    !this.validatePhoto(this.state.photoUrlToAdd) ||
    this.state.photosList.length > 4) {
      this.openErrorModal(true);
    } else {
      let updatedPhotosList = this.state.photosList.slice();
      updatedPhotosList.push(this.state.photoUrlToAdd);
      this.renderImages(updatedPhotosList)
      this.setState({
        photoUrlToAdd: '',
        photosList: updatedPhotosList
      });
    }
  }

  validateEmail(email) {
    let isValid = true;
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
    if (!email.match(regex)) {
      isValid = false;
    }
    return isValid;
  }

  checkAnswersInputValidity() {
    if (!this.state.answerInput || !this.state.nicknameInput || !this.state.emailInput) {
      this.openErrorModal(true);
    } else if (!this.validateEmail(this.state.emailInput)) {
      this.openErrorModal(true);
    } else {
      utils.submitAnswer(this.state.answerInput,this.state.nicknameInput, this.state.emailInput, this.state.photosList, this.props.questionId)
        .then(() => {
          this.closeUponSuccess();
          this.setState({
            answerInput: '',
            nicknameInput: '',
            emailInput: '',
            photoUrlToAdd: '',
            photosList: [],
          })
        })
        .catch(() => {
          this.openErrorModal(true)
        })
    }
  }

  openErrorModal(open) {
    this.setState({
      showErrorModal: open,
    });
  }

  closeUponSuccess() {
    this.props.success();
    this.props.onClose();
  }

  cancelAnswerModal() {
    this.props.onClose();
    this.setState({
      answerInput: '',
      nicknameInput: '',
      emailInput: '',
      photoUrlToAdd: '',
      photosList: [],
    })
  }

  render() {
    return (
      <Modal onClose={this.cancelAnswerModal} show={this.props.show}>
        <h2>Submit Your Answer</h2>
        <h3>{this.state.productName}: {this.state.questionBody}</h3>
        <p>Your Answer</p>
        <input onChange={this.handleAnswerChange} />
        <p>What is your nickname?</p>
        <input onChange={this.handleNicknameChange} />
        <br/>
        <Details>For privacy reasons, do not use your full name or email address</Details>
        <p>Your email</p>
        <input onChange={this.handleEmailChange} />
        <Details>For authentication reasons, you will not be emailed</Details>
        <br/>
        <input onChange={this.handlePhotoUrlChange}  value={this.state.photoUrlToAdd}/>
        <button onClick={this.uploadPhoto}>Upload your photos</button>
        <br/>
        <Details>Photos must include the following file extensions: .jpg, .jpeg, .png, .gif</Details>
        <br/>
        {this.renderImages()}
        <br/>
        <TextButton onClick={this.checkAnswersInputValidity}>
          Submit Answer
        </TextButton>
        <ErrorModal
          onClose={() => this.openErrorModal(false)}
          show={this.state.showErrorModal}
          message={this.state.errorMessage}
        />
      </Modal>
    )
  }
}

export default AnswerModal;
