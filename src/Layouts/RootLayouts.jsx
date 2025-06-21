
import React from 'react';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/footer/Footer';
import { Outlet } from 'react-router';

const RootLayouts = () => {
    return (
        <div className='max-w-7xl mx-auto'>
          <Navbar></Navbar>
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
    );
};

export default RootLayouts;