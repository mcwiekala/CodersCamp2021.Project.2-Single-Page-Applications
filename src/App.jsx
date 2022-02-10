import React from "react";
import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import PagesRouter from "./PagesRouter";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <PagesRouter />
    </div>
  );
}
