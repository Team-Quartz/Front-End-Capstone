import react from 'react';

const flexRow = {
  display: 'flex',
  flexDirection: 'row',
  alignItems:'stretch',
};

function RatingBreakdown({ rating, count, total }) {
  let proportion;
  if (!count) {
    proportion = 0;
  } else {
    proportion = (total / count) * 10;
  }
  return (
    <div style={flexRow}>
      <div>{rating} stars</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexBasis:'100%',
          flexShrink: '100000',
          margin:'1% 0',
        }}
      >
        <div
          style={{
            position: 'relative',
            backgroundColor: 'green',
            width: `${proportion}%`,
            height: '100%',
          }}
        ></div>
        <div
          style={{
            position: 'relative',
            backgroundColor: 'grey',
            width: `${100 - proportion}%`,
            height: '100%',
          }}
        ></div>
      </div>
    </div>
  );
}

export default RatingBreakdown;
