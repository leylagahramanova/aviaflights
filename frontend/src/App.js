import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import React from 'react';
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Maintenances from "./pages/Maintenances";
import MainStats from "./pages/MainStats";
import UserStats from "./pages/UserStats";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddMaintenance from "./pages/AddMaintenance";
import EditMaintenance from "./pages/EditMaintenance";
import UserPage from "./pages/UserPage";
import './App.css';
function App() {
  return (  
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path='/user/:id' element={<UserPage/>}/>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              {/* <Route path="/users--statistics" element={<User-Stat />} /> */}
              <Route path="/users/add" element={<AddUser />} />
              <Route path="/users/edit/:id" element={<EditUser />} />
              <Route path="/maintenances" element={<Maintenances />} />
              <Route path="/maintenance-statistics" element={<MainStats />} />
              <Route path="/users-statistics" element={<UserStats />} />
              <Route path="/maintenances/add" element={<AddMaintenance />} />
              <Route path="/maintenances/edit/:id" element={<EditMaintenance />} />
            </Routes>
      </BrowserRouter>
  );
}
export default App;

