import styled from 'styled-components';

const StyleSelectorMaker = (styleObject, handler) => {
  const StyledImage = styled.img`
  width: 75px;
  height: 75px;
  `
  console.log( '<<<<', styleObject.style_id )
  return (
    <StyledImage src={styleObject.photos[0].thumbnail_url} key={styleObject.style_id + ''} id={styleObject.style_id + '#'} onClick={(e) => {handler(e.target.getAttribute('id'))}} />
  )
}


/*
adding images needs to make images and wrap them. Need a wrapper and an array

make an array of images from data
Then wrap each into an event handler.
*/
export default StyleSelectorMaker;