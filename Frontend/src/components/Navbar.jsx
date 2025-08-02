import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
const [visible ,setVisible]=useState(false);
  const {setShowSearch ,getCartCount,navigate,token,setToken,setCartItems,setAiShowSearch} =useContext(ShopContext)
  const adminPanel =import.meta.env.VITE_ADMIN_PANEL
  
  const logout =()=>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    
  }
  
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
    
    {/* Logo on the left */}
    <Link to='/'>
    <img src={assets.logo} className='w-30 py-4 px-4' alt=''/>
      </Link>

     {/* Nav items on the right */}
    <ul className='hidden sm:flex gap-5 text-sm text-gray-700 '>
    <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p className='font-semibold'>Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
    </NavLink>

    <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p className='font-semibold'>Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
    </NavLink>

    <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p className='font-semibold'>About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
    </NavLink>
    
    <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p className='font-semibold'>Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
    </NavLink>


    </ul>
    
<div className='border border-gray-500 rounded-xl px-4 py-1 flex items-center justify-center mb-2 hidden sm:flex md:w-auto max-w-[150px] md:block'>
  <a
    href={adminPanel}
    target="_blank"
    rel="noopener noreferrer"
    className="text-center w-full truncate text-gray-500"
  >
    ADMIN PANEL
  </a>
</div>

      {/* Right-side icons */}
    <div className='flex items-center gap-6'>
        <img onClick={()=>{
          setAiShowSearch(true)
          setShowSearch(false)
        } } src={assets.ai_icon} className='w-5 cursor-pointer' alt='' />

        <img onClick={()=> {
          setShowSearch(true)
          setAiShowSearch(false)
        }} src={assets.search_icon} className='w-5 cursor-pointer' alt='' />
   
    <div className='group relative'>
          <img onClick={()=>token?null:navigate('/login')} src={assets.profile_icon} className='w-5 min-w-5 cursor-pointer '/>
          {/* DropDown Menu */}
    {token && <div className='group-hover:block hidden absolute  right-0 pt-4 z-10'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
          </div> }
          
    </div>
          <Link to='/cart' className='relative'>
              <img src={assets.cart_icon} className='w-5 min-w-5'/>
              <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] '>{getCartCount()}</p>
          </Link>
          <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden'/>
    </div>
     
      {/* Sidebar menu for small screens */}
    <div className={`fixed top-0 right-0 bottom-0  bg-white transition-all duration-300 z-50 ${visible ? 'w-full':'w-0' } overflow-hidden `}>
        <div className='flex flex-col text-gray-600 h-full'>
          <div onClick={()=> setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon}/>
            <p>Back</p>
          </div>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/' >Home</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border'  to='/collection'>Collection</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border'  to='/about'>About</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
          <a onClick={()=>setVisible(false)} href={adminPanel} target="_blank" rel="noopener noreferrer"
          className='py-2 pl-6 border'>ADMIN PANEL</a>
        </div>
    </div>

    
    </div>
  )
}

export default Navbar