import styled from 'styled-components';
import React from 'react';

const ImageThumbnail = styled.img`
  width: 5em;
  height: auto;
  max-height: 10em;
  &:hover {
    transform: scale(110%);
  }
`;

function PhotoGallery({ photos, onDoneLoading = () => {}, onClickThumbnail = () => {} }) {
  if (photos) {
    return (
      <div>
        {photos.map((photo, i) => {
          if (typeof photo === 'string') {
            photo = { url: photo, key: i };
          }
          return (
            <ImageThumbnail
              src={photo.url}
              key={photo.id}
              onLoad={onDoneLoading}
              onError={onDoneLoading}
              onClick={() => onClickThumbnail(photo.url)}
            />
          );
        })}
      </div>
    );
  }
  return '';
}

export default PhotoGallery;
