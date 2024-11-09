import React from "react";
// import { useParams } from "react-router-dom";

const page = () => {
    // const { name } = useParams();

    return (
        <div className="sketchfab-embed-wrapper">
            {" "}
            <iframe
                title="jf 17 thunder with animation"
                frameBorder="0"
                allowFullScreen
                // mozAllowFullScreen="true"
                // webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                width="1920"
                height="1080"
                src="https://sketchfab.com/models/842fda0a67d94b75a5f89a4094ba215b/embed"
            >
                {" "}
            </iframe>{" "}
            <p>
                {" "}
                <a
                    href="https://sketchfab.com/3d-models/jf-17-thunder-with-animation-842fda0a67d94b75a5f89a4094ba215b?utm_medium=embed&utm_campaign=share-popup&utm_content=842fda0a67d94b75a5f89a4094ba215b"
                    target="_blank"
                    rel="nofollow"
                >
                    {" "}
                    jf 17 thunder with animation{" "}
                </a>{" "}
                by{" "}
                <a
                    href="https://sketchfab.com/hassanafridi3376?utm_medium=embed&utm_campaign=share-popup&utm_content=842fda0a67d94b75a5f89a4094ba215b"
                    target="_blank"
                    rel="nofollow"
                >
                    {" "}
                    hassanafridi3376{" "}
                </a>{" "}
                on{" "}
                <a
                    href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=842fda0a67d94b75a5f89a4094ba215b"
                    target="_blank"
                    rel="nofollow"
                >
                    Sketchfab
                </a>
            </p>
        </div>
    );
};

export default page;
