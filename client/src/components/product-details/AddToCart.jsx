import MakeSizesEntry from './MakeSizesEntry.jsx';
import React from 'react';

class AddToCart extends React.Component{
  constructor (props) {
    super(props);
    const {selectedStyle} = props;
    this.state = {
      selectedStyle: selectedStyle || null,
      currentSku: null,
    }
    this.handleSkuSelection.bind(this);
  }

  handleSkuSelection (targetSize) {
    const skuEntries = Object.values(this.state.selectedStyle.skus);
    const newSku = skuEntries.find((skuObject) => skuObject.size === targetSize);
    this.setState({currentSku: newSku});
  }

  render() {
   const quantityList = [<option value="1" key="1"/>, <option value="2" key="2"/>];
   //todo: handle form submission
   //note: this is placeholder text and elements for styling later
   const sizeList = [];
   if(this.state.selectedStyle !== null) {

    const skuList = this.state.selectedStyle.skus;
    console.log(skuList)
    for (const sku in skuList) {
      const {size, quantity} = skuList[sku];
      const sizeOption = <MakeSizesEntry entry={{sku, size, quantity}} key={sku} />
      sizeList.push(sizeOption)
    }
   }
    return (
      <form className="style-selctor" onSubmit={(e) => {
        e.preventDefault();
        console.log('Submission')}}
        id='shopping-cart'>

        {/* <label htmlFor="size-list">Sizes</label>
        <input list="size-list-options" id="size-list" /> */}
        <select value="--Select size---" onChange={(e) => this.handleSkuSelection(e.target.value)}>
          {/* <option value="--Select size---" key="0" selected/> */}
          {sizeList}
        </select>

        <label htmlFor="quantity-list">Quantity</label>
        <input list="quantity-list-data" id="quantity-list"/>
        <datalist id="quantity-list-data">
          <option value="--Please choose an amount---" key="0"/>
          {quantityList}
        </datalist>

        <button id="add-to-cart" type='submit' form='shopping-cart' disabled={true}>Add To Cart</button>
      </form>
    )
  }
}
export default AddToCart;
