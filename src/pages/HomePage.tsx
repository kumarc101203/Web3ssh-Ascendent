import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import HowItWorks from '../components/HowItWorks';
import TrustSection from '../components/TrustSection';
import FeaturedServices from '../components/FeaturedServices';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Categories />
      <HowItWorks />
      <TrustSection />
      <FeaturedServices />
    </>
  );
};

export default HomePage;