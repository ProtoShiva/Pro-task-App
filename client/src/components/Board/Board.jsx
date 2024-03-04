import Styles from "./Board.module.css"
import { FaPlus } from "react-icons/fa"
import { BiWindows } from "react-icons/bi"
import Card from "../Card/Card"
import TodoPopUp from "../TodoPopUp/TodoPopUp"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"

const Board = ({ name }) => {
  const {
    setShowCheckPopup,
    toDoCards,
    backlogCards,
    inProgress,
    doneCards,
    setOpenDropdownId
  } = useContext(UserContext)

  return (
    <div className={Styles.board}>
      <div className={Styles.top}>
        <p className={Styles.title}>{name}</p>

        {name === "To do" && <FaPlus onClick={() => setShowCheckPopup(true)} />}
        <BiWindows onClick={() => setOpenDropdownId([])} id={Styles.collapse} />
      </div>
      <div className={`${Styles.cards} ${Styles.scroll}`}>
        {name === "To do" && <Card card={toDoCards} />}
        {name === "Backlog" && <Card card={backlogCards} />}
        {name === "In Progress" && <Card card={inProgress} />}
        {name === "Done" && <Card card={doneCards} />}
      </div>

      <TodoPopUp />
    </div>
  )
}

export default Board
