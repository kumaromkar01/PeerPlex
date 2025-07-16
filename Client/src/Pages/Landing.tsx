import { useState,useEffect } from 'react';
import toast from 'react-hot-toast';
import { getProfile } from '../Services/api';

import Insight from '../Component/Insight';
import Navbar from '../Component/Navbar'
import Welcome from '../Component/Welcome'
import Featured from '../Component/Featured';
import SavedBooks from '../Component/SavedBooks';
import LatestReviews from '../Component/LatestReviews';
function Landing() {
  const [user,setUser] = useState("Mr. anaonymous");
  const [email, setEmail] = useState("BeyondDeveloper@gmail.com");

  useEffect(()=>{
    (async()=>{
      try {
        const token = localStorage.getItem('token');
        const res = await getProfile(token as string);
        if (res?.data) {
          setUser(res.data.name || "Anonymous");
          setEmail(res.data.email || "unknown@example.com");
        }
      } catch (error) {
        toast.error(error as string);
      }
      
    })()
  },[]);
  return (
    <div>
      <Navbar name={user} email={email}/>
      <Welcome name={user}/>
      <Insight/>
      <div className='grid grid-cols-3 gap-4 bg-gray-900 space-x-1'>
        <Featured/>
        <div className='mt-11 lg:col-span-1 col-span-3 space-y-6'>
          <SavedBooks/>
          <LatestReviews/>
        </div>
      </div>
    </div>
  )
}

export default Landing;
