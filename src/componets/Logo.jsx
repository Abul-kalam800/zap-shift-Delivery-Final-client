import React from 'react';
import logo from '../assets/logo.png'
import { Link } from 'react-router';
const Logo = () => {
    return (
        <>
        <Link to='/'>
           <div className='flex items-center'>
            <img className='mb-4' src={logo} alt="" />
            <h2 className='font-bold text-2xl -ml-4 font-family'>Profast</h2>
            
        </div>
        </Link>
        </>
     
    );
};

export default Logo;