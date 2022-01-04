import styled from 'styled-components';
import React from 'react';

const StyledImage = styled.img`
height: 300;
width: 300;
`

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    const {photos} = props;

    this.state = {

    }
  }

  render () {
    return (
      <div>

      </div>
    )
  }
}
export default ImageGallery;
