import styled from 'styled-components';
import React from 'react';
import { ImageThumbnail } from '../sharedComponents.jsx';

export function PhotoGallery({ photos, onDoneLoading = () => {}, onClickThumbnail = () => {} }) {
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
              onClick={() => onClickThumbnail(photo.url, i)}
            />
          );
        })}
      </div>
    );
  }
  return '';
}

export const ConstrainedImg = styled.img`
  max-height: 50vh;
  max-width: 50vw;
`;
