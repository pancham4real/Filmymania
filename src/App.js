import "./App.css";
import React, { useState } from "react";
import Header from "./components/Header";
import Cards from "./components/Cards";
import { Routes, Route } from "react-router-dom";
import Addmovie from "./components/Addmovie";
import Detail from "./components/Detail";
import { createContext } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [name, setName] = useState("");

  return (
    <Appstate.Provider value={{ login, setLogin, name, setName }}>
      <div className="App relative">
        {/* <h1 className="text-blue-500 text-lg ">Filmyverse</h1> */}
        <Header />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/addmovie" element={<Addmovie />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Appstate.Provider>
  );
}

export default App;
export { Appstate };
