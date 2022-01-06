import React from 'react';
import { Modal } from './sharedComponents.jsx';
import axios from 'axios';

export default function ServerMetrics() {
  const [total, setTotal] = React.useState(0);
  const [calls, setCalls] = React.useState({});
  const [show, setShow] = React.useState(false);
  const [sortBy, setSortBy] = React.useState('count');

  function sort(a, b) {
    if (sortBy === 'count') {
      return b[1] - a[1];
    }
    return a[0] < b[0] ? -1 : 1;
  }

  React.useEffect(() => {
    console.error(new Error('MAKE SURE TO REMOVE THIS COMPONENT BEFORE SHIPPING!'));
  }, []);

  React.useEffect(() => {
    if (show) {
      axios
        .get('/report')
        .then((response) => {
          setTotal(response.data.total);
          setCalls(response.data.calls);
        })
        .catch((err) => console.error(err));
    }
  }, [show]);

  function resetCount() {
    axios.delete('/report').catch((err) => console.error(err));
    setTotal(0);
    setCalls({});
  }
  return (
    <div>
      <button onClick={() => setShow(true)}>Show Server Metrics</button>
      <Modal show={show} onClose={() => setShow(false)}>
        <button onClick={resetCount}>Reset calls count</button>
        <label htmlFor='sortBy'>Sort by</label>
        <select id='sortBy' name='sortBy' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='count'>count</option>
          <option value='endpoint'>endpoint</option>
        </select>
        Total: {total}
        <div>
          {Object.entries(calls)
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
