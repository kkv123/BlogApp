import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import { useEffect, useState } from "react";
import { login } from "./store/authSlice";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import './index.css'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const authData = authService.getAccount()
      .then((userData) => {
        // console.log("userData " + userData)
        if (userData) {
          // console.log("userData true " + userData)
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])
  // console.log("loading " + loading);
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400 text-bold'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App

