import React from 'react'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../utils/fontawesome'

import classnames from 'classnames'

export default function Swatch({
    backgroundDark,
    setBackgroundDark,
    setAnimation,
    animation,
    turnOffVideo,
    videoDisplay,
}) {
    const [jumpEffect, toggleJumpEffect] = React.useState(``)
    // const [nightModeClicked, setNightModeClicked] = React.useState(false)
    const [swatchState, toggleSwatchState] = React.useState(false)
    const [loading, setLoading] = React.useState(0)
    const [divLoading, setDivLoading] = React.useState(false)

    const wrapperRef = React.useRef(null)

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            nswatch.classList.remove(`active`)
            toggleSwatchState(false)
        }
    }

    React.useEffect(() => {
        document.addEventListener(`click`, handleClickOutside, false)
        return () => {
            document.removeEventListener(`click`, handleClickOutside, false)
        }
    }, [])

    React.useEffect(() => {
        let load
        function startTransition() {
            setDivLoading(true)
            load = setTimeout(() => setLoading(1), 100)
        }

        startTransition()

        return () => {
            clearTimeout(load)
        }
    }, [loading, divLoading])

    // function toggleMode() {
    //     if (!nightModeClicked) {
    //         setNightModeClicked(true)
    //     }
    //     return setBackgroundDark(current => !current)
    // }

    // React.useEffect(() => {
    //     let initialTimeout
    //     let setJumpInterval
    //     function turnOnJumpEffect() {
    //         toggleJumpEffect(`jump`)
    //         return (initialTimeout = setTimeout(
    //             () => toggleJumpEffect(``),
    //             3000
    //         ))
    //     }
    //     if (!nightModeClicked) {
    //         turnOnJumpEffect()
    //     }
    //     if (nightModeClicked) {
    //         clearTimeout(initialTimeout)
    //         return clearTimeout(setJumpInterval)
    //     }
    //     return () => {
    //         clearTimeout(initialTimeout)
    //         clearTimeout(setJumpInterval)
    //     }
    // }, [])

    return (
        <>
            {divLoading && (
                <div
                    ref={wrapperRef}
                    id="nswatch"
                    style={{
                        opacity: loading,
                        transition: `opacity 1s linear`,
                        zIndex: 2,
                    }}
                    className={classnames(`navigationSwatch`, {
                        active: swatchState,
                    })}
                >
                    {swatchState ? (
                        <span
                            onClick={() => toggleSwatchState(current => !current)
                            }
                            className="share fa fa-ellipsis-v"
                        />
                    ) : (
                        <span
                            onClick={() => toggleSwatchState(current => !current)
                            }
                            className="share fa fa-ellipsis-h"
                        />
                    )}
                    <ul>
                        <li onClick={() => turnOffVideo(current => !current)}>
                            {videoDisplay ? (
                                <FontAwesomeIcon
                                    className="hoverman1"
                                    size={`lg`}
                                    icon={[`fas`, `video-slash`]}
                                    color="black"
                                    opacity={0.6}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    className="hoverman1"
                                    size={`lg`}
                                    icon={[`fas`, `video`]}
                                    color="black"
                                    opacity={0.6}
                                />
                            )}
                            <div
                                className="noShow1"
                                style={{
                                    position: `absolute`,
                                    padding: `20px`,
                                    backgroundColor: `rgba(255,255,255,0.7)`,
                                    color: `black`,
                                    borderRadius: `20px`,
                                    bottom: `150%`,
                                    left: `10px`,
                                    boxShadow: `0 2px 5px -1px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.09)`,
                                }}
                            >
                                <p style={{ fontWeight: 300 }}>Toggle Video</p>
                            </div>
                        </li>

                        <li onClick={() => setAnimation(current => !current)}>
                            {animation ? (
                                <FontAwesomeIcon
                                    className="hoverman"
                                    size={`lg`}
                                    icon={[`fas`, `toggle-on`]}
                                    color="black"
                                    opacity={0.6}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    className="hoverman"
                                    size={`lg`}
                                    icon={[`fas`, `toggle-off`]}
                                    color="black"
                                    opacity={0.6}
                                />
                            )}
                            <div
                                className="noShow"
                                style={{
                                    position: `absolute`,
                                    padding: `20px`,
                                    backgroundColor: `rgba(255,255,255,0.7)`,
                                    color: `black`,
                                    borderRadius: `20px`,
                                    bottom: `150%`,
                                    left: `10px`,
                                    boxShadow: `0 2px 5px -1px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.09)`,
                                }}
                            >
                                <p style={{ fontWeight: 300 }}>
                                    Toggle Animation
                                </p>
                            </div>
                        </li>
                        <li
                            onClick={() => setBackgroundDark(current => !current)
                            }
                        >
                            {backgroundDark ? (
                                <FontAwesomeIcon
                                    className="hoverman2"
                                    size={`lg`}
                                    icon={[`far`, `lightbulb`]}
                                    color="black"
                                    opacity={0.6}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    className="hoverman2"
                                    size={`lg`}
                                    icon={[`fas`, `lightbulb`]}
                                    color="black"
                                    opacity={0.6}
                                />
                            )}
                            <div
                                className="noShow2"
                                style={{
                                    position: `absolute`,
                                    padding: `20px`,
                                    backgroundColor: `rgba(255,255,255,0.7)`,
                                    color: `black`,
                                    borderRadius: `20px`,
                                    bottom: `150%`,
                                    left: `40px`,
                                    boxShadow: `0 2px 5px -1px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.09)`,
                                }}
                            >
                                <p style={{ fontWeight: 300 }}>
                                    Toggle Dark Mode
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
            {/* {swatchState ? (
                <>
                    <div
                        onClick={() => toggleSwatchState(current => !current)}
                        style={{
                            padding: `25px 5px 10px 20px`,
                            height: `15vw`,
                            width: `15vw`,
                            borderRadius: `50%`,
                            cursor: `pointer`,
                            bottom: `-7.5vw`,
                            right: `-7.5vw`,
                            position: `fixed`,
                            color: `rgba(255,255,255,0.3)`,
                            background: `red`,
                        }}
                    ></div>
                    <div
                        style={{
                            cursor: `pointer`,
                            // height: `20px`,
                            // width: `100%`,
                            bottom: `8.5vw`,
                            right: `4vw`,
                            position: `fixed`,
                        }}
                    >
                        <p onClick={() => turnOffVideo(current => !current)}>
                            Turn {videoDisplay ? `Off` : `On`} Video
                        </p>
                    </div>
                    <div
                        style={{
                            cursor: `pointer`,
                            // height: `20px`,
                            // width: `100%`,
                            bottom: `5vw`,
                            right: `7vw`,
                            position: `fixed`,
                        }}
                    >
                        <p onClick={() => setAnimation(current => !current)}>
                            Turn {animation ? `Off` : `On`} Animation
                        </p>
                    </div>
                    <div
                        style={{
                            cursor: `pointer`,
                            // height: `20px`,
                            // width: `100%`,
                            bottom: `1.5vw`,
                            right: `10vw`,
                            position: `fixed`,
                        }}
                    >
                        <p
                            onClick={() => setBackgroundDark(current => !current)
                            }
                        >
                            Turn {backgroundDark ? `On` : `Off`} Lights
                        </p>
                    </div>
                </>
            ) : (
                <div
                    onClick={() => toggleSwatchState(current => !current)}
                    style={{
                        padding: `25px 5px 10px 20px`,
                        height: `15vw`,
                        width: `15vw`,
                        borderRadius: `50%`,
                        cursor: `pointer`,
                        bottom: `-7.5vw`,
                        right: `-7.5vw`,
                        position: `fixed`,
                        color: `rgba(255,255,255,0.3)`,
                        background: `green`,
                    }}
                />
            )} */}
        </>
    )
}
