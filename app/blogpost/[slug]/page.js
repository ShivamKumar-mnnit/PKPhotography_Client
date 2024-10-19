"use client"
import React from 'react'
import PostPage from  "@/components/blog/pages/PostPage.jsx";
import { Provider } from 'react-redux';
import { store } from '@/components/blog/redux/store'; // Adjust the import path accordingly
import '../../globals.css'; // Your global styles

const Home = ({params}) => {
  return (
    <Provider store={store}>
    <main className="h-full w-full my-20">
     hello{params.slug}
    <PostPage slug={params.slug} />
  </main>
  </Provider>
  )
}

export default Home
