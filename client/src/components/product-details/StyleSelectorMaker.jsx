import styled from 'styled-components';
import {AppStyle, ImageThumbnail} from '../sharedComponents.jsx'

const StyledImage = styled(ImageThumbnail)`

`
const StyledBorder = styled(AppStyle)`
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
