const StyleSelector = (props) => {
  //TODO: make a size list and quantity list based on passed in props
  const sizeList = [<option value="XL" key="1"/>, <option value="XXL" key="2"/>];
  const quantityList = [<option value="1" key="1"/>, <option value="2" key="2"/>];
  //todo: handle form submission
  //note: this is placeholder text and elements for styling later
  return (
    <form className="style-selctor">

      <label htmlFor="size-list">Sizes</label>
      <input list="size-list-options" id="size-list" />
      <datalist id="size-list-options">
        <option value="--Please choose a size---" key="0"/>
        {sizeList}
      </datalist>

      <label htmlFor="quantity-list">Quantity</label>
      <input list="quantity-list-data" id="quantity-list"/>
      <datalist id="quantity-list-data">
        <option value="--Please choose an amount---" key="0"/>
        {quantityList}
      </datalist>

      <button id="add-to-cart">Add To Cart</button>
    </form>
  )
}
export default StyleSelector;