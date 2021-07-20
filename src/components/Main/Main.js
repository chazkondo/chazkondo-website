import React from 'react'
import './Play.css'
import { motion, useViewportScroll, useTransform } from 'framer-motion'

import BackgroundVideo from './BackgroundVideo.jsx'
import MainSvg from './MainSvg.jsx'
import ParticlesSection from './Particles.jsx'
import Introduction from './Introduction.jsx'
import Skills from './Skills.jsx'

function Main({ size, backgroundDark, animation, videoDisplay }) {
    const { scrollYProgress } = useViewportScroll()
    return (
        <div className="MainContent">
            <BackgroundVideo
                motion={motion}
                backgroundDark={backgroundDark}
                useTransform={useTransform}
                scrollYProgress={scrollYProgress}
                videoDisplay={videoDisplay}
                animation={animation}
            />
            <MainSvg
                motion={motion}
                useTransform={useTransform}
                size={size}
                backgroundDark={backgroundDark}
                scrollYProgress={scrollYProgress}
            />
            {animation ? (
                <ParticlesSection
                    motion={motion}
                    useTransform={useTransform}
                    scrollYProgress={scrollYProgress}
                />
            ) : null}
            <div
                style={{
                    height: `450vh`,
                    backgroundColor: backgroundDark
                        ? `rgba(30,30,30,1)`
                        : `white`,
                }}
            >
                <Introduction
                    motion={motion}
                    useTransform={useTransform}
                    scrollYProgress={scrollYProgress}
                    animation={animation}
                />
                <Skills
                    motion={motion}
                    useTransform={useTransform}
                    scrollYProgress={scrollYProgress}
                    animation={animation}
                    videoDisplay={videoDisplay}
                />
            </div>
        </div>
    )
}

export default Main
