import React from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar/Sidebar"
import Styles from "./Layout.module.css"
const Layout = () => {
  return (
    <div className={Styles.sidebar_tab}>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Layout
