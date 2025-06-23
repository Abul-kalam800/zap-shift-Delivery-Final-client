import React from 'react';
import BangladeshMap from '../../componets/BangladeshMap';
import { useLoaderData } from 'react-router';

const Coverag = () => {
    const servicedata = useLoaderData()
    console.log(servicedata)
    return (
        <div>
         <div className='max-w-4xl mx-auto'>
            <h3 className='text-4xl font-semibold mt-5 p-10'>We are aviable in 64 district in Bangladesh</h3>
            <BangladeshMap servicedata={servicedata}></BangladeshMap>
         </div>
        </div>
    );
};

export default Coverag;