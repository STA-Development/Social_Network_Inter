import React from "react";
import { Login } from "./Components/Login";
import { SignUp } from "./Components/SignUp";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { Posts } from "./pages/posts";
import { Feed } from "./pages/feed";
import { Navbar } from "./Components/Navbar";
import { Profile } from "./pages/profile";
import { CreateProfile } from "./Components/CreateProfile";

function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createProfile" element={<CreateProfile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
