import React, { useEffect } from 'react';

// Components
import { Product, FooterBanner, HeroBanner } from '../components';

// Sanity client
import { client } from '../lib/client';

// Context
import { useStateContext } from '../context/StateContext';

const Home = ({ products, bannerData }) => {
  const { setCartItems, setTotalPrice, setTotalQuantity } = useStateContext();

  useEffect(() => {
    if (localStorage.getItem("cartItems")) {
      setCartItems(JSON.parse(localStorage.getItem("cartItems")));
      setTotalPrice(Number(JSON.parse(localStorage.getItem("totalPrice"))));
      setTotalQuantity(Number(JSON.parse(localStorage.getItem("totalQuantity"))));
    }
  }, [])

  return (
    <>
      <HeroBanner heroBanner={bannerData.length > 0 && bannerData[0]} />

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return { props: { products, bannerData } };
}

export default Home;