import React from 'react';
import { Modal } from './sharedComponents.jsx';
import axios from 'axios';

export default function ServerMetrics() {
  const [total, setTotal] = React.useState(0);
  const [calls, setCalls] = React.useState({});
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (show) {
      console.log('hi');
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
        Total: {total}
        <div>
          {Object.entries(calls).map(([endpoint, count]) => (
            <div key={endpoint}>
              {endpoint}: {count}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
