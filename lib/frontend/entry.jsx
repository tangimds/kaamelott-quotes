import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";

const application = <App text={"helloMessage"} />;

ReactDOM.hydrate(application, document.getElementById("root"));
