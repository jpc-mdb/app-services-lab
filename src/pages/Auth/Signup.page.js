import React from "react";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./context/User.context";
import { LeftNav } from "../../components/Nav/LeftNav";
import { Nav } from "../../components/Nav/Nav";
import { PageName } from "../../components/Pages/PageName";

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // As explained in the Login page.
    const { emailPasswordSignup } = useContext(UserContext);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    // As explained in the Login page.
    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };


    // As explained in the Login page.
    const redirectNow = () => {
        const redirectTo = location.search.replace("?redirectTo=", "");
        navigate(redirectTo ? redirectTo : "/");
    }

    // As explained in the Login page.
    const onSubmit = async () => {
        try {
            const user = await emailPasswordSignup(form.email, form.password);
            if (user) {
                redirectNow();
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div id="wrapper">
            <LeftNav />

            <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">
                    <Nav />

                    <div className="container-fluid">
                        <PageName pageName="Signup" />

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
                                        Signup
                                    </a>
                                </div>
                            </div>
                            <p>Have an account already? <Link to="/login">Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;