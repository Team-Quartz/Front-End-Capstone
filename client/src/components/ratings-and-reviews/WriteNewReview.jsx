import React from 'react';


export default function WriteNewReview(props) {
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
    <div>
      <h2>Write Your Review</h2>
      <h3>About the {`[product name]`}</h3>
      <div>{`[star rating]`}</div>
      <div className='FlexRow'>
        Do you recommend this product? Yes No
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
    </div>
  )
}
