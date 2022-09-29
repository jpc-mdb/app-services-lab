import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";


export const Nav = () => {
    const [project, setProject] = useState('');

    useEffect(() => {
        async function getProject(){
            const instance = axios.create({
                baseURL: 'https://data.mongodb-api.com/app/appserviceslab-ysgfj/endpoint'
            });

            await instance.get('/projects')
            .catch(function(error) {
                console.log(error)
            })
            .then(response => {
                setProject(response.data.results[0]);
            })
        }

        if(project == ''){
            getProject();
        }
    })

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block"></div>

                <li className="nav-item dropdown no-arrow">
                    <Link className="nav-link dropdown-toggle" to="/" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{ project.name }</span>
                        <img className="img-profile rounded-circle"
                            src="img/undraw_rocket.svg" />
                    </Link>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <Link className="dropdown-item" to="/">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile
                        </Link>
                        <Link className="dropdown-item" to="/">
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            Settings
                        </Link>
                        <Link className="dropdown-item" to="/">
                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                            Activity Log
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/" data-toggle="modal" data-target="#logoutModal">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </Link>
                    </div>
                </li>

            </ul>

        </nav>
    );
}