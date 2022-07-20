import React from "react";

// core components
import IndexNavbar from "../components/Navbars/IndexNavbar.js";

// helmet
import { Helmet } from "react-helmet";

// CSS
import "../assets/css/habitify-card.css";

var Spinner = require("react-spinkit");

export default function Habitify() {
    const title = `Chaz's test page`;

    return (
        <>
            <Helmet title={title} defer={false}>
                <title>{title}</title>
                <link rel="icon" href="/favicon.jpg" />
                <meta property="og:title" content={title} />
                <meta property="og:url" content="https://chazkondo.com/test" />
                <meta
                    property="og:image"
                    content="https://chazkondo.com/myfavicon.png"
                />
                {/* <meta
                    property="og:description"
                    content="Chaz's Habitify Stats"
                />
                <meta property="og:site_name" content="Habitify Stats" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={title} />
                <meta
                    name="twitter:description"
                    content="Chaz's Habitify Stats"
                />
                <meta name="twitter:creator" content="@chazkondo" />
                <meta
                    name="twitter:image"
                    content="https://chazkondo.com/myfavicon.png"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
                <link rel="shortcut icon" href="/favicon.jpg" /> */}
            </Helmet>
            <iframe
                width="100%"
                height="166"
                scrolling="no"
                frameborder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&amp;{ ADD YOUR PARAMETERS HERE }"
            />
            <div>Hello world</div>
        </>
    );
}
