import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios';

export const ClustersCard = ({project_id}) => {
    const [clusters, setClusters] = useState([]);
    // const [href, setLink] = useState('');

    useEffect(() => {
        async function getClusters(){
            const instance = axios.create({
                baseURL: 'https://data.mongodb-api.com/app/appserviceslab-ysgfj/endpoint'
            });

            await instance.get('/clusters?project_id=' + project_id)
            .catch(function(error) {
                console.log(error)
            })
            .then(response => {
                // setLink(response.data.results[0].links[0].href);
                setClusters(response.data.results);
            })
        }

        if(clusters == ''){
            getClusters();
        }
    })

    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                Clusters in project: { JSON.stringify(project_id) }
                            </div>
                            <hr />
                            {
                                clusters.map(cluster =>
                                    <>
                                    <div key={cluster.id} className="h6 mb-0 text-gray-800">
                                        Name: { cluster.name }
                                        <br />
                                        Status: { cluster.stateName }
                                        <br />
                                        Cluster Type: { cluster.clusterType }
                                    </div>
                                    <hr />
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}