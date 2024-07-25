import React, { useEffect, useState } from 'react';
import { usePostListContext } from '../../hooks/usePostListContext';
import { useAuthContext} from '../../hooks/useAuthContext'
import Feed from '../components/Feed';


const Home = () => {
  const {posts, dispatch} = usePostListContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchAllPosts = async () => {
      try{
        const response = await fetch("http://localhost:8000/api/feed", {
          headers: {
            'Authorization' : `Bearer ${user.token}`
          }
        })
        const json = await response.json()
        
        if (response.ok) {
          dispatch({type: 'SET_POSTS', payload: json})
        }
        // console.log(response)
      } catch (err) {
        console.log(err);
      }
    }
    if (user) {
      fetchAllPosts()
    }
  }, [dispatch, user])
  
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts && posts.map(post => (
          <Feed key={post._id} post={post}/>
        ))}
      </div>
    </div>
  );
};

export default Home;
