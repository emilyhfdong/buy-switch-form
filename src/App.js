import React from "react"
import "./App.css"
import { SignUp } from "./pages/signup"
import { Unsubscribe } from "./pages/unsubscribe"

const getURLParams = () =>
  window.location.search
    ? JSON.parse(
        '{"' +
          decodeURI(window.location.search.substring(1))
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}'
      )
    : null

const App = () => {
  console.log(getURLParams())
  const URLParams = getURLParams()
  return URLParams && URLParams.email ? <Unsubscribe /> : <SignUp />
}

export default App
