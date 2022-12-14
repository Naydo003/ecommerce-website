import { Routes, Route } from 'react-router-dom'

import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import Authentication from './routes/authentication/authentication'
import Shop from './routes/shop/shop.component'
import Checkout from './routes/checkout/checkout.component'



function App() {
  return (
  <Routes>
    <Route path='/' element={<Navigation />} >
      <Route index element={<Home />} />            {/* index just makes it appear with the path of parent, in this case '/' */}
      <Route path='shop' element={<Shop />} />      {/* paths are relative to the parent path so this equates to '/shop' */}
      <Route path='auth' element={<Authentication />} /> 
      <Route path='checkout' element={<Checkout />} />
    </Route>
  </Routes>
  )
}

export default App;
