import React from 'react'
import { Particles } from 'react-particles-js'

export default function ParticlesSectionBlack({}) {
    return (
        <Particles
            style={{ position: 'absolute', paddingTop: '80px' }}
            params={{
                particles: {
                    number: {
                        value: 12,
                    },
                    size: {
                        value: 3,
                    },
                    color: '#000000',
                    line_linked: {
                        color: '#000000',
                        opacity: 1,
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
    )
}
