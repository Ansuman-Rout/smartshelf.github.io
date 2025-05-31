import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
 import "../styles/Layout.css";

function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout-body">
        <Sidebar />
        <main className="content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
