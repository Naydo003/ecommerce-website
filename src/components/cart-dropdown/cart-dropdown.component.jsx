import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'


import { CartContext } from '../../contexts/cart.context'

import CartItem from '../cart-item/cart-item.component'
import Button from '../button/button.component'



import './cart-dropdown.styles.scss'

const CartDropdown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext)

  const navigate = useNavigate()

  const goToCheckoutHandler = () => {
    setIsCartOpen(false)
    navigate('/checkout')
  }

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {
          cartItems.length ? (
            cartItems.map(item => (
              <CartItem key={item.id} cartItem={item} />
            ))) : (
              <span className='empty-message'>Your Cart is Empty</span>
            )
        }
      </div>
      <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>
    </div>
  )
}

export default CartDropdown