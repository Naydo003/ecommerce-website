import { useNavigate } from 'react-router-dom'

import './directory-item.styles.scss';

function DirectoryItem({category}) {
  const { route } = category
  const navigate = useNavigate()

  const onNavigateHandler = () => navigate(route)

  return (
    <div key='category.id' className='directory-item-container' onClick={onNavigateHandler}>
      <div className="background-image" style={{
        backgroundImage: `url(${category.imageUrl})`
      }} />
      <div className='directory-body'>
        <h2>{category.title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )

}

export default DirectoryItem;