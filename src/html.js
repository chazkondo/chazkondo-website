import React from "react";
import PropTypes from "prop-types";
import LoaderSVG from "./images/loader.gif";

export default function HTML(props) {
    return (
        <html {...props.htmlAttributes}>
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                {props.headComponents}
                <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                    integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
                    crossOrigin="anonymous"
                />
                <title>Chaz Kondo - Software Engineer | Music Producer</title>
                <meta
                    name="description"
                    content="Hi, I'm Chaz. I like to design and create intuitive and streamlined applications. This is my personal website that showcases my random interests."
                ></meta>
            </head>
            <body {...props.bodyAttributes}>
                {props.preBodyComponents}
                <div
                    key={`loader`}
                    id="___loader"
                    style={{
                        margin: `0px`,
                        background: `#fff`,
                        display: `flex`,
                        justifyContent: `center`,
                        alignItems: `center`,
                        position: `absolute`,
                        top: 1,
                        bottom: 0,
                        left: 1,
                        right: 0,
                    }}
                >
                    <div
                        style={{
                            alignItems: `center`,
                            display: `flex`,
                            justifyContent: `center`,
                            position: `absolute`,
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 100,
                        }}
                    >
                        <svg
                            width="100%"
                            height="100%"
                            version="1.1"
                            viewBox="0 0 1280 720"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="345.38"
                                y="127.18"
                                width="537.9"
                                height="464.39"
                            />
                            <g>
                                <path
                                    d="m-112.53-62.252v878.71h1573.1v-878.71h-1573.1zm559.58 238.27c2.7691-0.02551 5.5175 0.3244 7.2852 1.0566 3.3935 1.4056 8.9087 7.6086 11.488 12.92 1.1036 2.2722 7.1316 21.727 13.395 43.234l11.387 39.104-1.6348 3.6504c-2.4038 5.3648-3.9523 12.623-3.9609 18.576-0.00626 4.4139 12.745 83.025 15.508 95.594 4.2617 19.399 12.969 33.024 24.811 38.826 5.278 2.5858 6.9345 2.9905 13.672 3.3398 6.3679 0.33018 8.6774 0.09387 13.652-1.3945 7.9972-2.3927 13.099-5.2327 17.074-9.5078l3.291-3.5391 4.2734 4.0059c5.4052 5.0676 10.708 7.7325 18.596 9.3477 17.707 3.6257 32.381-1.1382 42.002-13.637 1.7748-2.3057 1.8912-2.341 2.752-0.81641 2.1307 3.7743 8.5092 9.4578 13.129 11.697 11.383 5.5191 26.536 5.3158 38.137-0.51172 9.7476-4.8963 19.363-18.986 22.225-32.566 1.0232-4.8548 2.4928-30.195 2.7598-47.596 0.02968-1.9356 0.20885-2.0058 4.4766-1.7422 6.0047 0.37081 11.246-2.1177 19.449-9.2402 21.891-19.006 31.239-25.724 45.943-33.014 12.465-6.1801 21.946-8.7216 30.938-8.293 5.8618 0.27943 7.7889 0.73171 11.406 2.6856 15.225 8.2233 19.212 27.502 8.5527 41.355-1.1558 1.5022-7.2791 6.1091-13.607 10.236-18.109 11.812-28.43 21.444-43.25 40.365-13.938 17.794-24.518 34.702-42.908 68.568-14.923 27.484-28.18 48.672-34.059 54.438-2.501 2.4528-6.5397 5.4593-8.9726 6.6797-9.2749 4.6517-8.3056 4.6066-97.969 4.5625-62.217-0.03059-83.078-0.28121-85.852-1.0293l-0.00391 0.00196c-12.087-3.2618-21.455-12.576-28.225-28.062-4.7227-10.803-6.0537-17.6-18.555-94.67-6.2374-38.455-9.012-53.759-24.133-133.11-14.092-73.95-14.052-73.634-10.568-81.441 1.6471-3.6912 5.2895-6.8995 10.088-8.8867 1.8483-0.76555 4.6391-1.1659 7.4082-1.1914zm227.36 68.611c3.0128 0.02475 4.9044 0.45122 7.8828 1.5645 8.5471 3.1949 15.875 11.753 17.225 20.117 0.48986 3.0368-0.41713 47.455-2.084 102.06-0.60356 19.772-0.76746 21.349-2.8476 27.498-2.6061 7.7044-6.9031 13.714-11.67 16.324-3.7303 2.0422-10.25 2.8515-14.822 1.8398v0.00586c-8.2656-1.8289-12.751-5.7553-15.756-13.793-3.7801-10.109-3.9261-11.991-5.8281-75.838-1.7303-58.078-1.7139-59.027 1.1113-64.947 4.2355-8.8751 12.609-14.165 23.32-14.73 1.3349-0.0705 2.4645-0.10591 3.4688-0.09766zm-75.082 0.36914c6.4096-0.04389 7.8332 0.21498 11.408 2.0859 5.6697 2.9672 11.17 9.047 13.307 14.709 1.5959 4.2284 1.8707 7.57 2.9531 35.857 2.4479 63.973 3.0127 83.79 2.5606 89.682-0.76601 9.9804-3.9802 17.339-9.7773 22.385-4.2798 3.725-13.067 5.6051-19.779 4.2305v-0.00195c-13.909-2.8483-17.795-12.671-21.055-53.236-0.69539-8.6519-2.737-31.705-4.5391-51.227-3.4054-36.891-3.5946-44.895-1.1641-49.537 2.5725-4.9138 8.3336-10.226 13.689-12.625 4.3108-1.9311 6.1736-2.2796 12.396-2.3223zm-70.99 22.955c6.1939-0.19171 12.432 2.0296 17.193 7.2539 5.9869 6.5691 7.2306 10.626 9.0254 29.436 0.71958 7.5425 2.6026 25.875 4.1856 40.738 3.7451 35.165 4.2728 42.743 3.4746 49.859-1.3605 12.128-7.0819 17.818-19.129 19.023-2.1884 0.21884-5.5215 0.0375-7.4062-0.40235v0.00196c-4.0688-0.94967-9.8334-6.1344-12.43-11.18-2.9858-5.8018-4.7186-14.383-12.303-60.932-5.5895-34.306-7.2764-46.438-7.0137-50.42 0.91425-13.851 12.578-23.013 24.402-23.379z"
                                    fill="#fff"
                                />
                            </g>
                        </svg>
                    </div>
                    <img
                        style={{
                            zIndex: 101,
                            WebkitUserSelect: `none`,
                            height: `20vw`,
                            width: `20vw`,
                        }}
                        src={LoaderSVG}
                    ></img>
                    {/* <img
                        style={{ margin: `auto`, position: `absolute` }}
                        src={LoaderSVG}
                        alt="loading spinner"
                    /> */}
                </div>
                <div
                    key={`body`}
                    id="___gatsby"
                    // dangerouslySetInnerHTML={{ __html: props.body }}s
                />
                {props.postBodyComponents}
            </body>
        </html>
    );
}

HTML.propTypes = {
    htmlAttributes: PropTypes.object,
    headComponents: PropTypes.array,
    bodyAttributes: PropTypes.object,
    preBodyComponents: PropTypes.array,
    body: PropTypes.string,
    postBodyComponents: PropTypes.array,
};
