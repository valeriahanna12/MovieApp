import React from 'react'

import { Link } from "react-router-dom";
export default function Navbar({userData , logOut}) {
  return <nav className='d-flex flex-column flex-md-row justify-content-between'>


    <div className="left-nav d-flex flex-column flex-md-row align-items-center m-2">
      <h1 className='m-0'>Noxe</h1>

      {userData?<ul className='list-unstyled  flex-row d-flex align-items-center m-0 ps-3'>
        <li className='p-1'><Link to='/'>Home</Link></li>
        <li className='p-1'><Link to='movies'>Movies</Link></li>
        <li className='p-1'><Link to='tv'>Tv</Link></li>
        <li className='p-1'><Link to='People'>People</Link></li>
      </ul>:''}
      
    </div>
    <div className="left-right d-flex flex-column flex-md-row align-items-center m-2">
      <div className="social-media cursor-pointer d-flex flex-row align-items-center">
      <i className='fab fa-facebook  ps-1 pb-1 pt-2 '></i>
      <i className='fab fa-intagram  ps-1 pb-1 pt-2'></i>
      <i className='fab fa-twitter  ps-1 pb-1 pt-2'></i>
      <i className='fab fa-spotify  ps-1 pb-1 pt-2'></i>
      <i className='fab fa-youtube  ps-1 pb-1 pt-2'></i>

      </div>
      <ul className='list-unstyled d-flex flex-row pt-1 align-items-center m-0 ps-3'>
        
        {userData?<>
        <li className='p-1 cursor-pointer ' onClick={logOut}><span>LogOut</span></li>
        <li className='p-1'><Link to='profile'><i className="fa-regular fa-user ps-2 "></i> Profile</Link></li>
        </>:<>
        <li className='p-1'><Link to='register'>Register</Link></li>
        <li className='p-1'><Link to='login'>Login</Link></li>
        </>}
        

        
      </ul>
    </div>
  </nav>
}
