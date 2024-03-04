import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const UserContext = createContext({})
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  const [showCheckPopup, setShowCheckPopup] = useState(false)
  const [showLogPopup, setShowLogPopup] = useState(false)
  const [showDelPopup, setShowDelPopup] = useState(false)
  const [toDoCards, setToDoCards] = useState([])
  const [backlogCards, setBacklogCards] = useState([])
  const [inProgress, setInProgress] = useState([])
  const [check, setCheck] = useState([])
  const [doneCards, setDoneCards] = useState([])
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState("")
  const [duedate, setDuedate] = useState(null)
  const [inputs, setInputs] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [openDropdownId, setOpenDropdownId] = useState([])
  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data)
        setReady(true)
      })
    }
  }, [])

  useEffect(() => {
    axios.get("/cards").then(({ data }) => {
      setCheck(data)
      setToDoCards(data.filter((card) => card.status === "To Do"))
      setBacklogCards(data.filter((card) => card.status === "BACKLOG"))
      setInProgress(data.filter((card) => card.status === "PROGRESS"))
      setDoneCards(data.filter((card) => card.status === "DONE"))
    })
  }, [check.length])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        ready,
        showCheckPopup,
        setShowCheckPopup,
        showLogPopup,
        setShowLogPopup,
        check,
        showDelPopup,
        setShowDelPopup,

        toDoCards,
        setToDoCards,
        backlogCards,
        setBacklogCards,
        inProgress,
        setInProgress,
        doneCards,
        setDoneCards,
        setTitle,
        setPriority,
        setDuedate,
        setInputs,
        title,
        priority,
        duedate,
        inputs,
        selectedId,
        setSelectedId,
        openDropdownId,
        setOpenDropdownId
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
//Note: useEffect doesn't allow async await so use .then()
