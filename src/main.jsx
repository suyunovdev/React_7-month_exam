import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StateProvider } from "./utils/StateProvider.jsx";
import reducer, { initialState } from "./utils/reducer.js";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
    <BrowserRouter />
  </StateProvider>
);
