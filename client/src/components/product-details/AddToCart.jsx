import MakeSizesEntry from './MakeSizesEntry.jsx';
import MakeQuantityEntry from './MakeQuantityEntry.jsx';
import React from 'react';
import {TextButton, SelectStyled} from '../sharedComponents.jsx'

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    const { selectedStyle } = props;
    this.state = {
      selectedStyle: selectedStyle || null,
      quantity: 0,
      size: null,
      sku: null,
      selectedQuantity: 0,
    };
    this.handleSkuSelection = this.handleSkuSelection.bind(this);
    this.handleQuantitySelection = this.handleQuantitySelection.bind(this);
  }

  handleSkuSelection(targetSku) {
    const currentSku = this.state.selectedStyle.skus[targetSku];
    this.setState({ size: currentSku.size, sku: targetSku, quantity: currentSku.quantity });
  }
  handleQuantitySelection(targetQuantity) {
    this.setState({ selectedQuantity: targetQuantity });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedStyle !== prevState.selectedStyle) {
      this.setState({
        quantity: 0,
        size: null,
        sku: null,
        selectedQuantity: 0,
        selectedStyle: this.props.selectedStyle,
      });
    }
  }
  render() {
    const sizeList = [];
    if (this.state.selectedStyle !== null) {
      const skuList = this.state.selectedStyle.skus;
      for (const sku in skuList) {
        const { size, quantity } = skuList[sku];
        if (quantity === 0) continue;
        const sizeOption = <MakeSizesEntry entry={{ sku, size, quantity }} key={sku} />;
        sizeList.push(sizeOption);
      }
    }
    let quantityList = [];
    if (this.state.quantity > 0) {
      const maxQuantity = Math.min(this.state.quantity, 15);
      quantityList = <MakeQuantityEntry quantity={maxQuantity} />;
    }

    return (
      <form className="style-selctor" onSubmit={(e) => {
        e.preventDefault();
      }}
        id='shopping-cart'>
        <label htmlFor="size-selector">{'Size: '}</label>
        {
          sizeList.length > 0 ?
        <SelectStyled name="size"  onChange={(e) => this.handleSkuSelection(e.target.value)} id='size-selector'>
          <option value="default" key="0">{"--Select size---"}</option>
          {sizeList}
        </SelectStyled>
          :
          <SelectStyled name="size" id='size-selector' disabled={true}>
            <option value="default" key="0">{"OUT OF STOCK"}</option>
          </SelectStyled>
        }
        <label htmlFor="quantity-selector">{'Quantity: '}</label>
        <SelectStyled name="quantity"  onChange={(e) => this.handleQuantitySelection(e.target.value)} id='quantity-selector'>
          <option value="default" key="0">{"-"}</option>
          {quantityList}
        </SelectStyled>

        <TextButton id="add-to-cart" type='submit' form='shopping-cart'>Add To Cart</TextButton>
      </form>
    );
  }
}

export default AddToCart;
