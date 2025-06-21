import React, { useEffect, useState } from 'react';
import Landing from '../components/Landing';
import Navbar from '../components/Navbar';
import Marketing from '../components/Marketing';
import Footer from '../components/Footer';
import Camera from '../components/Camerabar';
import Mission from '../components/Mission';




const Home = () => {
 

  return (
    <>
    <Navbar/>
    <Landing/>
    <Mission />
    <Marketing/>
    <Camera/>
    <Footer/> 

    </>
  );
};

export default Home;
