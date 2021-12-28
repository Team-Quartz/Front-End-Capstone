const ProductInformation = ({productData}) => {
  const {category, name, default_price, description} = productData;
  /*
  TODO: create conditional rendering for price and style accordingly. Create links for social media
  Note: currently do not have access to number of stars and need to look into that. Also needs a way to make links for social media
  */
  return (
    <div className="product-info">
      <div className="review-stars"></div>
      <div className="category-name">{category}</div>
      <div className="product-name">{name}</div>
      <div className="product-price">${default_price}</div>
      <div className="product-full-description">{description}</div>
      <div className="social-media-links">Social Media placeholder</div>
    </div>
  )
}
export default ProductInformation;
