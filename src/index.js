import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./Home";
import Checkout from "./Checkout";
import Business from './Business';
import Checklist from './Checklist';

export default function App(props) {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Business/>}/>
          <Route path="checkout" element={<Checkout />} />
          <Route path="checklist" element={<Checklist />} />
        </Routes>
      </BrowserRouter>
    );
}


//=============================================================
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);