import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios';
import { APP_ID } from '../../constants';

export const ClustersCard = ({project_id, public_key, private_key}) => {
    const [clusters, setClusters] = useState([]);
    const [expandIcon, setExpandIcon] = useState('fas fa-fw fa-arrow-down');

    useEffect(() => {
        async function getClusters(){
            const instance = axios.create({
                baseURL: 'https://data.mongodb-api.com/app/' + APP_ID + '/endpoint'
            });

            await instance.get('/clusters?project_id=' + project_id + '&public_key=' + public_key + '&private_key=' + private_key)
            .catch(function(error) {
                console.log(error)
            })
            .then(response => {
                setClusters(response.data.results);
            })
        }

        if(clusters == ''){
            getClusters();
        }
    })

    function toggleExpandIcon(){
        if(expandIcon === 'fas fa-fw fa-arrow-down') {
            setExpandIcon('fas fa-fw fa-arrow-up');
        }
        else {
            setExpandIcon('fas fa-fw fa-arrow-down');
        }
    }

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
                                    {console.log(cluster)}
                                    <ul className="navbar-nav accordion" id="accordionSidebar">
                                    <li className="nav-item" key={cluster.id}>
                                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                                                aria-expanded="true" aria-controls="collapsePages" onClick={toggleExpandIcon}>
                                                <i className="fas fa-fw fa-database"></i>
                                                <span> { cluster.name }</span>
                                                <i className={expandIcon}></i>
                                            </a>
                                            <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                                                <div className="bg-white py-2 collapse-inner rounded">
                                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                        Details
                                                    </div>
                                                    <span className="collapse-item">Cluster State: { cluster.stateName }</span>
                                                    <br />
                                                    <span className="collapse-item">Paused: { cluster.paused ? 'true' : 'false' }</span>
                                                    <br />
                                                    <span className="collapse-item">Cluster Type: { cluster.clusterType }</span>
                                                    <br />
                                                    <span className="collapse-item"># Replicas: { cluster.replicationFactor }</span>
                                                    <br />
                                                    <span className="collapse-item"># Shards: { cluster.numShards }</span>
                                                    <div className="collapse-divider"></div>
                                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1 mt-2">
                                                        Features
                                                    </div>
                                                    <span className="collapse-item">Backup: { cluster.backupEnabled ? 'true' : 'false' }</span>
                                                    <br />
                                                    <span className="collapse-item">Auto Scaling: { cluster.autoScaling.compute.enabled ? 'true' : 'false' }</span>
                                                    <br />
                                                    <span className="collapse-item">BI Connector: { cluster.biConnector.enabled ? 'true' : 'false' }</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
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