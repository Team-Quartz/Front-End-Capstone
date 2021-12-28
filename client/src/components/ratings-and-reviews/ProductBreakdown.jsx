import react from 'react';

function ProductBreakdown({ characteristics }) {
  return (
    <div>
      {Object.entries(characteristics).map(([characteristic, { id, value }]) => {
        return (
          <div key={id}>
            {characteristic}, {value}
          </div>
        );
      })}
    </div>
  );
}

export default ProductBreakdown;
