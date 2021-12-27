import react from 'react';

const flexRow = {
  display: 'flex',
  flexDirection: 'row',
  alignItems:'center',
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
          width: '100px',
          height: '10px',
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
