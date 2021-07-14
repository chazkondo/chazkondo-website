import React from 'react'
import { Particles } from 'react-particles-js'

export default function ParticlesSectionWhite({}) {
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
