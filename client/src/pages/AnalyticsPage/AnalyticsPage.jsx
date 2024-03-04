import React, { useContext } from "react"
import Styles from "./AnalyticsPage.module.css"
import { UserContext } from "../../context/UserContext"
const AnalyticsPage = () => {
  const { toDoCards, backlogCards, inProgress, doneCards, check } =
    useContext(UserContext)

  return (
    <div className={Styles.container}>
      <h2>Analytics</h2>
      <main className={Styles.reportCard}>
        <section className={Styles.card1}>
          <div>
            <p>
              <span className={Styles.dot}>&bull;</span>Backlog Tasks
            </p>
            <div className={Styles.number}>{backlogCards.length}</div>
          </div>
          <div>
            <p>
              <span className={Styles.dot}>&bull;</span>To-do Tasks
            </p>
            <div className={Styles.number}>{toDoCards.length}</div>
          </div>
          <div>
            <p>
              <span className={Styles.dot}>&bull;</span>In-Progress Tasks
            </p>
            <div className={Styles.number}>{inProgress.length}</div>
          </div>
          <div>
            <p>
              <span className={Styles.dot}>&bull;</span>Completed Tasks
            </p>
            <div className={Styles.number}>{doneCards.length}</div>
          </div>
        </section>
        <section className={Styles.card2}>
          <div>
            <p>
              <span className={Styles.dot}>&bull;</span>Low Priority Tasks
            </p>
            <div className={Styles.number}>
              {check.filter((card) => card.priority === "LOW PRIORITY").length}
            </div>
          </div>
          <div>
            <p>
              <span className={Styles.dot}>&bull;</span>Moderate Tasks
            </p>
            <div className={Styles.number}>
              {" "}
              {
                check.filter((card) => card.priority === "MODERATE PRIORITY")
                  .length
              }
            </div>
          </div>
          <div>
            <p>
              <span className={Styles.dot}>&bull;</span>High Priority Tasks
            </p>
            <div className={Styles.number}>
              {" "}
              {check.filter((card) => card.priority === "HIGH PRIORITY").length}
            </div>
          </div>
          <div>
            <p>
              <span className={Styles.dot}>&bull;</span>Due Date Tasks
            </p>
            <div className={Styles.number}>16</div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AnalyticsPage
