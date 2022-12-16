
import { Link } from 'react-router-dom'

import ProductCard from '../../components/product-card/product-card.component'

import './category-preview.styles.scss'

const CategoryPreview = ({title, products}) => {


  return (
    <div className='category-preview-container'>
      <h2>                                                           {/* We need span inside a title because we want to add onClick to the word only, h2 is a block element so the entire block would be clickable otherwise */}
        <Link className='title' to={title}>{title.toUpperCase()}</Link>
      </h2>
      <div className="preview">
        {
          products
          .filter((_, idx)=> idx < 4)            // filter(func(currentValue, index, arr){}), _ means ignore the currentValue (ie product)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>
    </div>

  )
}

export default CategoryPreview