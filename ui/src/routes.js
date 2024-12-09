import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/login";
import Upload from "./Pages/DataUpload"

const RoutesComponent = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path= "/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
