import styled from 'styled-components';
import React from 'react';
import ReactDOM from 'react-dom';
import GalleryModal from './GalleryModal.jsx';

const StyledImage = styled.img`
height: 300;
width: 300;
`
const StyledButton = styled.button`
font-size: 1.5em;
`
const StyledNext = styled(StyledButton)`

`
const StyledContainer = styled.div`
`

const StyledZoomedImage = styled(StyledImage) `
height: 750;
width: 750;
position: absolute;
top: 25%;
left: 25%;
display: flex;
align-items: center;
justify-content: center;
`

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    const {photos:{photos}} = props;
    this.state = {
      photos: photos,
      userFocus: photos[0],
      showModal: false,
      userIndex: 0,
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleShow() {
    this.setState({showModal: true});
  }

  handleHide() {
    this.setState({showModal: false});
  }
  handlePrevious() {
    const focusedIndex  = this.state.userIndex;
    const minimalZero = Math.max(focusedIndex - 1, 0);
    this.setState({userFocus: this.state.photos[minimalZero], userIndex: minimalZero});
  }
  handleNext() {
    const focusedIndex = this.state.userIndex;
    const maxLimit = Math.min(focusedIndex + 1, this.state.photos.length -1);
    this.setState({userFocus: this.state.photos[maxLimit], userIndex: maxLimit});
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.photos !== this.props.photos.photos){
      this.setState({
        photos: this.props.photos.photos,
        userFocus: this.props.photos.photos[0],
      })
    }
    if (prevProps.photos !== this.props.photos) {
      this.setState({
        photos: this.props.photos.photos,
        userFocus: this.props.photos.photos[0]
      })
    }
  }
  render () {
    const modal = this.state.showModal ? (
      <GalleryModal>
        <StyledZoomedImage onClick={this.handleHide} src={`${this.state.userFocus.url}`}/>
      </GalleryModal>
    ) : null;
    return (
      <div>
        <StyledButton onClick={this.handlePrevious}>{"<"}</StyledButton>
        <StyledImage onClick={this.handleShow} src={`${this.state.userFocus.url}`}/>
        {modal}
        <StyledNext onClick={this.handleNext}>{">"}</StyledNext>
      </div>
    );
    }
}
export default ImageGallery;
