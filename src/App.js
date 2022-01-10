import React, { useState, useEffect } from "react";
import { commerce } from './lib/commerce';
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckoutForm/Checkout/Checkout"
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

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

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, [])

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <div>
      <BrowserRouter>
      <Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle}/>
      <Routes>
        <Route path="/" element={<Products products={products} onAddToCart={handleAddToCart}  handleUpdateCartQty />} />
        <Route path="cart" element={<Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart}/>}/>
        <Route path="/checkout" element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
