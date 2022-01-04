import React from 'react';
import { Modal } from '../sharedComponents.jsx';

export default function SuccessModal(props) {
  return (
    <Modal show={props.show} onClose={props.onClose}>
      <h2>Submission Success!</h2>
      <p>Thank you for your input.</p>
      <button onClick={props.onClose}>OK</button>
    </Modal>
  )
}