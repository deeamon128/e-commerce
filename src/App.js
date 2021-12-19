import React, { useState, useEffect } from "react";
import { commerce } from './lib/commerce';
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})

  const fetchProduct = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productID, quantity) => {
    const item = await commerce.cart.add(productID, quantity);
    setCart(item.cart)
  }

  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, [])

  return (
    <BrowserRouter>
      <div>
        <Navbar totalItems={cart.total_items}/>
        <Routes>
          <Route path="/" element={<Products products={products} onAddToCart={handleAddToCart}/>} />
          <Route patch="/cart" element={<Cart cart={cart}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
