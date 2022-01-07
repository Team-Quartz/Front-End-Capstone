import styled from 'styled-components';

const StyledImage = styled.img`
width: 75px;
height: 75px;
`
const StyledBorder = styled.div`
border: solid;
border-color: green;
`
const StyleSelectorMaker = ({styleObject, handler, selectedStyle = null}) => {
  const styleId = styleObject.style_id + '';

  let outputStyle = <StyledImage src={styleObject.photos[0].thumbnail_url} key={styleId} data-styleid={styleId} onClick={(e) => {handler(e.target.dataset.styleid)}} />

  if (selectedStyle !== null && selectedStyle.style_id === styleObject.style_id) {
    outputStyle = <StyledBorder>{outputStyle}</StyledBorder>;
  }
  return outputStyle;
}


export default StyleSelectorMaker;
