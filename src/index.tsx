import React from "react"
import ReactDOM from "react-dom/client"
import Header from "./components/header"
import Topology from "./components/topology"

const top = document.getElementsByClassName("topology")
Array.from(top).every((el) => {
  if (el.innerHTML === "") {
    const root = ReactDOM.createRoot(el)

    root.render(
      <React.StrictMode>
        <Header />
        <Topology />
      </React.StrictMode>
    )

    return false
  }
  return true
})
