import React from 'react';
import { Link } from 'react-router-dom';
// import './SideNav.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        <li className="sidebar-item">
          <Link to="/Student/Home" className="sidebar-link">Home</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/Student/Personal" className="sidebar-link">Personal Details</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/Student/Pay" className="sidebar-link">Pay Achedmic Fees</Link>
        </li>
        {/* <li className="sidebar-item">
          <Link to="/Student/Pending" className="sidebar-link">Pending Fees</Link>
        </li> */}
        {/* <li className="sidebar-item">
          <Link to="/Student/FeeDetails" className="sidebar-link"> Fees Details</Link>
        </li> */}
        <li className="sidebar-item">
          <Link to="/" className="sidebar-link">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
