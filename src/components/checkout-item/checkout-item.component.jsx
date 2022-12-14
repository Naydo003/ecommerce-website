import { useContext } from "react"

import { CartContext } from "../../contexts/cart.context"

import './checkout-item.styles.scss'


const CheckoutItem = ({item}) => {

  const { name, quantity, price, imageUrl } = item
  const { clearProductFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext)


  // Handler functions created for code clarity and optimisation. Could just include anonymous functions in onClick
  const clearProductHandler = () => clearProductFromCart(item)
  const addItemHandler = () => addItemToCart(item)
  const removeItemHandler = () => removeItemFromCart(item)


  return (
    <div className='checkout-item-container'>
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>&#10095;</div>
        </span>
      <span className="price">{price}</span>
      <div className='remove-button' onClick={clearProductHandler}>
        &#10005;
      </div>
    </div>
  )
}

export default CheckoutItem