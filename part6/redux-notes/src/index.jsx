import { createRoot } from "react-dom/client";
// import { createStore, combineReducers } from "redux";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store"

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store = {store}>
    <App />
  </Provider>
);