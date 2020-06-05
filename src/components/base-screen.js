import React from "react"
import tomNook from "./tom-nook.png"

export const BaseScreen = ({ children, title }) => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="form-container">
          <h1>{title}</h1>
          {children}
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
