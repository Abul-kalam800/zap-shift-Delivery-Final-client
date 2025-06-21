import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../componets/Logo';

const AuthenticLayouts = () => {
    return (
        <div  className='max-w-7xl mx-auto'>
         <div className='mt-10'>
               <Logo></Logo>
         </div>
            <Outlet></Outlet>   
        </div>
    );
};

export default AuthenticLayouts;