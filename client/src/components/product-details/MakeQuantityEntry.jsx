import styled from 'styled-components';


const MakeSizesEntry = ({quantity}) => {
  const arrayOfQuantityElements = [];
  for(let i = 0; i <= quantity; i++){
    arrayOfQuantityElements.push(<option value={`${i}`} key={`${i}`}>{`${i}`}</option>);
  }
  return arrayOfQuantityElements;
}

export default MakeSizesEntry