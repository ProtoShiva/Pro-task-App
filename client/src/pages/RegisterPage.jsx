import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Styles from "./Register.module.css"
import { FaRegUser } from "react-icons/fa"
import { MdOutlineMailOutline } from "react-icons/md"
import { MdOutlineLock } from "react-icons/md"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import { FiEyeOff } from "react-icons/fi"
import formImage from "../assets/Art.png"
const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(true)
  const [showConfirm, setShowConfirm] = useState(true)
  const registerUser = async (ev) => {
    ev.preventDefault()
    try {
      if (password !== confirmPassword) {
        setError("Password need to match")
        return
      }
      await axios.post("/register", {
        name,
        email,
        password
      })
      alert("Registration successful. Now you can log in")
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    } catch (e) {
      alert("Registration failed. Please try again later")
    }
  }
  return (
    <div className={Styles.container}>
      <div className={Styles.image_div}>
        <img src={formImage} alt="logo" />
        <h1>Welcome aboard my friend</h1>
        <p>just a couple of clicks and we start</p>
      </div>
      <div className={Styles.form_div}>
        <div className={Styles.formContainer}>
          <h2>Register</h2>
          <form className={Styles.form} onSubmit={registerUser}>
            <div className={Styles.inputField}>
              <FaRegUser className={Styles.icons} />
              <input
                className={Styles.mainInput}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div className={Styles.inputField}>
              <MdOutlineMailOutline className={Styles.icons} />
              <input
                className={Styles.mainInput}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
            <div className={Styles.inputField}>
              <MdOutlineLock className={Styles.icons} />
              <input
                className={Styles.mainInput}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
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
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
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
            <p>{error}</p>
            <button id={Styles.regBtn}>Register</button>
          </form>
          <div className={Styles.bottomInput}>
            <p>Have an account?</p>
            <Link to={"/"} className={Styles.bottom_log}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
