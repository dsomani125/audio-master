import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import { TbCurrencyRupee } from 'react-icons/tb';

const Product = ({product : {
  image,
  name,
  slug,
  price
  }}) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <img 
            src={urlFor(image && image[0])}
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
