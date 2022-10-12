import React from "react";

export const PageName = ({pageName}) => {
    return (
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">{pageName}</h1>
        </div>
    );
}