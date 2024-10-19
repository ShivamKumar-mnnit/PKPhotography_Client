"use client"
import React from 'react'
import Home1 from  "@/components/blog/pages/Home.jsx";
import { Provider } from 'react-redux';
import { store } from '@/components/blog/redux/store'; // Adjust the import path accordingly
import '../globals.css'; // Your global styles

const Home = () => {
  return (
    <Provider store={store}>
    <main className="h-full w-full my-20">
    <Home1/>
  </main>
  </Provider>
  )
}

export default Home
