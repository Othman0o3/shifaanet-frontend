import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Main from './pages/Main';
import DoctorsPage from "./pages/DoctorsPage";
import Hospitals from "./pages/Hospitals";
import Labd from "./pages/LabsPage";
import VaccCentersPage from "./pages/VaccCentersPage";
import DetailPage from "./pages/DetailPage";
import MyAccountPage from "./pages/MyAccountPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Room from './pages/RoomPage';

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={4000} rtl={true} />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/hosp/" element={<Main />} />
          <Route path="/hosp/doctor" element={<DoctorsPage />} />
          <Route path="/hosp/hospital" element={<Hospitals />} />
          <Route path="/hosp/labs" element={<Labd />} />
          <Route path="/hospital/:id" element={<DetailPage type="hosp" />} />
          <Route path="/labs/:id" element={<DetailPage type="labs" />} />
          <Route path="/vacc-centers/:id" element={<DetailPage type="vaccs" />} />
          <Route path="/hosp/vacc-centers" element={<VaccCentersPage />} />
          <Route path="/hosp/myaccount" element={<MyAccountPage />} />
          <Route path="/hosp/signup" element={<SignupPage />} />
          <Route path="/hosp/login" element={<LoginPage />} />
          <Route path="/online/:roomId" element={<Room />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
