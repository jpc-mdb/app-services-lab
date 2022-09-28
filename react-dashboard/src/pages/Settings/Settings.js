import React from "react";
import { Nav } from "../../components/Nav/Nav";
import { LeftNav } from "../../components/Nav/LeftNav";
import { Footer } from "../../components/Footer/Footer";
import { LogoutModal } from "../../components/Authentication/LogoutModal";
import { BackToTop } from "../../components/Nav/BackToTop";
import { PageName } from "../../components/Pages/PageName";
import { ProjectCard } from "../../components/Content/Project";
import { AtlasRestApi } from "../../api/AtlasRestApi";

export const Settings = () => {
    return (
        <>
        <div id="wrapper">

            <LeftNav />

            <div id="content-wrapper" className="d-flex flex-column">

                <div id="content">

                    <Nav />

                    <div className="container-fluid">

                        <PageName pageName="Settings" />

                        <div className="row">
                            <ProjectCard />
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