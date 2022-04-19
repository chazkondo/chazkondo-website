import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import { Layout, PostCard, Pagination } from "../components/common";
import { MetaData } from "../components/common/meta";

//css
import "../assets/css/bootstrap.min.css";
import "../assets/scss/paper-kit.scss?v=1.2.0";
import "../assets/demo/demo.css?v=1.2.0";

// util
import { postsPerPage } from "../utils/siteConfig";

import { useInView, InView } from "react-intersection-observer";

// helmet
import { Helmet } from "react-helmet";

/**
 * Blog page
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.js under `postsPerPage`.
 *
 */

const Blog = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges;

    const initial = posts.filter((item, index) => index < postsPerPage);

    const [bottomHit, setBottomHit] = React.useState(false);
    const [currentPosts, setCurrentPosts] = React.useState(initial);
    const [loadRequests, setLoadRequests] = React.useState(2);
    const [loading, setLoading] = React.useState(false);
    const [isCompleted, setIsCompleted] = React.useState(false);
    const [isSpotted, setIsSpotted] = React.useState(false);

    const loadingScrollRef = React.useRef(null);

    function bottomSpotted(inView) {
        if (inView) {
            setBottomHit(true);
            setIsSpotted(true);
        }
    }

    function scrollToLoading() {
        loadingScrollRef.current.scrollIntoView({ behavior: `smooth` });
    }

    function toggleCompletedToTrue() {
        setIsSpotted(false);
        setBottomHit(false);
        return setIsCompleted(true);
    }

    React.useEffect(() => {
        let timeout;
        if (bottomHit && !isCompleted) {
            if (currentPosts.length >= posts.length) {
                timeout = setTimeout(() => toggleCompletedToTrue(), 1000);
            } else {
                timeout = setTimeout(() => setLoading(true), 1000);
            }
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [bottomHit, isCompleted]);

    React.useEffect(() => {
        if (loading) {
            scrollToLoading();
            let dataTimeout;

            function callForData() {
                setCurrentPosts(
                    posts.filter(
                        (item, index) => index < postsPerPage * loadRequests
                    )
                );
                setLoadRequests((loadRequests) => loadRequests + 1);
                setIsSpotted(false);
                setBottomHit(false);
                return setLoading(false);
            }

            if (loading) {
                dataTimeout = setTimeout(() => callForData(), 3000);
            }

            return () => clearTimeout(dataTimeout);
        }
    }, [loading]);

    return (
        <>
            <Helmet
                title={"Chaz's random blog. Games, Tech, Music, etc..."}
                defer={false}
            >
                <meta
                    name="description"
                    content="This is my laid-back blog where I may write about GSL, NextJS, or nothing at all!"
                />
            </Helmet>
            <MetaData location={location} />
            <Layout isHome={true}>
                <div className="container flexview">
                    <header
                        className="tag-header"
                        style={{
                            maxWidth: `10000px`,
                        }}
                    >
                        <h1>All Posts</h1>
                    </header>
                    <section className="post-feed">
                        {currentPosts.map(({ node }, index, arr) => {
                            if (node.meta_title !== `Data schema`) {
                                return <PostCard key={node.id} post={node} />;
                            }
                        })}
                    </section>

                    {/* <Pagination pageContext={pageContext} /> */}
                </div>
                {isCompleted ? (
                    <div id="outsideLoadContainer">
                        <p>All Posts Loaded</p>
                    </div>
                ) : !loading ? (
                    <div id="outsideLoadContainer">
                        <InView
                            as="div"
                            // id="bottomDetected"
                            onChange={(inView, entry) => bottomSpotted(inView)}
                        >
                            <h5 className={isSpotted ? `animateCircles` : null}>
                                <span>○ </span>
                                <span>○ </span>
                                <span>○</span>
                            </h5>
                        </InView>
                    </div>
                ) : (
                    <div className="outsideContainer2">
                        <div className="container2">
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                        <p>Loading Posts...</p>
                    </div>
                )}
                <div ref={loadingScrollRef} />
            </Layout>
        </>
    );
};

Blog.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
};

export default Blog;
// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
    query GhostPostQuery {
        allGhostPost(sort: { order: DESC, fields: [published_at] }) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`;
