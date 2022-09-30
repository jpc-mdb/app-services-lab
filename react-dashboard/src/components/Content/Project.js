import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios';

export const ProjectCard = ({ project_id, public_key, private_key }) => {
    const [project, setProject] = useState('');
    const [href, setLink] = useState('');

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
                setLink(response.data.results[0].links[0].href);
                setProject(response.data.results[0]);
            })
        }

        if(project == '' && public_key != ''){
            getProject();
        }
    })

    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Project Details for { JSON.stringify(project.name) }
                            </div>
                            <hr />
                            <div className="h6 mb-0 text-gray-800">
                                Org ID: { JSON.stringify(project.orgId) }
                            </div>
                            <hr />
                            <div className="h6 mb-0 text-gray-800">
                                ID: { JSON.stringify(project.id) }
                            </div>
                            <hr />
                            <div className="h6 mb-0 text-gray-800">
                                Created: { JSON.stringify(project.created) }
                            </div>
                            <hr />
                            <div className="h6 mb-0 text-gray-800">
                                # of clusters: { JSON.stringify(project.clusterCount) }
                            </div>
                            <hr />
                            <a href={ href } target="_bank" className="btn btn-primary btn-icon-split btn-lg mt-1">
                                <span className="icon text-white-50">
                                    <i className="fas fa-share"></i>
                                </span>
                                <span className="text">View in Atlas</span>
                            </a>
                            <a href="#" className="btn btn-primary btn-icon-split btn-lg mt-2" onClick={e => project_id(project.id)}>
                                <span className="icon text-white-50">
                                    <i className="fas fa-database"></i>
                                </span>
                                <span className="text">View Clusters</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}