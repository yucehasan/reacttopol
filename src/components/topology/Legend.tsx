import React from "react"

export const Legend = (): React.ReactElement => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        left: "10px",
        backgroundColor: "white",
        border: "1px solid black",
        padding: "4px 8px 4px 8px",
      }}
    >
      Click on node to expand/collapse
      <br />
      Hover on node to display details
      <br />
      Click on canvas to hide details
    </div>
  )
}
