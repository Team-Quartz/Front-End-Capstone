import react from 'react';
import styled from 'styled-components';
import characteristicsMap from './characteristicsMap';

const Characteristic = styled.div`
  position: relative;
`;
const BarFrame = styled.div`
  & {
    background-color: LightGrey;
    height: 8px;
  }
  &:before {
    content: '▼';
    position: absolute;
    left: ${(props) => props.position * 100}%;
    transform: translateX(-50%) translateY(-10%);
  }
`;
const LabelsFrame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

function ProductBreakdown({ characteristics }) {
  return (
    <div>
      {Object.entries(characteristics).map(([characteristic, { id, value }]) => {
        return (
          <Characteristic key={id}>
            {characteristic}
            <BarFrame position={(value - 1) / 4} />
            <LabelsFrame>
              {characteristicsMap[characteristic].barLabels.map((label) => (
                <div>{label}</div>
              ))}
            </LabelsFrame>
          </Characteristic>
        );
      })}
    </div>
  );
}

export default ProductBreakdown;
