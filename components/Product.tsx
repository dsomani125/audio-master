import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import { ProductDataType } from '../types'
import { TbCurrencyRupee } from 'react-icons/tb';

interface ProductProps {
  product: ProductDataType;
};

const Product = ({product : {
  image,
  name,
  slug,
  price
  }}: ProductProps ) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <img 
            src={urlFor(image[0])}
            width={250}
            height={250}
            alt='headphone'
            className='product-image'
          />
          <p className='product-name'>{name}</p>
          <span className='product-price'>
            <TbCurrencyRupee style={{paddingTop: '2px'}}/>{price}
          </span>
        </div>
      </Link>
    </div>
  )
}

export default Product;
