import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./Home";
import Checkout from "./Checkout";


export default function App(props) {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    );
}

//=============================================================
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);