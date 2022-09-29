import React from "react";
import { useState } from 'react';
import { Nav } from "../../components/Nav/Nav";
import { LeftNav } from "../../components/Nav/LeftNav";
import { PageName } from "../../components/Pages/PageName";
import { Footer } from "../../components/Footer/Footer";
import { LogoutModal } from "../../components/Authentication/LogoutModal";
import { BackToTop } from "../../components/Nav/BackToTop";
import { ProjectCard } from "../../components/Content/Project";
import { ClustersCard } from "../../components/Content/Clusters";

export const Home = () => {
    const [project_id, setProjectId] = useState('');

    return (
        <>
        <div id="wrapper">
            <LeftNav />

            <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">
                    <Nav />

                    <div className="container-fluid">
                        <PageName pageName="Dashboard" />

                        <div className="row">
                            <ProjectCard project_id={ val => setProjectId(val) } />

                            { project_id != '' ? <ClustersCard project_id={ project_id } /> : <div></div> }
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>

        <BackToTop />

        <LogoutModal />
        </>
    )
}