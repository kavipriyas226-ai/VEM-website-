import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Categories from '../components/Categories.jsx';
import About from '../components/About.jsx';
import Services from '../components/Services.jsx';
import Gallery from '../components/Gallery.jsx';
import Packages from '../components/Packages.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import FAQ from '../components/FAQ.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <About />
        <Services />
        <Gallery />
        <Packages />
        <WhyChooseUs />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
