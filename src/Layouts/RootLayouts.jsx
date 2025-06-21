
import React, { use } from 'react';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/footer/Footer';
import { Outlet } from 'react-router';
import { AuthContex } from '../Contex/AuthContex';

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