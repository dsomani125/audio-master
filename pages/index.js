import React from 'react';
import {client} from '../lib/client';
import {Cart,Footer,FooterBanner, Layout, HeroBanner, Navbar, Product} from '../components';

const Home = ({products, bannerData, footerBannerData}) => {

  const productCheck = [];

  return (
    <div>
      <HeroBanner heroBanner={bannerData}/>
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
      </div>

      <div className='products-container'>
        {products?.map(
          (product) => {
            const productSlug = product.slug.current.split('-')[0];
            if(!productCheck.includes(productSlug)){
               productCheck.push(productSlug);
              return <Product key={product._id} product={product}/>
            }
            return;
          }
        )}
      </div>
      <FooterBanner footerBanner={footerBannerData[0]}/>
    </div>
  )
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const footerBannerQuery = `*[_type == "footerBanner"]`;
  const footerBannerData = await client.fetch(footerBannerQuery);

  return {
    props: {products, bannerData, footerBannerData}
  } 
}

export default Home