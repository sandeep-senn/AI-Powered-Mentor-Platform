import React from 'react'
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] transition-colors duration-500">
      <Hero />
      <Feature />
      <Testimonial />
      <Contact/>
      <Footer />
    </div>
  )
}

export default Home
