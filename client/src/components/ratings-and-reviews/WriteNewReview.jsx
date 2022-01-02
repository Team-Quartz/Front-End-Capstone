import React from 'react';
import styled from 'styled-components';
import {Stars, Modal} from '../sharedComponents.jsx';



export default function WriteNewReview({ onClose, show, reviewsMeta, product}) {
  //rating
  //recommend
  //Characteristics
  //Summary
  //Body
  //Photos
  //Nickname
  //Email
  //DisplayError
  return (
    <Modal onClose={onClose} show={show}>
      <form>
        <h2>Write Your Review</h2>
        <h3>About the {product.name}</h3>
        <div>{`[star rating]`}</div>
        <div className='FlexRow'>
          Do you recommend this product? Yes
          <input type='radio' id='yes' name='recommend' />
          No
          <input type='radio' id='no' name='recommend' />
        </div>
        <div>
          {`[characteristics]`}
        </div>
        <div>
          Review Summary
        </div>
        <div>
          Review Body
        </div>
        <div>
          Upload your Photos
        </div>
        <div>
          Nickname
        </div>
        <div>
          Email
        </div>
        <div>
          {`[error printout]`}
          Submit
        </div>
      </form>
    </Modal>
  )
}
