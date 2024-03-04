import { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"
import Styles from "./Logout.module.css"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
const Logout = () => {
  const {
    showLogPopup,
    setShowLogPopup,
    setDoneCards,
    setToDoCards,
    setInProgress,
    setBacklogCards
  } = useContext(UserContext)
  const navigate = useNavigate()

  const logout = () => {
    setShowLogPopup(false)
    axios
      .post("/logout")
      .then(() => {
        setToDoCards([])
        setBacklogCards([])
        setInProgress([])
        setDoneCards([])
        navigate("/")
      })
      .catch((error) => {
        toast.error("error loggin out")
        console.log(error)
      })
  }
  if (!showLogPopup) {
    return null
  }

  return (
    <div className={Styles.main}>
      <div className={Styles.popup_inner}>
        <p>Are you sure you want to Logout?</p>
        <div>
          <p id={Styles.logout} onClick={logout}>
            Yes, Logout
          </p>
          <p id={Styles.cancel} onClick={() => setShowLogPopup(false)}>
            Cancel
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Logout
