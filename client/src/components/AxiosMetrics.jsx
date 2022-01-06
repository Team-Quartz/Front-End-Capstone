import React from 'react';
import { Modal } from './sharedComponents.jsx';
import axios from 'axios';

let totalCalls = 0;
let callsLog = {};


axios.interceptors.request.use((config) => {
  totalCalls++;
  if (callsLog[config.url]) callsLog[config.url] += 1;
  else callsLog[config.url] = 1;
  return config;
});

export default function AxiosMetrics() {
  const [show, setShow] = React.useState(false);
  const [sortBy, setSortBy] = React.useState('count');
  const [forceRedraw, setForceRedraw] = React.useState(0);

  function resetCount() {
    totalCalls = 0;
    callsLog = {};
    //totalCalls and callsLog are outside the component function, so changing a state variable triggers a redraw
    setForceRedraw(forceRedraw + 1)
  }

  function sort(a, b) {
    if (sortBy === 'count') {
      return b[1] - a[1];
    }
    return a[0] < b[0] ? -1 : 1;
  }

  React.useEffect(() => {
    console.error(new Error('MAKE SURE TO REMOVE THIS COMPONENT BEFORE SHIPPING!'));
  }, []);

  return (
    <div>
      <button onClick={() => setShow(true)}>Show Axios Metrics</button>
      <Modal show={show} onClose={() => setShow(false)}>
        <button onClick={resetCount}>Reset calls count</button>
        <label htmlFor='sortBy'>Sort by</label>
        <select
          id='sortBy'
          name='sortBy'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value='count'>count</option>
          <option value='endpoint'>endpoint</option>
        </select>
        Total: {totalCalls}
        <div>
          {Object.entries(callsLog)
            .sort(sort)
            .map(([endpoint, count]) => (
              <div key={endpoint}>
                {endpoint}: {count}
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
}
