const StyleSelector = (props) => {
  //TODO: make a size list and quantity list based on passed in props
  const sizeList = [<option value="XL"/>, <option value="XXL" />];
  const quantityList = [<option value="1"/>, <option value="2" />];
  //todo: handle form submission
  //note: this is placeholder text and elements for styling later
  return (
    <form className="style-selctor">
      <input list="size-list" id="size-list" />
      <datalist>
        <option>--Please choose a size---</option>
        {sizeList}
      </datalist>

      <input list="quantity-list" id="quantity-list"/>
      <datalist>
        <option>--Please choose an amount---</option>
        {quantityList}
      </datalist>

      <button id="add-to-cart">Add To Cart</button>
    </form>
  )
}
export default StyleSelector;