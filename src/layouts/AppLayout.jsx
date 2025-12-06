// src/layouts/AppLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Main page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
