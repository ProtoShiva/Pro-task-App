import { useContext, useEffect, useState } from "react"
import Board from "../components/Board/Board"
import Styles from "./Dashboard.module.css"
import { IoIosArrowDown } from "react-icons/io"
import { UserContext } from "../context/UserContext"
import { format } from "date-fns"
import axios from "axios"
const Dashboard = () => {
  const {
    toDoCards,
    backlogCards,
    inProgress,
    doneCards,
    check,
    user,
    setToDoCards,
    setBacklogCards,
    setInProgress,
    setDoneCards
  } = useContext(UserContext)
  const cardId = user?._id
  const [datePopup, setDatePopup] = useState(false)
  const date = new Date()
  const formattedDate = format(date, "do MMM yyyy")

  const sortCards = async (event) => {
    let filter
    const today = new Date()
    if (event.target.innerText === "Today") {
      filter = {
        createdAt: {
          $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate())
        }
      }
    } else if (event.target.innerText === "This Week") {
      const firstDayOfWeek = today.getDate() - today.getDay()
      filter = {
        createdAt: {
          $gte: new Date(today.getFullYear(), today.getMonth(), firstDayOfWeek)
        }
      }
    } else if (event.target.innerText === "This Month") {
      filter = {
        createdAt: {
          $gte: new Date(today.getFullYear(), today.getMonth(), 1)
        }
      }
    }

    const response = await axios.get(`/sortedcard/${cardId}`, {
      filter
    })

    console.log(response)

    // setToDoCards(response.data),
    //   setBacklogCards(response.data),
    //   setInProgress(response.data),
    //   setDoneCards(response.data)
  }

  return (
    <>
      <div className={Styles.container}>
        <nav>
          <h1>Welcome! {!!user && user.name}</h1>
          <p>{formattedDate}</p>
        </nav>
        <div className={Styles.title}>
          <h2>Board</h2>
          <div className={Styles.title_left}>
            <p>This week</p>
            <IoIosArrowDown onClick={() => setDatePopup(!datePopup)} />
            {datePopup && (
              <div className={Styles.popup_inner}>
                <p onClick={sortCards}>Today</p>
                <p onClick={sortCards}>This Week</p>
                <p onClick={sortCards}>This Month</p>
              </div>
            )}
          </div>
        </div>
        <div className={Styles.outer_boards}>
          <div className={Styles.boards}>
            <Board name="Backlog" />
            <Board name="To do" />
            <Board name="In Progress" />
            <Board name="Done" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
