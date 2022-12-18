import { lazy, Suspense } from 'react'                    // lazy and suspense allow components to be loaded onl when the are called.
import { Routes, Route } from 'react-router-dom'

import Spinner from './components/spinner/spinner.component'

const Home = lazy(() => import('./routes/home/home.component'))
const Navigation = lazy(() => import('./routes/navigation/navigation.component'))
const Authentication = lazy(() => import('./routes/authentication/authentication'))
const Shop = lazy(() => import('./routes/shop/shop.component'))
const Checkout = lazy(() => import('./routes/checkout/checkout.component'))



function App() {
  return (
    <Suspense fallback={<Spinner />} >                {/* Suspense holds the components you want to be lazy loaded and provides a fallbacl component for when not yet loaded */}
      <Routes>
        <Route path='/' element={<Navigation />} >
          <Route index element={<Home />} />            {/* index just makes it appear with the path of parent, in this case '/' */}
          <Route path='shop/*' element={<Shop />} />      {/* the * means anything. like params, the Shop component has nested Routes */}
          <Route path='auth' element={<Authentication />} /> 
          <Route path='checkout' element={<Checkout />} />           {/* paths are relative to the parent path so this equates to '/checkout' */}
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App;
