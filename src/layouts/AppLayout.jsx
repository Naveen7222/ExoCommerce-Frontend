// src/layouts/AppLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Loading from "../components/ui/Loading";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black text-slate-200">
      <Loading /> {/* Global Loader */}
      <Navbar />

      {/* Main page content */}
      <main className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
