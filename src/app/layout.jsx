import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./footer.jsx";

export default function Layout() {
  return (
    <div className="relative min-h-screen flex flex-col text-gray-900 dark:text-gray-100 transition-colors">

     
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-90 dark:opacity-80"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-[2px]" />

      
      <div className="relative  flex flex-col  w-full">

        <Navbar />

        
        <main className="flex-grow mx-auto max-w-6xl px-4 py-10 w-full">
          <div className="animate-fadeIn rounded-2xl bg-white/80 dark:bg-gray-900/80 
            shadow-md border border-gray-200 dark:border-gray-700 
            backdrop-blur-xl p-6 sm:p-10 transition-colors">
            <Outlet />
          </div>
        </main>

        <Footer />

      </div>
    </div>
  );
}
