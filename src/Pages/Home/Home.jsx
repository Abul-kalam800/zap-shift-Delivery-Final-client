import React from 'react';
import Banner from './Banner/Banner';
import HowItwork from '../Howtowork/HowItwork';
import ServiceSection from './services/ServiceSection';
import BrandSection from '../brand/BrandSection';

const Home = () => {
    return (
        <div>
         <Banner></Banner>
         <HowItwork></HowItwork>
         <ServiceSection></ServiceSection>
         <BrandSection></BrandSection>
        </div>
    );
};

export default Home;