import React from 'react';
// import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import './Adminhome.css'
// import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

const AdminHome = () => {
  return (
 
    <div className='container'>
      <div className='navbar'>
      <Sidebar/>
      </div>
      <div className='home-cont'>
      <h2>Dashboard</h2>
      <Dashboard/>
      </div>
    </div>
   
  
  );
};

export default AdminHome;
