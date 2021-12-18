import React from 'react';
import Product from './Product/Product';
import { Grid } from '@material-ui/core';

const products = [
  { id: 1, name: 'Shoes', description:'Running shoes', price: '£10' },
  { id: 2, name: 'Laptop', description:'Luxury Laptop', price: '£20'},
  { id: 3, name: 'wpw', description:'Luxury Laptop', price: '£20'},
  { id: 4, name: 'plm', description:'Luxury Laptop', price: '£20'}
]

const Products = () => {
  return (
    <Grid container justifyContent="center" spacing={4}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Product product={product}/>
        </Grid>
      ))}
    </Grid>
  )
}

export default Products
