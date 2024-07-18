import React from "react";
import "./Portal.css";
import Card from "./Card/Card";
import AdminImg from "../Assets/admin2-removebg-preview.png";
import StudentImg from "../Assets/student1-removebg-preview.png";
// import StaffImg from "../Assets/staff.webp";
import { Link } from "react-router-dom";

const Portal = () => {
  return (
    <div className="portal">
      <h1>School Portal</h1>
      <ul className="portal-container">
        <li>
          <Link to="/Student/StudentLogin" className="no-underline">
            <Card
              title="Student"
              content={<img src={StudentImg} alt="Student" />}
            />
          </Link>
        </li>
        <li>
          <Link to="/Admin/Admin" className="no-underline">
            <Card title="Admin" content={<img src={AdminImg} alt="Admin" />} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Portal;
