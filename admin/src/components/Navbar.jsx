import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  const handleLogout = () => {
    
    setToken("");
    localStorage.removeItem("token");
  }
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className='w-[max(15%,80px)]' src={assets.logo}/>
        <button onClick={handleLogout} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar