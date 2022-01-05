import styled from 'styled-components';
import React from 'react';
import ReactDOM from 'react-dom';
import GalleryModal from './GalleryModal.jsx';

const StyledImage = styled.img`
height: 300;
width: 300;
`
const StyledButton = styled.button`

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
    const {photos} = props;
    const photoArray = photos.map(({url}) => url);
    this.state = {
      photos: photoArray,
      userFocus: photoArray[0],
      showModal: false,
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handleShow() {
    this.setState({showModal: true});
  }

  handleHide() {
    this.setState({showModal: false});
  }
  render () {
   // Show a Modal on click.
    // (In a real app, don't forget to use ARIA attributes
    // for accessibility!)
    const modal = this.state.showModal ? (
      <GalleryModal>
        <StyledZoomedImage onClick={this.handleHide} src={`${this.state.userFocus}`}/>
      </GalleryModal>
    ) : null;

    return (
      <div>
        <StyledImage onClick={this.handleShow} src={`${this.state.userFocus}`}/>
        {modal}
      </div>
    );
    }
}
export default ImageGallery;
