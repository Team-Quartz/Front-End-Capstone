import react from 'react';
import styled from 'styled-components';

const Characteristic = styled.div`
  position: relative;
`
const BarFrame = styled.div`
  & {
    background-color: LightGrey;
    height: 8px;
  }
  &:before {
    content: "▼";
    position: absolute;
    left: ${props => props.position * 100}%;
    transform: translateX(-50%);
  }
`;

function ProductBreakdown({ characteristics }) {
  return (
    <div>
      {Object.entries(characteristics).map(([characteristic, { id, value }]) => {
        return (
          <Characteristic key={id}>
            {characteristic}
            <BarFrame position={(value - 1) / 4}/>
            </Characteristic>
        );
      })}
    </div>
  );
}

export default ProductBreakdown;
