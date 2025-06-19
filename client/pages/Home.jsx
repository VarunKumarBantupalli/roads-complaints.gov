import React, { useEffect, useState } from 'react';
import Landing from '../components/Landing';
import Navbar from '../components/Navbar';
import Numbers from '../components/Numbers';
import Marketing from '../components/Marketing';
import Footer from '../components/Footer';
import Camera from '../components/Camerabar';




const Home = () => {
 

  return (
    <>
    <Navbar/>
    <Landing/>
    <Numbers/>
    <Marketing/>
    <Camera/>
    <Footer/> 

    </>
  );
};

export default Home;
