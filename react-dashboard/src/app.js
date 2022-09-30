import React, { Component }  from 'react';
import './app.css';
import { Home } from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Settings } from './pages/Settings/Settings';

export default function app() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/index.html" element={<Home />} />
                <Route path="/index" element={<Home />} />
            </Routes>
        </Router>
    );
}