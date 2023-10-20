import React from "react";

function Header(): React.ReactElement {
  return (
    <div className="header" style={{
        position: "absolute",
        width: "100%",
        height: "70px", 
        backgroundColor: "#2c2c3a",
        zIndex: 9
    }}>
      <h4 style={{ padding: "20px", color: "white", fontSize: "1.5rem", margin: "0", fontWeight: "500", zIndex: "9" }}>Topology</h4>
    </div>
  );
}

export default Header;
