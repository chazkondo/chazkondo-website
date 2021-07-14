import React from "react"
import { Particles } from "react-particles-js"
// Maybe add a still background image instead of particles
// Refer to commit -prefer static background to particles

import video from "../../assets/video/sourcecode.mp4"

export default function BackgroundVideo({
    motion,
    backgroundDark,
    useTransform,
    scrollYProgress,
    videoDisplay,
    animation,
}) {
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.125, 0.25],
        [0.2, 0.1, 0]
    )

    const scale = useTransform(
        scrollYProgress,
        [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
        [1, 0.9, 0.8, 0.7, 0.8, 0.9, 1]
    )

    return (
        <div
            className="Pic"
            style={{
                borderTop: backgroundDark ? `` : `1px solid white`,
                borderLeft: backgroundDark ? `` : `1px solid white`,
                borderRight: backgroundDark ? `` : `1px solid white`,
            }}
        >
            <motion.div className="Pic" style={{ scale }}>
                {backgroundDark && (
                    <motion.div
                        style={{
                            height: `100vh`,
                            width: `100vw`,
                            border: `1px solid black`,
                            backgroundColor: `rgba(255,255,255,1)`,
                            opacity: opacity,
                            zIndex: `2`,
                            position: `absolute`,
                        }}
                    />
                )}
                {videoDisplay && (
                    <video
                        id="video"
                        autoPlay={true}
                        width="70%"
                        height="70%"
                        loop="loop"
                        muted="muted"
                        vectorEffect="non-scaling-stroke"
                    >
                        <source
                            src="https://static.framer.com/x/frontpage/hero.mp4"
                            src={video}
                            // type="video/mp4"
                        />
                    </video>
                )}
            </motion.div>
        </div>
    )
}
