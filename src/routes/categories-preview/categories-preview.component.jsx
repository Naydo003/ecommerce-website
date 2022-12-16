import { useContext } from 'react'

import { CategoriesContext } from '../../contexts/categories.context'
import CategoryPreview from '../../components/category-preview/category-preview.component'

const CategoriesPreview = () => {

  const { categoriesMap } = useContext(CategoriesContext)

  // we need to map through an object now instead of an array
  // This can be done using js Object.keys(), returns an array of all objects keys. Note keys() is a method provided on the Object fundamental object. Similar to Math.rand()
  // Summary - for each category, create a fragment with category title and then map out the items/products in that category.
  return (
    <>                                                         {/*  <> is shorthand for <Fragment>, don't even need to import it. Should be consistent with use of shorthand or not over project */}
      {Object.keys(categoriesMap).map(title => {
        const products = categoriesMap[title]                             // Bracket notation for accessing an objects keys. This would translate into categoriesMap.hats(etc).map()
        return (
          <CategoryPreview key={title} title={title} products={products}/>          
        )
      })}
    </>
  )
}

export default CategoriesPreview