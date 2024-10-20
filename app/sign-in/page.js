"use client"
import React from 'react'
import SignIn from  "@/components/blog/pages/SignIn.jsx";
import { Provider } from 'react-redux';
import { store } from '@/components/blog/redux/store'; // Adjust the import path accordingly
import '../globals.css'; // Your global styles

const Home = () => {
  return (
    <Provider store={store}>
    <main className="h-full w-full my-20">
    <SignIn/>
  </main>
  </Provider>
  )
}

export default Home
