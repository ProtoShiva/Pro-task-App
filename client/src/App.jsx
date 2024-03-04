import React from "react"
import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import axios from "axios"
import Dashboard from "./pages/Dashboard"
import AnalyticsPage from "./pages/AnalyticsPage/AnalyticsPage"
import SettingsPage from "./pages/SettingsPage/SettingsPage"
import { UserContextProvider } from "./context/UserContext"
import Layout from "./layout/Layout.jsx"
import SharePage from "./pages/SharePage/SharePage.jsx"
axios.defaults.baseURL = "http://localhost:3000/api"
axios.defaults.withCredentials = true
const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/" element={<Dashboard />} />
          <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/info" element={<SharePage />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
