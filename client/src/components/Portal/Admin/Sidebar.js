import React from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        <li className="sidebar-item">
          <Link to="/Admin/dashboard" className="sidebar-link">Home</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/Admin/student-details" className="sidebar-link">Student Details</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/Admin/student-entry" className="sidebar-link">Add Student</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/Admin/fees-structure" className="sidebar-link">Fees Structure Details</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/Admin/fine-imposition" className="sidebar-link">Fine Imposition</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/" className="sidebar-link">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
