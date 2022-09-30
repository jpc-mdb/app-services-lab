import React from "react";
import { useState } from 'react';
import { Nav } from "../../components/Nav/Nav";
import { LeftNav } from "../../components/Nav/LeftNav";
import { PageName } from "../../components/Pages/PageName";
import { Footer } from "../../components/Footer/Footer";
import { BackToTop } from "../../components/Nav/BackToTop";
import { ProjectCard } from "../../components/Content/Project";
import { ClustersCard } from "../../components/Content/Clusters";

export const Home = () => {
    const [project_id, setProjectId] = useState('');
    const queryParams = new URLSearchParams(window.location.search);
    const public_key = queryParams.get('public_key');
    const private_key = queryParams.get('private_key');

    return (
        <>
        <div id="wrapper">
            <LeftNav />

            <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">
                    <Nav 
                        public_key={ public_key }
                        private_key={ private_key } />

                    <div className="container-fluid">
                        <PageName pageName="Dashboard" />

                        <div className="row">
                            { public_key != null && private_key != null ?
                                <ProjectCard 
                                    project_id={ val => setProjectId(val) }
                                    public_key={ public_key }
                                    private_key={ private_key } />
                                : 
                                <div>                                    
                                    <h2 className="ml-3">
                                        <i className="fas fa-fw fa-arrow-up"></i>
                                        Please enter your credentials in the header above
                                        <i className="fas fa-fw fa-arrow-up"></i>
                                    </h2>
                                </div>
                            }

                            { project_id != '' ? <ClustersCard project_id={ project_id } /> : <div></div> }
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>

        <BackToTop />
        </>
    )
}