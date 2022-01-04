import styled from 'styled-components';
import React from 'react';
const StyledImage = styled.img`
height: 300;
width: 300;
`


class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.data.photos,
    }
  }

  render () {
  return (
    <div>
      <StyledImage className="gallery" src={this.state.images[0].url} alt="A lot of random images"/>
    </div>
  )
  }
}
export default ImageGallery;


/*
    if(!!option) {
      const currentIndex = this.stylesData.results.findIndex(this.selectedStyle.style_id);
      if (option === 'previous') {
        const minZero = Math.max(currentIndex - 1, 0);
        const targetStyle = this.stylesData.results[minZero];
        this.setState({selectedStyle: targetStyle, targetStyle.style_id})
      } else if (option === 'next') {
        const maxLimit = Math.min(currentIndex + 1, this.stylesData.results)
      }
    }
*/