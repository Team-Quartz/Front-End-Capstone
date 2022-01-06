import styled from 'styled-components';


const MakeSizesEntry = ({entry:{sku, size, quantity}}) => {
  if (size === 0) return null;
return (
  <option value={`${size}`} key={`${sku}`}>{size}</option>
)
}

export default MakeSizesEntry