import React from 'react';
import styled from 'styled-components';

export const commonBorder = 'border-radius: 3px;';

export const styleInteractable = `
  transition-duration: .2s;
  &:hover {
    transition-duration: .1s;
    box-shadow: -2px -3px 10px 0 inset #00000020,
                1px 2px 8px 0 #00000030;
  }
  &:active {
    transition-duration: .05s;
    box-shadow: 2px 3px 12px 0 inset #00000080;
  }
`;

export const CommonStyle = `
  ${commonBorder}
  box-shadow: 0 0 8px 0 #00000066;
`;

export const ButtonStyled = styled.button`
  ${commonBorder}
  background-color: #fefefe;
  border: 1px solid LightGrey;
  ${styleInteractable}
`;

export const CommonThumbnail = styled.img`
  ${styleInteractable}
`;

export const SelectStyled = styled.select`
${styleInteractable}
`;

export const AppContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  position: relative;
`;
export const rootStyle = `
  font-family: Arial, sans-serif;
  margin: 4px;
`;

export const AppStyle = styled.div`
  ${rootStyle}
  * {
    margin: inherit;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Title = styled.div`
  padding-bottom: 10px;
  font-size: 16px;
  font-weight: light;
  color: grey;
  margin-left: 2px;
`;

export const TextButton = styled.button`
  border: 0.5px solid 303030;
  background: white;
  margin: 10px;
  padding: 10px;
  height: 50px;
  font-size: 14px;
  font-weight: bold;
  color: 424242;
  cursor: pointer;
  ${styleInteractable}
`;

export const styleBody = `
margin-left: -7px;
font-size: 17px;
font-weight: bold;
color: 424242;
`

export const BodyText = styled.div`${styleBody}`;

export const BodyLabel = styled.label`${styleBody}
  margin-left: 8px;
`;

export const Feedback = styled.span`
  font-size: 12px;
  font-weight: lighter;
  color: BDBDBD;
`;

export const ResponseText = styled.div`
  text-align: left;
  font-size: 14px;
  margin-left: 5px;
  margin-top: 5px;
  color: 696969;
`;

export const Details = styled.span`
  margin-left: 22px;
  padding-top: 5px;
  padding-left: -5px;
  font-size: 11px;
  font-weight: lighter;
  color: 909090;
`;

export const InputField = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  margin-right: -50px;
  position: absolute;
  top: 0;
`;

export const Clickable = styled.span`
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`;

const StarBounds = styled.div`
  width: 1em;
  height: 1em;
  overflow: hidden;
  position: relative;
  margin: 0;
`;
const StarBoundsButton = styled(StarBounds)`
  &:hover {
    cursor: pointer;
  }
`;

const StarImg = styled.img`
  position: absolute;
  top: 0;
  left: -${({ amount }) => amount}em;
  height: 1em;
  width: 5em;
`;

function WrapStarBounds({ clickStar, i, children }) {
  if (clickStar) {
    return <StarBoundsButton onClick={() => clickStar(i)}>{children}</StarBoundsButton>;
  }
  return <StarBounds>{children}</StarBounds>;
}

/**
 *
 * @param {{reviewsMeta: { averageRating: number }, clickStar: function}}} props
 * @param props.reviewsMeta.averageRating value (from 1 to 5, inclusive) for the stars to display
 * @param props.clickStar callback to execute on clicking a star, passes the index of the star that was clicked
 * @returns react component to render
 */
export const Stars = ({ reviewsMeta, clickStar }) => {
  //TODO: test for different returns based on clickStar value
  const ratingClipped = Math.floor(reviewsMeta.averageRating * 4);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <WrapStarBounds key={i} i={i} clickStar={clickStar}>
        <StarImg src='./img/stars.png' amount={Math.max(0, Math.min(4, ratingClipped - i * 4))} />
      </WrapStarBounds>
    );
  }
  return <FlexRow>{stars}</FlexRow>;
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  margin: 0;
`;

const ModalBody = styled.div`
  position: fixed;
  width: auto;
  height: auto;
  background: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 2em;
  margin: 4px;
`;

const ButtonCloseModal = styled(ButtonStyled)`
  position: absolute;
  right: 10px;
  top: 10px;
  height: 2em;
  width: 2em;
`;

/**
 *
 * @param {{ show: boolean, onClose: function }} props react props.
 * @param props.show boolean state, whether or not modal should be displayed.
 * @param props.onClose callback to be run when modal closes, this should change the 'show' state
 * @returns
 */
export function Modal({ show, onClose, children }) {
  const [lastTarget, setLastTarget] = React.useState(null);
  function escListener(e) {
    if (show) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
  }
  function onClickBackground(e) {
    if (e.target === lastTarget) {
      onClose();
    }
  }
  React.useEffect(() => {
    window.addEventListener('keydown', escListener);
    return () => {
      window.removeEventListener('keydown', escListener);
    };
  });
  if (show) {
    //TODO: block scrolling of main app, block non-mouse input switching (EG tab) from focusing inputs outside the modal window
    //TODO: test returns for different values of show, test that onClose is properly working
    return (
      <ModalBackground onMouseDown={(e) => setLastTarget(e.target)} onClick={onClickBackground}>
        <ModalBody onClick={(e) => e.stopPropagation()}>
          <ButtonCloseModal
            onClick={onClose}
            onKeyDown={(e) => onEsc(e, onClose)}
          ></ButtonCloseModal>
          {children}
        </ModalBody>
      </ModalBackground>
    );
  }
  return '';
}
