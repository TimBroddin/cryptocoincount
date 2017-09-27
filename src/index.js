import React from "react";
import { hydrate } from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

hydrate(<App />, document.getElementById("root"));
registerServiceWorker();
