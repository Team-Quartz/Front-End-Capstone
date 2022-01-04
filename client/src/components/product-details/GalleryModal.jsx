import styled from 'styled-components';
import React from 'react';
import ReactDOM from 'react-dom';


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
class GalleryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: props.photo,
    }

  }

  render () {
    console.log('in the portal')
    return ReactDOM.createPortal(
      <div>
      <StyledZoomedImage src={`${this.state.userFocus}`}/>
    </div>,
    document.getElementById('portal')
  );
  }
}
export default GalleryModal;
