import react from 'react';
import styled from 'styled-components';
import characteristicsMap from './characteristicsMap';
import { ResponseText, BodyText} from '../sharedComponents.jsx'

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
    transform: translateX(-50%) translateY(-3px);
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
      {characteristics
        ? Object.entries(characteristics).map(([characteristic, { id, value }]) => {
            return (
              <Characteristic key={id}>
                <BodyText>{characteristic}</BodyText>
                <BarFrame position={(value - 1) / 4} />
                <LabelsFrame>
                  {characteristicsMap[characteristic].barLabels.map((label, i) => (
                    <ResponseText key={i}>{label}</ResponseText>
                  ))}
                </LabelsFrame>
              </Characteristic>
            );
          })
        : null}
    </div>
  );
}

export default ProductBreakdown;
