import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./store/cart/cardReducer.jsx";
import { BrowserRouter } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";


const store = configureStore({
  reducer: {
    cartStore: cartReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
