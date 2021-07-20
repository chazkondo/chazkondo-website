import React from 'react'
import { Particles } from 'react-particles-js'

export default function ParticlesSection({
    motion,
    useTransform,
    scrollYProgress,
}) {
    const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 300])
    return (
        <motion.div
            style={{
                position: `absolute`,
                height: `200vh`,
                width: `100%`,
                left: 0,
                top: `180vh`,
                opacity: 0.7,
                y: translateY,
            }}
        >
            {/* {console.log(`This div is being rerendered`)} */}
            <Particles
                style={{ position: `absolute` }}
                params={{
                    particles: {
                        number: {
                            value: 160,
                            density: {
                                enable: false,
                            },
                        },
                        size: {
                            value: 3,
                            random: true,
                            anim: {
                                speed: 4,
                                size_min: 0.3,
                            },
                        },
                        line_linked: {
                            enable: false,
                        },
                        move: {
                            random: true,
                            speed: 1,
                            direction: `top`,
                            out_mode: `out`,
                        },
                    },
                    interactivity: {
                        events: {
                            onhover: {
                                enable: false,
                                mode: `bubble`,
                            },
                            onclick: {
                                enable: false,
                                mode: `repulse`,
                            },
                        },
                        modes: {
                            bubble: {
                                distance: 250,
                                duration: 2,
                                size: 0,
                                opacity: 0,
                            },
                            repulse: {
                                distance: 400,
                                duration: 4,
                            },
                        },
                    },
                }}
            />
        </motion.div>
    )
}
