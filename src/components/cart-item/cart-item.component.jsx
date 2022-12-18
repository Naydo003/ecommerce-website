import { memo } from 'react'        // memo is a optimisation tool that stops stops unnecessary re-rendering

import './cart-item.styles.scss'

const CartItem = memo(({cartItem}) => {
  const {name, quantity, price, imageUrl} = cartItem

  return (
    <div className='cart-item-container'>
      <img src={imageUrl} alt={name} />
      <div className='item-details'>
        <span className='name'>{name}</span>
        <span className='price'>{quantity} x ${price}</span>
      </div>
    </div>
  )
})

export default CartItem