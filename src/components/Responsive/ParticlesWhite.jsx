import React from 'react'
import { Particles } from 'react-particles-js'

export default function ParticlesSectionWhite({ videoDisplay }) {
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
                            line_linked: {
                                color: '#ffffff',
                                opacity: 0.5,
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
