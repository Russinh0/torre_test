import React from "react";
import Login from "./components/Login/Login.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import FavPage from "./components/FavPage/FavPage.jsx";
function App() {
  
  return (
    <>
      <Routes>
        <Route path="/form" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<FavPage />} />
      </Routes>
    </>
  );
}

export default App;
