import React from "react";
import { Route } from "react-router-dom";

import Settings from "./Components/Setting";
import GameScene from "./Components/GameScene";

function App() {
  return (
    <div
      className="App"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Route exact path="/betPage" component={Settings} />
      <Route path="/gameScene" component={GameScene} />
    </div>
  );
}

export default App;
