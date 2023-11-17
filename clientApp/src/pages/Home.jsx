import React, { useEffect, useState } from 'react';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { getCart } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user?.currentUser);

  return (
    <div>
      <Announcement/>
      <Navbar />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer/>
    </div>
  )
}

export default Home