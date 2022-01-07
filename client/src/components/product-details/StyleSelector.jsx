import StyleSelectorMaker from './StyleSelectorMaker.jsx';
import styled from 'styled-components';
import {AppStyle, BodyText, ImageThumbnail} from '../sharedComponents.jsx'

const StyledWrapper = styled(AppStyle)`
display:flex;
flex-wrap: wrap;
flex-basis: 30%;
width: 250px;
`
const StyledNameDiv = styled(BodyText)`
font-size: 1.5em;
`
const StyledContainer = styled(AppStyle)`
margin: inherit;
align-items: center;
position: relative;
left: 50%;
transform: translate(-50%, 0%);
width: fit-content;
`
const StyleSelector = ({stylesData, handler, selectedStyle}) => {
  const arrayOfStyles = stylesData.map((styleObject) => <StyleSelectorMaker styleObject={styleObject} handler={handler} selectedStyle={selectedStyle} key={styleObject.style_id}/>);
  return (
    <StyledContainer>
      <StyledNameDiv>{selectedStyle.name}</StyledNameDiv>
      <StyledWrapper>
      {arrayOfStyles}
      </StyledWrapper>
    </StyledContainer>
  )
}

export default StyleSelector;
