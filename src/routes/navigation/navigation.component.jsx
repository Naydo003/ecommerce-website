
import { Fragment, useContext } from 'react'
import {Outlet, Link } from 'react-router-dom'

// We can import .svg files as ReactComponents. It must automatically store html data inside a component object function.
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'
import { signOutUser } from '../../utilities/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import './navigation.styles.scss'


function Navigation() {

  // setCurrentUser removed from here when we handled signout in user.context.jsx
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)

  // Deleted, sign out handled by user.context.jsx
  // const signOutHandler = async () => {
  //   await signOutUser()                   // seems wierd, signOutUser returns undefined if successful. Should there be error handling here?
  //   setCurrentUser(null)
  // }

  return (
    <Fragment>                           {/* a fragment is a way of returning a single element without having to render a div onto the page. frags render to nothing. */}
      <div className='navigation'>
        <Link className='logo-container' to='/'>     {/* links are link a tags */}
          <CrwnLogo className='logo' />      
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>SHOP</Link>
          {currentUser ? (
            <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>      // Not using signOutHandler any more
            ) : (
            <Link className='nav-link' to='/auth'>SIGN IN</Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}        {/*  short circuit operator.. if isCartOpen then can do CartDropdown, components and functions are truthy values */}
      </div>
      <Outlet />           {/* Outlet's are a feature that allows othe components to be rendered and tells them where to render */}
    </Fragment>
    
  )

}

export default Navigation