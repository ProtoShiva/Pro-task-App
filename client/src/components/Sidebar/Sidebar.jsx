import React, { useContext, useState } from "react"
import { Link, Navigate, useLocation, useParams } from "react-router-dom"
import { VscWindow } from "react-icons/vsc"
import { LuDatabase } from "react-icons/lu"
import { IoSettingsOutline } from "react-icons/io5"
import { FiCodesandbox } from "react-icons/fi"
import Styles from "./Sidebar.module.css"
import { MdOutlineLogout } from "react-icons/md"
import { UserContext } from "../../context/UserContext"
import Logout from "../Logout/Logout"
const Sidebar = () => {
  const { setShowLogPopup } = useContext(UserContext)
  let location = useLocation()
  let subpage = location.pathname

  const LinkClasses = (type) => {
    if (type === subpage) {
      return Styles.sidebar_bg
    }
  }
  return (
    <div className={Styles.container}>
      <div className={Styles.inner_box}>
        <Link to={"/dashboard"}>
          <p className={Styles.sidebar_logo}>
            <FiCodesandbox className={Styles.logo} />
            Pro Manage
          </p>
        </Link>
        <ul className={Styles.sideicons}>
          <Link
            className={`${LinkClasses("/dashboard")} ${Styles.sideLeft}`}
            to={"/dashboard"}
          >
            <VscWindow className={Styles.logo} />
            Board
          </Link>
          <Link
            className={`${LinkClasses("/dashboard/analytics")} ${
              Styles.sideLeft
            }`}
            to={"/dashboard/analytics"}
          >
            <LuDatabase className={Styles.logo} />
            Analytics
          </Link>
          <Link
            className={`${LinkClasses("/dashboard/settings")} ${
              Styles.sideLeft
            }`}
            to={"/dashboard/settings"}
          >
            <IoSettingsOutline className={Styles.logo} />
            Settings
          </Link>
        </ul>
      </div>
      <div className={Styles.logout}>
        <MdOutlineLogout className={Styles.logo} />
        <span onClick={() => setShowLogPopup(true)}>Log out</span>
      </div>
      <Logout />
    </div>
  )
}

export default Sidebar
