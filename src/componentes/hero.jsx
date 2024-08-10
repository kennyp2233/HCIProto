import React from "react";
function Hero({ children }) {
    return (
        <div className="hero bg-base-200 min-h-screen items-start">
            <div className="hero-content text-center w-full">
                {children}
            </div>
        </div>

    );

}

export default Hero;