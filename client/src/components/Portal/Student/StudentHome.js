import React from 'react';
// import '../Admin/Adminhome.css'
import './StuentHome.css'
import Sidebar from './Sidebar';
import DashboardImage from '../../Assets/cartoon-removebg-preview.png';

const StudentHome = () => {
  return (
 
    <div className='container'>
    <div className='navbar'>
    <Sidebar/>
    </div>
    <div className='home-cont'>
    <h2>Dashboard</h2>
    {/* <Dashboard/> */}
    <img src={DashboardImage} alt="Dashboard" className="dashboard-image" />
    </div>
  </div>
   
  
  );
};

export default StudentHome;
