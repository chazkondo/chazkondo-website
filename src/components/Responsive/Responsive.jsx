import React from 'react'

import mypic from '../../images/mypic.jpeg'
import { Card, Row } from 'reactstrap'

import ParticlesSectionWhite from './ParticlesWhite.jsx'
import ParticlesSectionBlack from './ParticlesBlack.jsx'
import { motion, useViewportScroll, useTransform } from 'framer-motion'

function Responsive({ size, backgroundDark, animation, videoDisplay }) {
    const { scrollYProgress } = useViewportScroll()
    return (
        <>
            {animation ? (
                backgroundDark ? (
                    <ParticlesSectionWhite />
                ) : (
                    <ParticlesSectionBlack />
                )
            ) : null}
            <div
                style={{
                    height: '100vh',
                    background: backgroundDark
                        ? 'linear-gradient(180deg, rgb(0, 0, 0) 0%, rgb(90, 90, 90) 100%'
                        : 'white',
                }}
            >
                <Row className="ResponsiveContent">
                    <Card
                        body
                        className="ResponsiveContentParent"
                        style={{
                            zIndex: 100,
                            backgroundColor: backgroundDark
                                ? 'rgba(40,40,40,0.5)'
                                : 'rgba(255,255,255,0.7)',
                        }}
                    >
                        <div className="ResponsiveContentImageContainer">
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <img
                                    style={{
                                        borderRadius: `50%`,
                                        opacity: 0.95,
                                        // height: '95%',
                                        width: `60%`,
                                    }}
                                    alt={`A picture of me`}
                                    src={mypic}
                                />
                                <h2
                                    style={{
                                        color: backgroundDark
                                            ? 'white'
                                            : 'black',
                                    }}
                                >
                                    Hi I'm Chaz
                                </h2>
                                <h5
                                    style={{
                                        padding: 0,
                                        marginTop: '10px',
                                        color: backgroundDark
                                            ? 'white'
                                            : 'black',
                                    }}
                                >
                                    Software Engineer
                                </h5>
                            </div>
                            {/* <div
                        className="ResponsiveContentContainer"
                        style={{
                            marginTop: '40px',
                            border: '1px solid black',
                            borderRadius: '20px',
                            padding: '20px',
                        }}
                    >
                        Content here
                    </div> */}
                        </div>
                    </Card>
                </Row>
            </div>
        </>
    )
}

export default Responsive
