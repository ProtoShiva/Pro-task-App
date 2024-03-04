import React, { useContext, useEffect, useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md"
import Styles from "./Card.module.css"
import { UserContext } from "../../context/UserContext"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"
import { format, parseISO, isPast } from "date-fns"
import DeletePopup from "../DeletePopup/DeletePopup"
import TodoPopUp from "../TodoPopUp/TodoPopUp"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Card = ({ card }) => {
  const [showPopup, setShowPopup] = useState(false)
  const navigate = useNavigate()
  const {
    setToDoCards,
    setShowCheckPopup,
    setShowDelPopup,
    setBacklogCards,
    setInProgress,
    setDoneCards,
    setTitle,
    setDuedate,
    setPriority,
    setInputs,
    setSelectedId,
    openDropdownId,
    setOpenDropdownId,
    doneCards,
    user,
    title,
    priority,
    duedate,
    inputs
  } = useContext(UserContext)

  const toggleDropdown = (id) => {
    if (openDropdownId.includes(id)) {
      setOpenDropdownId(openDropdownId.filter((openId) => openId !== id))
    } else {
      setOpenDropdownId([...openDropdownId, id])
    }
  }

  const togglePopup = (id) => {
    setShowPopup((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const updateCardStatus = async (card, newStatus) => {
    await axios.put(`/status/${card}`, { status: newStatus }).then(() => {
      fetchCards()
    })
  }

  const fetchCards = () => {
    axios.get("/cards").then(({ data }) => {
      setToDoCards(data.filter((card) => card.status === "To Do"))
      setBacklogCards(data.filter((card) => card.status === "BACKLOG"))
      setInProgress(data.filter((card) => card.status === "PROGRESS"))
      setDoneCards(data.filter((card) => card.status === "DONE"))
    })
  }
  const handleDelete = async (id) => {
    togglePopup(id)
    setShowDelPopup(true)
    await axios.delete(`/user_cards/${id}`)
  }

  const handleUpdate = async (id) => {
    setSelectedId(id)
    const response = await axios.get(`/cards/${id}`)
    const cardData = response.data

    setTitle(cardData.title)
    setPriority(cardData.priority)
    setDuedate(cardData.duedate)
    setInputs(cardData.inputs)

    togglePopup(id)
    setShowCheckPopup(true)
  }

  const handleShare = async (id) => {
    togglePopup(id)
    navigate("/info")
    const response = await axios.get(`/cards/${id}`)
    const cardData = response.data

    setTitle(cardData.title)
    setPriority(cardData.priority)
    setDuedate(cardData.duedate)
    setInputs(cardData.inputs)
  }

  const handleCss = (p) => {
    switch (p) {
      case "HIGH PRIORITY":
        return Styles.highPriority
      case "MODERATE PRIORITY":
        return Styles.mediumPriority
      case "LOW PRIORITY":
        return Styles.lowPriority
      default:
        return {}
    }
  }

  const calcLen = (c) => {
    return c.inputs.filter((i) => {
      return i.checked === true
    })
  }
  return (
    <div>
      {card.length > 0 &&
        card.map((c) => (
          <div className={Styles.card} key={uuidv4()}>
            <div className={Styles.card_top}>
              <div className={Styles.card_lables}>
                <div id={Styles.prior}>
                  {" "}
                  <span className={handleCss(c.priority)}>&bull;</span>
                  <p>{c.priority}</p>
                </div>
                <div className={Styles.threeDot}>
                  <BsThreeDots onClick={() => togglePopup(c._id)} />
                </div>
              </div>
              {showPopup[c._id] && (
                <div className={Styles.popup_inner}>
                  <p onClick={() => handleUpdate(c._id)}>Edit</p>
                  <p onClick={() => handleShare(c._id)}>Share</p>
                  <p className={Styles.del} onClick={() => handleDelete(c._id)}>
                    Delete
                  </p>
                </div>
              )}
            </div>
            <DeletePopup cardId={c._id} />
            <div className={Styles.card_title}>{c.title}</div>
            <div>
              <button
                className={Styles.dropdown}
                onClick={() => toggleDropdown(c._id)}
              >
                Checklist {calcLen(c).length}/{c.inputs.length}){" "}
                <span id={Styles.arrow}>
                  {openDropdownId.includes(c._id) ? (
                    <MdKeyboardArrowUp />
                  ) : (
                    <MdKeyboardArrowDown />
                  )}
                </span>
              </button>
              {openDropdownId.includes(c._id) && (
                <ul className={Styles.dropdownItems}>
                  {c.inputs.map((item) => (
                    <div key={uuidv4()} className={Styles.items}>
                      <input
                        type="checkbox"
                        checked={item.checked}
                        className={Styles.checkbox}
                      />
                      {item.value}
                    </div>
                  ))}
                </ul>
              )}
            </div>

            <TodoPopUp />
            <div className={Styles.card_footer}>
              {" "}
              <div
                className={`${Styles.date} ${
                  typeof c?.duedate === "string" && isPast(parseISO(c?.duedate))
                    ? Styles.overdue
                    : ""
                } ${c.status === "DONE" ? Styles.doneCol : ""}`}
              >
                {typeof c?.duedate === "string"
                  ? format(parseISO(c?.duedate), "MMM do")
                  : ""}
              </div>
              <div className={Styles.card_tab}>
                <div onClick={() => updateCardStatus(c._id, "BACKLOG")}>
                  BACKLOG
                </div>
                <div onClick={() => updateCardStatus(c._id, "PROGRESS")}>
                  PROGRESS
                </div>
                <div onClick={() => updateCardStatus(c._id, "DONE")}>DONE</div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Card
