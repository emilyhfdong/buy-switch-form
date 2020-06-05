import React, { useState } from "react"
import axios from "axios"
import { BaseScreen } from "../components/base-screen"

const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

export const SignUp = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const emailIsValid = re.test(email)
  const submit = async () => {
    if (emailIsValid) {
      setIsLoading(true)
      setErrorMessage("")
      try {
        await axios.post(
          process.env.REACT_APP_EMAIL_URL,
          { email },
          { headers: { "Content-Type": "application/json" } }
        )
        setIsDone(true)
      } catch (e) {
        if (e.isAxiosError && e.response?.data === "email already exists") {
          setErrorMessage("You're already on the list!")
        } else {
          setErrorMessage("oh no! something went wrong! please try again")
        }
      }
      setIsLoading(false)
    }
  }
  return (
    <BaseScreen title={isDone ? "THANKS FOR SIGNING UP" : "SIGN UP FOR EMAILS"}>
      {!isDone && (
        <>
          <div className="input-container">
            <input
              value={email}
              onChange={(event) => {
                setErrorMessage("")
                setEmail(event.target.value)
              }}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  submit()
                }
              }}
            />
            <button
              onClick={submit}
              className={isLoading || !emailIsValid ? "loading-button" : ""}
            >
              ENTER
            </button>
          </div>
          <p>{errorMessage}</p>
        </>
      )}
    </BaseScreen>
  )
}
