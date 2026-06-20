import React from 'react'
import Navbar from '../components/navbar'
import Hero from '../components/hero'
import PopularPackages from '../components/PopularPackage'
import SpecialOffers from '../components/SpecialOffer'
import WhyChooseUs from '../components/WhyChooseUs'
import Reviews from '../components/reviews'
import Stats from '../components/Stats'
import Footer from '../components/footer'

export default function Home() {
  return (
    <>
      <Hero />
      <Navbar />
      <PopularPackages />
      <SpecialOffers />
      <WhyChooseUs />
      <Reviews />
      <Stats />
      <Footer />
    </>
  )
}