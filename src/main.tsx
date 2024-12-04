import React from "react";
import ReactDOM from "react-dom/client";
import ShoppingList from "./ShoppingList";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ShoppingList />
  </React.StrictMode>
);
