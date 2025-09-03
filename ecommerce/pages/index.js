import React from 'react';
import axios from 'axios';

import { Product, FooterBanner, HeroBanner } from '../components';
import { Divider } from '@geist-ui/react';

const Home = ({ products, banners, footers }) => {


  return (
    <div>
     
     {banners.length > 0 && <HeroBanner banner={banners[0]} />}
    
      <Divider hLine mt={2} mb={2}>Best Selling Products</Divider>
      <div className="products-container">
        {products?.map(products => (
           <Product key={products.id} product={products} />
        ))}
      </div>
         {footers.length > 0 && <FooterBanner footer={footers[0]} />}
    </div>
  );
};

export async function getServerSideProps() {
  // Fetch data from your Django API endpoints
  const productResponse = await axios.get('http://127.0.0.1:8000/api/products/');
  const bannerResponse = await axios.get('http://127.0.0.1:8000/api/banners/');
  const footerResponse = await axios.get('http://127.0.0.1:8000/api/footers/');
  
  return {
    props: {
      products: productResponse.data,
      banners: bannerResponse.data,
      footers: footerResponse.data
    }
  }
}

export default Home;