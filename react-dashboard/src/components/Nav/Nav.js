import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

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

    const handleClick = event => {
        public_key = pub_key;
        private_key = priv_key;
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

        if(project == '' && public_key != null && private_key != null){
            console.log('public key: ' + public_key);
            console.log('private key: ' + private_key);
            getProject();
        }
    })

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
                            href={"/index?public_key=" + pub_key + "&private_key=" + priv_key}
                            className="btn btn-primary btn-user btn-block">
                            Submit
                        </a>
                    </div>
                </div>
            </form>

            <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block"></div>

                <li className="nav-item dropdown no-arrow">
                    <Link className="nav-link nav-item" to="/" id="userDropdown" role="button"
                        data-toggle="modal" data-target="#loginModal">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{ project.name }</span>
                        <img className="img-profile rounded-circle"
                            src="img/undraw_rocket.svg" />
                    </Link>
                </li>

            </ul>

        </nav>
    );
}