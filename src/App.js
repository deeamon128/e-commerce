import React, { useState, useEffect } from "react";
import { commerce } from './lib/commerce';
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckoutForm/Checkout/Checkout"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
 

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
    const { cart } = await commerce.cart.add(productID, quantity);
    setCart(cart)
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, [])

  console.log(cart)

  return (
    <div>
      <BrowserRouter>
      <Navbar totalItems={cart.total_items}/>
      <Routes>
        <Route path="/" element={<Products products={products} onAddToCart={handleAddToCart} />} />
        <Route path="cart" element={<Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart}/>}/>
        <Route path="/checkout" element={<Checkout cart={cart}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
