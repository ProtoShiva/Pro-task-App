import Styles from "./SettingsPage.module.css"
import axios from "axios"
import { useState, useContext, useEffect } from "react"
import { MdOutlineLock } from "react-icons/md"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import { FiEyeOff } from "react-icons/fi"
import { FaRegUser } from "react-icons/fa"
import { UserContext } from "../../context/UserContext"

const SettingsPage = () => {
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const { user } = useContext(UserContext)
  const [showPassword, setShowPassword] = useState(true)
  const [showConfirm, setShowConfirm] = useState(true)
  const [newPassword, setNewPassword] = useState("")
  const userId = user?._id
  const handleUpdate = async (event) => {
    event.preventDefault()
    // if (password !== confirmPassword) {
    //   setError("Password need to match")
    //   return
    // }
    const updatedUser = {}
    if (name) updatedUser.name = name
    if (newPassword) updatedUser.password = newPassword

    try {
      const response = await axios.put(`/userchange/${userId}`, updatedUser)

      if (response.status === 200) {
        alert("User updated successfully")
      } else {
        alert("Error updating user")
      }
    } catch (error) {
      console.error("Error updating user", error)
    }
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.form_div}>
        <div className={Styles.formContainer}>
          <h2>Settings</h2>
          <form className={Styles.form} onSubmit={handleUpdate}>
            <div className={Styles.inputField}>
              <FaRegUser className={Styles.icons} />
              <input
                className={Styles.mainInput}
                type="text"
                placeholder={user?.name}
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div className={Styles.inputField}>
              <MdOutlineLock className={Styles.icons} />
              <input
                className={Styles.mainInput}
                type={showPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(ev) => setOldPassword(ev.target.value)}
                placeholder="Old Password"
              />
              {showPassword ? (
                <MdOutlineRemoveRedEye
                  onClick={() => setShowPassword(!showPassword)}
                  className={Styles.passIcons}
                />
              ) : (
                <FiEyeOff
                  onClick={() => setShowPassword(!showPassword)}
                  className={Styles.passIcons}
                />
              )}
            </div>
            <div className={Styles.inputField}>
              <MdOutlineLock className={Styles.icons} />
              <input
                className={Styles.mainInput}
                type={showConfirm ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(ev) => setNewPassword(ev.target.value)}
              />
              {showConfirm ? (
                <MdOutlineRemoveRedEye
                  onClick={() => setShowConfirm(!showConfirm)}
                  className={Styles.passIcons}
                />
              ) : (
                <FiEyeOff
                  onClick={() => setShowConfirm(!showConfirm)}
                  className={Styles.passIcons}
                />
              )}
            </div>
            {/* <p>{error}</p> */}
            <button id={Styles.regBtn}>Update</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
