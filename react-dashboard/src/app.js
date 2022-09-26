import React, { Component }  from 'react';
import './app.css';
import { Home } from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function app() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/index.html" element={<Home />} />
            </Routes>
        </Router>
    );
}