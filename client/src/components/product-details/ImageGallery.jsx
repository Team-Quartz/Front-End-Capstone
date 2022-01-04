import styled from 'styled-components';
const StyledImage = styled.img`
height: 300;
width: 300;
`

const ImageGallery = ({data}) => {
  let source = "https://media.giphy.com/media/xitrfnahXHFZi5giQs/giphy.gif";

  if (data !== null) {
    source = data.photos[0].url;
    }

  return (
    <div>

    </div>
  )
}
export default ImageGallery;
