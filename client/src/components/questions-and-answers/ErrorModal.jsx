import React from 'react';
import { Modal } from '../sharedComponents.jsx';

export default function ErrorModal(props) {
  return (
    <Modal show={props.show} onClose={props.onClose}>
      <h2>Error!</h2>
      <h4>You must enter the following:</h4>
      <p>{props.message}</p>
      <button onClick={props.onClose}>OK</button>
    </Modal>
  )
}

