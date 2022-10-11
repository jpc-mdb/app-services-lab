import React from "react";
import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./context/User.context";
import { LeftNav } from "../../components/Nav/LeftNav";
import { Nav } from "../../components/Nav/Nav";
import { PageName } from "../../components/Pages/PageName";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // We are consuming our user-management context to
    // get & set the user details here
    const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

    // We are using React's "useState" hook to keep track
    //  of the form values.
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    // This function will be called whenever the user edits the form.
    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    // This function will redirect the user to the
    // appropriate page once the authentication is done.
    const redirectNow = () => {
        const redirectTo = location.search.replace("?redirectTo=", "");
        navigate(redirectTo ? redirectTo : "/");
    }

    // Once a user logs in to our app, we don’t want to ask them for their
    // credentials again every time the user refreshes or revisits our app, 
    // so we are checking if the user is already logged in and
    // if so we are redirecting the user to the home page.
    // Otherwise we will do nothing and let the user to login.
    const loadUser = async () => {
        if (!user) {
            const fetchedUser = await fetchUser();
            if (fetchedUser) {
                // Redirecting them once fetched.
                redirectNow();
            }
        }
    }

    // This useEffect will run only once when the component is mounted.
    // Hence this is helping us in verifying whether the user is already logged in
    // or not.
    useEffect(() => {
        loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // This function gets fired when the user clicks on the "Login" button.
    const onSubmit = async (event) => {
        try {
            // Here we are passing user details to our emailPasswordLogin
            // function that we imported from our realm/authentication.js
            // to validate the user credentials and log in the user into our App.
            const user = await emailPasswordLogin(form.email, form.password);
            if (user) {
                redirectNow();
            }
        } catch (error) {
            if (error.statusCode === 401) {
                alert("Invalid username/password. Try again!");
            } else {
                alert(error);
            }
        }
    };

    return (
        <>
            <div id="wrapper">
                <LeftNav />

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">
                        <Nav />

                        <div className="container-fluid">
                            <PageName pageName="Login" />

                            <form className="user w3-wide">
                                <div className="form-group">
                                    <input 
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        name="email"
                                        value={form.email}
                                        onChange={onFormInputChange}
                                        className="form-control bg-light border-1 large" 
                                        placeholder="Email" 
                                        aria-label="Email" 
                                        aria-describedby="basic-addon2" />
                                </div>
                                <div className="form-group">
                                    <input 
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        name="password"
                                        value={form.password}
                                        onChange={onFormInputChange}
                                        className="form-control bg-light border-1 large" 
                                        placeholder="Password" 
                                        aria-label="Password" 
                                        aria-describedby="basic-addon2" />
                                </div>
                                <div className="form-group">
                                    <div className="input-group-append">
                                        <a 
                                            href="#"
                                            className="btn btn-primary btn-user btn-block"
                                            onClick={onSubmit}>
                                            Login
                                        </a>
                                    </div>
                                </div>
                                <p>Don't have an account? <Link to="/signup">Signup</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;