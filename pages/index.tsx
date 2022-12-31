import React from 'react';
import {client} from '../lib/client';
import {Cart,Footer,FooterBanner, Layout, HeroBanner, Navbar, Product} from '../components';
import { BannerDataType, ProductDataType } from '../types';

interface PropsDataType {
  products: ProductDataType;
  bannerData: BannerDataType;
}

const Home = ({products, bannerData}: PropsDataType) => {
  return (
    <div>
      <HeroBanner heroBanner={bannerData[0]}/>
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map(
          (product) => <Product key={product._id} product={product}/>
        )}
      </div>
      
      <FooterBanner footerBanner={bannerData[0]}/>
    </div>
  )
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {products, bannerData}
  } 
}

export default Home