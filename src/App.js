import React, { useState, useEffect } from "react";
import { commerce } from './lib/commerce';
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";

function App() {
  const [products, setProducts] = useState([])

  const fetchProduct = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  useEffect(() => {
    fetchProduct();
  }, [])
console.log(products)

  return (
    <div>
      <Navbar />
      <Products products={products}/>
    </div>
  );
}

export default App;
