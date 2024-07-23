import React, { useEffect, useState } from 'react';
import { usePostListContext } from '../../hooks/usePostListContext';
import Feed from '../components/Feed';


const Home = () => {
  const {posts, dispatch} = usePostListContext()

  useEffect(() => {
    const fetchAllPosts = async () => {
      try{
        const response = await fetch("http://localhost:8000/api/feed")
        const json = await response.json()
        
        if (response.ok) {
          dispatch({type: 'SET_POSTS', payload: json})
        }
        // console.log(response)
      } catch (err) {
        console.log(err);
      }

    }
    fetchAllPosts()
  }, [])
  
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts && posts.map(post => (
          <Feed key={post._id} post={post}/>
        ))}
      </div>
    </div>
  );
};

export default Home;










// const posts = [
//   {
//     id: 1,
//     username: 'user1',
//     image: 'https://via.placeholder.com/300',
//     title: 'A Beautiful Sunset',
//     description: 'Enjoying the sunset at the beach.'
//   },
//   {
//     id: 2,
//     username: 'user2',
//     image: 'https://via.placeholder.com/300',
//     title: 'Mountain Hiking',
//     description: 'Reached the top of the mountain.'
//   },
//   {
//     id: 3,
//     username: 'user3',
//     image: 'https://via.placeholder.com/300',
//     title: 'City Lights',
//     description: 'City skyline at night.'
//   },
//   {
//     id: 4,
//     username: 'user4',
//     image: 'https://via.placeholder.com/300',
//     title: 'Forest Walk',
//     description: 'Walking through the forest.'
//   },
//   {
//     id: 5,
//     username: 'user5',
//     image: 'https://via.placeholder.com/300',
//     title: 'Desert Adventure',
//     description: 'Exploring the desert.'
//   },
//   {
//     id: 6,
//     username: 'user6',
//     image: 'https://via.placeholder.com/300',
//     title: 'Snowy Mountains',
//     description: 'Snow-capped mountain peaks.'
//   },
//   {
//     id: 6,
//     username: 'user6',
//     image: 'https://via.placeholder.com/300',
//     title: 'Snowy Mountains',
//     description: 'Snow-capped mountain peaks.'
//   }
// ];