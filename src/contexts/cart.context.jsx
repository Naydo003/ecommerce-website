import { createContext, useState, useEffect } from "react";


const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id 
  )

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
    )
  } 
  return [ ...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToRemove.id 
  )

  if (existingCartItem.quantity === 0) {
    return
  }

  return cartItems.map((item) =>
    item.id === productToRemove.id 
      ? { ...item, quantity: item.quantity - 1 } 
      : item
  )

}

const clearCartProduct = (cartItems, productToRemove) => {

  return cartItems.filter((item) =>
    item.id !== productToRemove.id 
  )
} 


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},            // Because we just want to change quantity and set the rest based off products we will define our own function here instead of setCartItems
  cartCount: 0,
  totalCount: 0,
  removeItemFromCart: () => {},
  clearProductFromCart: () => {}
})

export const CartProvider = ({children}) => {

  const [ isCartOpen, setIsCartOpen ] = useState(false)
  const [ cartItems, setCartItems ] = useState([])
  const [ cartCount, setCartCount ] = useState(0)
  const [ totalCount, setTotalCount ] = useState(0)

  // There are ways to do this that don't require useEffect. Could expose a function that will always reduce cart items..
  useEffect(() => {
    const newCartCount = cartItems.reduce((total, item) => total + item.quantity, 0)     // reduce(callback(count, element), starting value)
    setCartCount(newCartCount)
    const newTotalCount = cartItems.reduce((total, item) => total + ( item.quantity * item.price ), 0)
    setTotalCount(newTotalCount)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const removeItemFromCart = (itemToRemove) => {
    setCartItems(removeCartItem(cartItems, itemToRemove))
  }

  const clearProductFromCart = (productToRemove) => {
    setCartItems(clearCartProduct(cartItems, productToRemove))
  }


  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, totalCount, removeItemFromCart, clearProductFromCart }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}



