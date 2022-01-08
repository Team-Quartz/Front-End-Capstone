import React from 'react';
import styled from 'styled-components';
import {
  FlexRow,
  ImageThumbnail,
  ResponseText,
  Details,
  Clickable,
  Modal,
} from '../sharedComponents.jsx';
import dayjs from 'dayjs';
import AnswerModal from './AnswerModal.jsx';
import PopupImage from './PopupImage.jsx';
import utils from '../../Utils.js';

const AnswerStart = styled.div`
  margin-left: -10px;
  margin-top: 3px;
  padding-top: 0px;
  font-size: 17px;
  font-weight: bold;
  color: 424242;
`;

const AnswerImage = styled(ImageThumbnail)`
  margin-left: 20px;
  border: 1px solid LightGrey;
`;

const PopupImageStyles = styled.img`
  width: 200px;
  height: 200px;
`;
class AnswerEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHelpful: false,
      isReported: false,
      showImagePopup: false,
      popupImage: null,
    };
    this.updateAnswerHelpfulCount = this.updateAnswerHelpfulCount.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
    this.renderAnswerImages = this.renderAnswerImages.bind(this);
    this.toggleShowImagePopup = this.toggleShowImagePopup.bind(this);
    this.renderImagePopup = this.renderImagePopup.bind(this);
  }

  updateAnswerHelpfulCount() {
    this.setState({ isHelpful: 1 });
    utils.markAnswerHelpful(this.props.answer.answer_id);
  }

  reportAnswer() {
    this.setState({ isReported: true });
    utils.reportAnswer(this.props.answer.answer_id);
  }

  renderAnswerImages() {
    return this.props.answer.photos.map((photo) => {
      return (
        <AnswerImage
          key={photo.id}
          src={photo.url}
          onClick={() => this.renderImagePopup(photo.url)}
        />
      );
    });
  }

  toggleShowImagePopup(open) {
    this.setState({
      showImagePopup: open,
    });
  }

  renderImagePopup(image) {
    this.toggleShowImagePopup(true);
    this.setState({
      popupImage: image,
    });
  }

  render() {
    return (
      <div>
        <FlexRow>
          <AnswerStart style={this.props.color}>{this.props.a}</AnswerStart>
          <ResponseText>{this.props.answer.body}</ResponseText>
        </FlexRow>
        {this.renderAnswerImages()}
        <br />
        <PopupImage
          show={this.state.showImagePopup}
          onClose={() => this.toggleShowImagePopup(false)}
          image={[this.state.popupImage]}
        />
        <Details>
          by{' '}
          {this.props.answer.answerer_name === 'Seller' ? (
            <b> Seller</b>
          ) : (
            this.props.answer.answerer_name
          )}
          {' ' + dayjs(this.props.answer.date).format('MMMM DD, YYYY')}
          &nbsp;|&nbsp;Helpful?&nbsp;
          {this.state.isHelpful ? (
            <u>Yes!</u>
          ) : (
            <Clickable onClick={this.updateAnswerHelpfulCount}>Yes</Clickable>
          )}
          ({this.props.answer.helpfulness + this.state.isHelpful}) &nbsp;|&nbsp;&nbsp;
          {this.state.isReported ? (
            <u>Reported!</u>
          ) : (
            <Clickable onClick={this.reportAnswer}>Report</Clickable>
          )}
        </Details>
      </div>
    );
  }
}

export default AnswerEntry;
