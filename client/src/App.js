import React from "react";
import Login from "./components/Login/Login.jsx";
import { Route, Routes } from "react-router-dom";
import SearchBar from "./components/Search/SearchBar.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<SearchBar />} />
      </Routes>
    </>
  );
}

export default React.memo(App);
