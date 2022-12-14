import { createContext, useState } from "react";
import PRODUCTS from '../shop-data.json'       // We are naming a variable so can call them what we want here


// import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utilities/firebase/firebase.utils";


export const ProductsContext = createContext({
  products: [],
  setProducts: () => null

})

export const ProductsProvider = ({children}) => {

  const [ products ] = useState(PRODUCTS)
  const value = { products }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>

}