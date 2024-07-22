import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Start from "./component/Start";
import Register from "./component/Register";
import Map from "./component/Map";
import My from "./component/My";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/start" element={<Start />} />
            <Route path="/register" element={<Register />} />
            <Route path="/map" element={<Map />} />
            <Route path="/my" element={<My />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
