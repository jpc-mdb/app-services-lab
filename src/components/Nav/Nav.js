import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../pages/Auth/context/User.context";

export const Nav = ({public_key, private_key}) => {
    const [project, setProject] = useState('');
    const [pub_key, setPubKey] = useState('');
    const [priv_key, setPrivKey] = useState('');

    const handlePubKeyChange = event => {
        setPubKey(event.target.value);
    }

    const handlePrivKeyChange = event => {
        setPrivKey(event.target.value);
    }

    useEffect(() => {
        async function getProject(){
            const instance = axios.create({
                baseURL: 'https://data.mongodb-api.com/app/appserviceslab-ysgfj/endpoint',
                params: {
                    'public_key': public_key,
                    'private_key': private_key
                }
            });

            await instance.get('/projects')
            .catch(function(error) {
                console.log(error)
            })
            .then(response => {
                setProject(response.data.results[0]);
            })
        }

        if(project === '' && public_key !== null && private_key != null){
            getProject();
        }
    })

    const handleSubmitClick = event => {
        event.preventDefault();
        window.location.assign('/index?public_key=' + pub_key + '&private_key=' + priv_key);
    }

    const { logOutUser } = useContext(UserContext);

    // This function is called when the user clicks the "Logout" button.
    const logOut = async () => {
        try {
            // Calling the logOutUser function from the user context.
            const loggedOut = await logOutUser();
            // Now we will refresh the page, and the user will be logged out and
            // redirected to the login page because of the <PrivateRoute /> component.
            if (loggedOut) {
                window.location.assign('/');
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <form className="d-none d-sm-inline-block form-inline navbar-search">
                <div className="input-group mr-auto ml-md-3 my-2 my-md-0 mw-100">
                    <input 
                        type="text" 
                        name="publicKey" 
                        className="form-control bg-light border-1 small" 
                        placeholder="API Public Key" aria-label="API Public Key" 
                        aria-describedby="basic-addon2"
                        onChange={handlePubKeyChange} />
                    <input 
                        type="password" 
                        name="privateKey" 
                        className="form-control bg-light border-1 small" 
                        placeholder="API Private Key" aria-label="API Private Key" 
                        aria-describedby="basic-addon2"
                        onChange={handlePrivKeyChange} />
                    <div className="input-group-append">
                        <a 
                            href="#"
                            className="btn btn-primary btn-user btn-block"
                            onClick={handleSubmitClick}>
                            Submit
                        </a>
                    </div>
                </div>
            </form>

            <ul className="navbar-nav ml-auto">
            <div className="topbar-divider d-none d-sm-block"></div>

                <li className="nav-item dropdown no-arrow mt-1">
                    <a 
                        href="#"
                        className="btn btn-primary btn-user btn-block"
                        onClick={logOut}>
                        Logout
                    </a>
                </li>
            </ul>

        </nav>
    );
}