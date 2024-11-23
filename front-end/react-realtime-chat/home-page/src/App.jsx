import React from "react";
import ReactDOM from "react-dom";
import Chat from "chat/Chat";

import "./index.css";

const App = () => (
  <div>
    <div>Welcome to chat room</div>
    <Chat />
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
