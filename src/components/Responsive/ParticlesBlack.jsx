import React from 'react'
import { Particles } from 'react-particles-js'

export default function ParticlesSectionBlack({ videoDisplay }) {
    return (
        <>
            {!videoDisplay ? (
                <Particles
                    style={{
                        position: 'absolute',
                        paddingTop: '80px',
                        zIndex: 1,
                    }}
                    params={{
                        particles: {
                            number: {
                                value: 12,
                            },
                            size: {
                                value: 3,
                            },
                            color: '#444444',
                            line_linked: {
                                color: '#333333',
                                opacity: 0.3,
                            },
                        },

                        interactivity: {
                            events: {
                                onhover: {
                                    enable: true,
                                    mode: 'repulse',
                                },
                            },
                        },
                    }}
                />
            ) : null}
        </>
    )
}
