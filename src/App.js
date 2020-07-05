import React from 'react';
import './App.css';
import MyRoute from "./main";
import {HashRouter, BrowserRouter} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <MyRoute/>
            </BrowserRouter>
        </div>
    );
}

export default App;
