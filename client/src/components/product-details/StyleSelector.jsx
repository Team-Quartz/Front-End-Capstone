import StyleSelectorMaker from './StyleSelectorMaker.jsx';
import styled from 'styled-components';

const StyledWrapper = styled.div`
display:flex;
flex-wrap: wrap;
flex-basis: 25%;
width: 350px;
`
const StyledNameDiv = styled.div`
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
