import React from 'react';
import styled from 'styled-components';
import { Modal } from '../sharedComponents.jsx';

const Image = styled.img`
  max-width: 60vmin;
  max-height: 60vmin;
  width: auto;
  height: auto;
`;

export default function PopupImage(props) {
  return (
    <Modal show={props.show} onClose={props.onClose}>
      <Image src={props.image} />
    </Modal>
  )
}

