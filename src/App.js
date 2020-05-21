import React, { useState } from "react"
import tomNook from "./tom-nook.png"
import "./App.css"
import axios from "axios"

const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i

const App = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [hasError, setHasError] = useState(false)
  const emailIsValid = re.test(email)
  const submit = async () => {
    if (emailIsValid) {
      setIsLoading(true)
      setHasError(false)
      try {
        await axios.post(
          "https://buy-switch-scrapper.herokuapp.com/emails",
          { email },
          { headers: { "Content-Type": "application/json" } }
        )
        setIsDone(true)
      } catch (e) {
        console.log("error", e)
        setHasError(true)
      }
      setIsLoading(false)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="form-container">
          {isDone ? (
            <>
              <h1>THANKS FOR SIGNING UP</h1>
            </>
          ) : (
            <>
              <h1>SIGN UP FOR EMAILS</h1>
              <div className="input-container">
                <input
                  value={email}
                  onChange={(event) => {
                    setHasError(false)
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
              {hasError && <p>oh no! something went wrong! please try again</p>}
            </>
          )}
        </div>
      </header>
      <img src={tomNook} className="tom-nook" />
      <div className="wave-container">
        <div className="wave"></div>
        <div className="wave-bottom"></div>
      </div>
    </div>
  )
}

export default App
