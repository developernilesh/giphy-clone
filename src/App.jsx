import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="container px-6 py-4 mx-auto">
        <nav>
          <Navbar />
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
