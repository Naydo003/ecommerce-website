import { createContext, useState, useEffect } from "react";
// import SHOP_DATA from '../shop-data.js'       // Deleted. Data moved to firestore db. We are naming a variable so can call them what we want here.


import { getCategoriesAndDocuments } from "../utilities/firebase/firebase.utils";


export const CategoriesContext = createContext({
  CategoriesMap: {},

})

export const CategoriesProvider = ({children}) => {

  const [ categoriesMap, setCategoriesMap ] = useState({})     // We are interfacing with the objects keys to get the responding item for a category. Use empty object instead of null 

  useEffect(()=>{                              // basically never want to pass an async function as a callback to useEffect. Need to have it one layer deep at least.
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      setCategoriesMap(categoryMap)
    }

    getCategoriesMap()          // after we define need to invoke function.
  }, [])                       // DO NOT FORGET to only run on mount. Or you send a billion queries to your database and max out your quota :(, looks like we will continue tomorrow!

  // This useEffect was just made to seed the database. It should then be deleted.
  // useEffect(()=> {
  //   addCollectionAndDocuments('categories', SHOP_DATA )
  // }, [])

  const value = { categoriesMap }

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>

}