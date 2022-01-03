const ImageGallery = ({data}) => {
  console.log(data);
  let source = "https://media.giphy.com/media/xitrfnahXHFZi5giQs/giphy.gif";
  if (data !== null) {
    source = data.photos[0].url;
    }

  return (
    <div>
      {/* <img className="gallery" src="https://media.giphy.com/media/xitrfnahXHFZi5giQs/giphy.gif" alt="A lot of random images"/> */}
      <img className="gallery" src={source} alt="A lot of random images"/>
    </div>
  )
}
export default ImageGallery;
