import React from 'react';
import './app.css';
import { UserProvider } from './pages/Auth/context/User.context';
import { Home } from './pages/Home/Home';
import Login from './pages/Auth/Login.page';
import PrivateRoute from './pages/Auth/PrivateRoute.page';
import Signup from './pages/Auth/Signup.page';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

export default function app() {
    return (
        <BrowserRouter>
            {/* We are wrapping our whole app with UserProvider so that */}
            {/* our user is accessible through out the app from any page*/}
            <UserProvider>
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                    {/* We are protecting our Home Page from unauthenticated */}
                    {/* users by wrapping it with PrivateRoute here. */}
                    <Route element={<PrivateRoute />}>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/index.html" element={<Home />} />
                        <Route path="/index" element={<Home />} />
                    </Route>
                </Routes>
            </UserProvider>
        </BrowserRouter>

        // Switch to the below to run the website without login
        // <Router>
        //     <Routes>
        //         <Route exact path="/" element={<Home />} />
        //         <Route path="/index.html" element={<Home />} />
        //         <Route path="/index" element={<Home />} />
        //     </Routes>
        // </Router>
    );
}