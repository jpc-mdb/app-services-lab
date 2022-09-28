import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios';

export const ProjectCard = () => {
    const [project, setProject] = useState('');
    const [href, setLink] = useState('');

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
                setLink(response.data.results[0].links[0].href);
                setProject(response.data.results[0]);
            })
        }

        if(project == ''){
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
                            <div className="h6 mb-0 text-gray-800">
                                <a href={ href } target="_bank">
                                    <div className="open-new-window"></div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}