import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'    // This needs to be added for routing. The entire App is inside the Browser Router below

import App from './App';
import {UserProvider} from './contexts/user.context'
import {ProductsProvider} from './contexts/products.context'
import { CartProvider } from './contexts/cart.context';


import './index.css';
import reportWebVitals from './reportWebVitals';


// In the following the ProductsProvider has access to the UserProvider data but not visa versa. We may want to modify what products we show different user for example based on location.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
