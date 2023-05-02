import React from 'react'
import client from '../lib/client';
import Products from '@/components/Products';

const ready_to_wear = ({products}) => {
  return (
    <div>
      {products
          .filter((product) => product.featured)
          .map((product) => (
            <div>
            
              <Products key={product._id} product={product} />
            </div>
          ))}
    </div>
  )
}

export default ready_to_wear;
