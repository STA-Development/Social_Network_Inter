import React from "react";
import { Login } from "./Components/Login";
import { SignUp } from "./Components/SignUp";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./Components/Home";
import { Posts } from "./Components/Posts";
import { Feed } from "./Components/Feed";
import { Header } from "./Components/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </div>
  );
}

export default App;
