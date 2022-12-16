import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { CategoriesContext } from '../../contexts/categories.context'
import ProductCard from '../../components/product-card/product-card.component'

import './category.styles.scss'

const Category = () => {
  const { category } = useParams()
  const { categoriesMap } = useContext(CategoriesContext)

  // We don't use the below as this will update the products everytime the component re-renders
  // const products = categoriesMap[category]

  // The following will only update the products when the category changes or the Map changes
  const [ products, setProducts ] = useState(categoriesMap[category])    // It makes sense to use this instead of [] here as we know categoryMap by default is an empty object

  useEffect(()=> {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <>                                           {/*  Shorthand for Fragment */}
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className='category-container'>
        {products &&                                     // because categoriesMap awaits database query products might be undefined. We need to only try and render if products exist otherwise will crash.
          products.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))}
      </div>
    </>
  )
}

export default Category