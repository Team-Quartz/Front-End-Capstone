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
position: fixed;
top: 50%;
left: 50%;
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
    }

    this.el = document.getElementById('portal');
    this.pictureModal = this.pictureModal.bind(this);
  }
  pictureModal () {
    console.log('Weee.', <StyledZoomedImage src={`${this.state.userFocus}`}/>);
    return (
      <div>
        <GalleryModal photo={this.state.userFocus}/>

      </div>
    )
  }
  render () {
    return (
      <StyledContainer id="apples">
        <StyledButton onClick={this.previousImage}/>
        <StyledImage src={`${this.state.userFocus}`}/>
        <StyledButton onClick={this.nextImage}/>
      </StyledContainer>
    )
  }
}
export default ImageGallery;
