import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";

const application = <App />;

ReactDOM.hydrate(application, document.getElementById("root"));
