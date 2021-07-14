import React from 'react'
import { motion } from "framer-motion"

export function Divider() {

    const svgVariants = {
        hidden: { fill: `rgba(0, 0, 0, 0)` },
        visible: {
            fill: `rgba(0, 0, 0, 0.5)`,
            rotate: 0,
            transition: { delay: 0, duration: 1, ease: `linear` },
        },
    }

    return (
        <motion.svg
            variants={svgVariants}
            initial="hidden"
            animate="visible"
            className='mySVG' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 80" preserveAspectRatio="none">
            <path
                strokeWidth=".26458"
                d="M 0 45.86 h 458 c 29 0 42 19.27 42 19.27 s 13 -19.27 42.74 -19.27 h 457.26 v 54.14 h -1000 z" />
        </motion.svg>
    )
}