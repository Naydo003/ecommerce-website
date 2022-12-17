import { createContext, useReducer } from "react";


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
    return cartItems.map((item) =>
    item.id === productToRemove.id 
      ? { ...item, quantity: item.quantity } 
      : item
  )
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


// Reducers only store readable values!
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalCount: 0,
}

// Reducer should not handle any business logic! Reducer should only update state.
const cartReducer = (state, action) => {
  const { type, payload } = action

  switch(type) {

    case 'SET_CART_ITEMS':
      return {
        ...state,
        ...payload,
      }
    case 'SET_IS_CART_OPEN':
      return {
        ...state,
        isCartOpen: payload,
      }
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`)
  }
}

export const CartProvider = ({children}) => {
  // this is const [ state, dispatch ] = ... with state deconstructed out.
  const [ { cartItems, isCartOpen, cartCount, totalCount }, dispatch ] = useReducer(cartReducer, INITIAL_STATE)  

  // All business logic done here
  const updateCartItemsReducer = (newCartItems) => {

    const newCartCount = newCartItems.reduce((total, item) => total + item.quantity, 0) 
    const newTotalCount = newCartItems.reduce((total, item) => total + ( item.quantity * item.price ), 0)

    dispatch({ type: 'SET_CART_ITEMS', payload: {cartItems: newCartItems, cartCount: newCartCount, totalCount: newTotalCount}})
  }


  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    updateCartItemsReducer(newCartItems)
  }

  const removeItemFromCart = (itemToRemove) => {
    const newCartItems = removeCartItem(cartItems, itemToRemove)
    updateCartItemsReducer(newCartItems)
  }

  const clearProductFromCart = (productToRemove) => {
    const newCartItems = clearCartProduct(cartItems, productToRemove)
    updateCartItemsReducer(newCartItems)
  }

  const setIsCartOpen = (bool) => {
    dispatch({type: 'SET_IS_CART_OPEN', payload: bool})
  }

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, totalCount, removeItemFromCart, clearProductFromCart }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}



