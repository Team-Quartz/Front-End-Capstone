import styled from 'styled-components';

const ImageGallery = ({data}) => {
  let source = "https://media.giphy.com/media/xitrfnahXHFZi5giQs/giphy.gif";

  if (data !== null) {
    source = data.photos[0].url;
    }

  const StyledImage = styled.img`
  height: 300;
  width: 300;
  `
  return (
    <div>
      {/* <img className="gallery" src="https://media.giphy.com/media/xitrfnahXHFZi5giQs/giphy.gif" alt="A lot of random images"/> */}
      <StyledImage className="gallery" src={source} alt="A lot of random images"/>
    </div>
  )
}
export default ImageGallery;
