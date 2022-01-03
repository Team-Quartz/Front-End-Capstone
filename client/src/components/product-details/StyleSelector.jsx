import StyleSelectorMaker from './StyleSelectorMaker.jsx';

const StyleSelector = ({stylesData, handler}) => {
  const arrayOfStyles = stylesData.map((styleObject) => StyleSelectorMaker(styleObject, handler));
  return (
    <div>
      {arrayOfStyles}
    </div>
  )
}

export default StyleSelector;
