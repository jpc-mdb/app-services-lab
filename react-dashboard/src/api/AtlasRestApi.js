import { useState, useEffect } from "react";
import React from "react";
import axios from 'axios';

export const AtlasRestApi = ({action}) => {
    const [project, setProject] = useState('');

    useEffect(() => {
        if (action == 'project'){
            async function getProjects(){
                const instance = axios.create({
                    baseURL: 'https://data.mongodb-api.com/app/appserviceslab-ysgfj/endpoint'
                });

                await instance.get('/projects')
                .catch(function(error) {
                console.log(error)
                })
                .then(response => {
                setProject(response.data);
                })
            }

            if(project == ''){
                getProjects();
            }

            return (
                <p>{JSON.stringify(project.results)}</p>
            )
        }
    })

    return null;
}