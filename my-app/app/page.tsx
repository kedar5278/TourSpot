import React from 'react'
import Navbar from '../components/navbar'
import PopularPackages from '../components/PopularPackage'
import SpecialOffers from '../components/SpecialOffer'
import Footer from '../components/footer'
import Hero from '../components/hero'
import WhyChooseUs from '../components/WhyChooseUs'
import Reviews from '../components/reviews'
import Stats from '../components/Stats'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <PopularPackages />
      <SpecialOffers />
      <WhyChooseUs />
      <Reviews />
      <Stats />
      <Footer />
    </>
  )
}
    
