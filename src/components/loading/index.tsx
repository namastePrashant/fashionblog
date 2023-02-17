import React from "react";

interface LoadingComponentInterface {}

const LoadingComponent: React.FC<LoadingComponentInterface> = () => {
    return (
        <div className="load-more-component">
            <div className="load-more-component__loader"></div>
        </div>
    );
};

export default LoadingComponent;
