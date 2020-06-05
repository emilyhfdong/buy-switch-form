import React, { useState } from "react"
import { BaseScreen } from "../components/base-screen"
import axios from "axios"

export const Unsubscribe = ({ email }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isDone, setIsDone] = useState(false)
  const submit = async () => {
    setIsLoading(true)
    setErrorMessage("")
    try {
      await axios.delete(
        process.env.REACT_APP_EMAIL_URL,
        { data: { email: "emilyhfdong@gmail.com" } },
        { headers: { "Content-Type": "application/json" } }
      )
      setIsDone(true)
    } catch (e) {
      setErrorMessage("oh no! something went wrong! please try again")
    }
    setIsLoading(false)
  }
  return (
    <BaseScreen title={isDone ? "YOU'RE OFF THE LIST :(" : "UNSUBSCRIBE?"}>
      {!isDone && (
        <>
          <div style={{ display: "flex" }}>
            <button
              onClick={submit}
              className={isLoading ? "loading-button" : ""}
            >
              YES
            </button>
            <button
              onClick={submit}
              className={isLoading ? "loading-button secondary" : "secondary"}
            >
              NO
            </button>
          </div>
          <p>{errorMessage}</p>
        </>
      )}
    </BaseScreen>
  )
}
