import React from 'react'
import useIntersect from '../Helpers/useIntersect'

export default function Introduction({
    motion,
    useTransform,
    scrollYProgress,
    animation,
}) {
    const [count, setCount] = React.useState(0)
    const [roles, setRoles] = React.useState(``)
    const roleArr = [
        `Musician`,
        `Producer`,
        `Vegan`,
        `Gamer`,
        `Presence`,
        `Father`,
        `Runner`,
        `Developer`,
    ]

    let [roleRef, role] = useIntersect({
        threshold: 1,
    })

    const opacity = useTransform(
        scrollYProgress,
        [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
        [0, 0.3, 0.6, 0.9, 0.6, 0.3, 0]
    )

    const scale = useTransform(
        scrollYProgress,
        [0.3, 0.4, 0.5, 0.6, 0.7],
        [0.93, 0.95, 1, 0.95, 0.93]
    )

    const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [1, 50, -50])

    React.useEffect(() => {
        let timeout
        if (role.intersectionRatio === 1) {
            if (count === roleArr.length) {
                roleRef = null
                role = null
                return
            } else if (count === 0) {
                timeout = setTimeout(() => {
                    setRoles(roleArr[count])
                    setCount(count => count + 1)
                }, 500)
            } else {
                setRoles(roleArr[count])
                timeout = setTimeout(() => setCount(count => count + 1), 80)
            }
        }

        return () => clearTimeout(timeout)
    }, [count, role])

    return (
        <div
            style={{
                height: `100%`,
                width: `100%`,
                display: `flex`,
                justifyContent: `center`,
                // alignItems: `center`,
            }}
        >
            <div>
                <motion.div
                    style={{
                        borderRadius: `10px`,
                        position: `relative`,
                        top: `47%`,
                        textAlign: `center`,
                        y: translateY,
                    }}
                >
                    <motion.div
                        style={{
                            position: `absolute`,
                            borderRadius: `20px`,
                            padding: `25px`,
                            height: `190%`,
                            width: `120%`,
                            backgroundColor: `black`,
                            zIndex: `-1`,
                            left: `-10%`,
                            top: `-45%`,
                            opacity,
                            scale,
                        }}
                    />
                    <motion.div style={{ scale }}>
                        <h1
                            style={{
                                color: `white`,
                            }}
                        >
                            Hi, I'm Chaz Kondo
                        </h1>
                        <h2
                            style={{
                                color: `white`,
                            }}
                            ref={roleRef}
                        >
                            {roles}
                            <span>&nbsp;</span>
                        </h2>
                    </motion.div>
                    {/* <h2>Developer</h2> */}
                </motion.div>
                <div
                    style={{
                        position: `relative`,
                        top: `50%`,
                        padding: `20px`,
                        // backgroundColor: `green`,
                        height: `500px`,
                    }}
                >
                    <svg
                        // Circle
                        className={animation ? `updownVariation2` : ``}
                        style={{
                            position: `absolute`,
                            left: `10%`,
                            top: `-81%`,
                            height: `170%`,
                            width: `170%`,
                        }}
                        viewBox="0 0 350 350"
                    >
                        <path
                            fill="white"
                            d="M15,30A15,15,0,1,1,30,15,15,15,0,0,1,15,30ZM15,6.23A8.77,8.77,0,1,0,23.77,15,8.77,8.77,0,0,0,15,6.23Z"
                        ></path>
                    </svg>
                    <svg
                        // Arrows
                        className={animation ? `rotate` : ``}
                        style={{
                            position: `absolute`,
                            height: `25%`,
                            width: `25%`,
                            left: `75%`,
                            top: `-80%`,
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path
                            fill="white"
                            d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"
                        ></path>
                    </svg>
                    <svg
                        // X
                        className={
                            animation
                                ? `css-16b8vem-UpDown-upDownAnimation`
                                : ``
                        }
                        style={{
                            // position: `relative`,
                            // top: `50%`,
                            marginTop: `0%`,
                            marginLeft: `25%`,
                        }}
                        width="50%"
                        height="50%"
                        version="1.1"
                        viewBox="-10 -10 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            transform={`rotate(-10)`}
                            // transform={`translateY(10)`}
                            fill="white"
                            d="m6.4764 39.585c-1.1631-1.2016-2.7661-2.8709-3.5623-3.7096l-1.4476-1.5248 12.42-12.428-12.417-12.425 1.0469-1.1297c0.5758-0.62134 2.1783-2.2912 3.561-3.7109l2.5141-2.5812 12.575 12.567 12.607-12.598 7.066 7.4778-12.392 12.401 12.421 12.43-1.714 1.7887c-0.94267 0.98379-2.5459 2.653-3.5626 3.7092l-1.8487 1.9205-12.576-12.568-12.576 12.567z"
                            strokeWidth=".26458"
                        />
                    </svg>
                    <svg
                        // Lightning
                        style={{
                            position: `absolute`,
                            top: `-10%`,
                            left: `-45%`,
                            marginTop: `-5%`,
                        }}
                        className={
                            animation
                                ? `css-16b8vem-UpDown-upDownAnimation growShrink`
                                : ``
                        }
                        width="35%"
                        height="35%"
                        version="1.1"
                        viewBox="0 0 320 600"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            transform={`rotate(10)`}
                            d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z"
                            fill="white"
                        />
                    </svg>
                    <svg
                        // Videogame Guy
                        className={animation ? `updownVariation` : ``}
                        style={{
                            position: `absolute`,
                            top: `-10%`,
                            left: `110%`,
                        }}
                        width="135"
                        height="135"
                        version="1.1"
                        viewBox="0 0 42.333 42.333"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m11.01 35.914c-0.37653-0.37653-0.41957-0.69927-0.41957-3.1467v-2.7272h-1.6783c-2.4521 0-2.5174-0.09248-2.5174-3.5663v-2.7272h-1.6783c-2.5857 0-2.5174 0.14225-2.5174-5.2446 0-5.2506-0.00239-5.2446 2.0978-5.2446 1.9728 0 2.0978 0.21254 2.0978 3.5663v2.7272h2.0978v-1.6783c0-2.2871 0.23032-2.5174 2.5174-2.5174h1.6783v-4.1957h-1.6783c-2.1795 0-2.5174-0.28154-2.5174-2.0978 0-1.7148 0.38304-2.0978 2.0978-2.0978 1.4668 0 2.0978 0.44171 2.0978 1.4685v0.62935h1.6783c2.2871 0 2.5174 0.23032 2.5174 2.5174v1.6783h8.3913v-1.6783c0-2.2871 0.23032-2.5174 2.5174-2.5174h1.6783v-0.62935c0-1.0268 0.63101-1.4685 2.0978-1.4685 1.7148 0 2.0978 0.38304 2.0978 2.0978 0 1.8163-0.33784 2.0978-2.5174 2.0978h-1.6783v4.1957h1.6783c2.2871 0 2.5174 0.23032 2.5174 2.5174v1.6783h2.0978v-2.7272c0-3.3538 0.12502-3.5663 2.0978-3.5663 2.1002 0 2.0978-6e-3 2.0978 5.2446 0 5.3868 0.06827 5.2446-2.5174 5.2446h-1.6783v2.7272c0 3.4738-0.06529 3.5663-2.5174 3.5663h-1.6783v2.7272c0 3.7246 0.18617 3.5663-4.1957 3.5663-4.0633 0-4.1957-0.06617-4.1957-2.0978 0-1.8163 0.33784-2.0978 2.5174-2.0978h1.6783v-2.0978h-12.587v2.0978h1.6783c2.1795 0 2.5174 0.28154 2.5174 2.0978 0 2.0317-0.13233 2.0978-4.1957 2.0978-3.0768 0-3.3915-0.03497-3.7761-0.41956zm5.8739-13.216v-3.1467h-4.1957v6.2935h4.1957zm12.587 0v-3.1467h-4.1957v6.2935h4.1957z"
                            strokeWidth=".20978"
                            fill="white"
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}
