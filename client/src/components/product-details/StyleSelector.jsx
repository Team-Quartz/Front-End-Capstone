import StyleSelectorMaker from './StyleSelectorMaker.jsx';
import styled from 'styled-components';
import {AppStyle} from '../sharedComponents.jsx'

const StyledWrapper = styled(AppStyle)`
display:flex;
flex-wrap: wrap;
flex-basis: 25%;
width: 350px;
`
const StyledNameDiv = styled(AppStyle)`
font-size: 1.5em;
`
const StyleSelector = ({stylesData, handler, selectedStyle}) => {
  const arrayOfStyles = stylesData.map((styleObject) => <StyleSelectorMaker styleObject={styleObject} handler={handler} selectedStyle={selectedStyle} key={styleObject.style_id}/>);
  return (
    <div>
      <StyledNameDiv>{selectedStyle.name}</StyledNameDiv>
      <StyledWrapper>
      {arrayOfStyles}
      </StyledWrapper>
    </div>
  )
}

export default StyleSelector;
