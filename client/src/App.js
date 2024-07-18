import React from "react";
import { Route, Routes } from "react-router-dom";
import Portal from "./components/Portal/Portal";
import StudentLogin from "./components/Portal/Student/StudenLogin/StudentLogin";
import Admin from "./components/Portal/Admin/Admin";
import AdminLogin from "./components/Portal/Admin/Admin";
import AdminHome from "./components/Portal/Admin/AdminHome";
import Dashboard from "./components/Portal/Admin/Dashboard";
import StudentDetails from "./components/Portal/Admin/StudentDetails";
import Studententry from "./components/Portal/Admin/Studententry";
import FeesStructure from "./components/Portal/Admin/FeesStructure";
import FineImposition from "./components/Portal/Admin/FineImposition";
import Logout from "./components/Portal/Admin/Logout";
import StudentHome from "./components/Portal/Student/StudentHome";
import PayFees from "./components/Portal/Student/PayFees";
import Pending from "./components/Portal/Student/Pending";
import Personal from "./components/Portal/Student/Personal";
import FeeDetails from "./components/Portal/Student/FeeDetails";
import FeesReport from "./components/Portal/Student/FeesReport";



const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Portal />} />
        <Route path="/Student/StudentLogin" element={<StudentLogin />} />
        <Route path="/Student/Home" element={<StudentHome/>}/>
        <Route path="/Student/Pay" element={<PayFees/>} />
        <Route path="/Student/Pending" element={<Pending/>} />
        <Route path="/Student/Personal" element={<Personal/>} />
        <Route path="/Student/FeeDetails" element={<FeeDetails/>} />
        <Route path="/Admin/Admin" element={<Admin />} />
        <Route path="/Admin/Login" element={<AdminLogin />} />
        <Route path="/Admin/home" element={<AdminHome />} />
        <Route path="/Admin/dashboard" element={<Dashboard />} />
        <Route path="/Admin/student-details" element={<StudentDetails />} />
        <Route path="/Admin/student-entry" element={<Studententry/>} />
        <Route path="/Admin/fees-structure" element={<FeesStructure />} />
        <Route path="/Admin/fine-imposition" element={<FineImposition />} />
        <Route path="/Admin/logout" element={<Logout />} />
        <Route path="/fees-report" element={<FeesReport />} />
      </Routes>
    </div>
  );
};

export default App;
