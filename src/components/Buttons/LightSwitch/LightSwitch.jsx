import React from "react"

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../../../utils/fontawesome"

import classnames from "classnames"

export default function LightSwitch({ backgroundDark, setBackgroundDark }) {
    const [jumpEffect, toggleJumpEffect] = React.useState(``)
    const [nightModeClicked, setNightModeClicked] = React.useState(false)

    function toggleMode() {
        if (!nightModeClicked) {
            setNightModeClicked(true)
        }
        return setBackgroundDark(current => !current)
    }

    React.useEffect(() => {
        let initialTimeout
        let setJumpInterval
        function turnOnJumpEffect() {
            toggleJumpEffect(`jump`)
            return (initialTimeout = setTimeout(
                () => toggleJumpEffect(``),
                3000
            ))
        }
        if (!nightModeClicked) {
            turnOnJumpEffect()
        }
        if (nightModeClicked) {
            clearTimeout(initialTimeout)
            return clearTimeout(setJumpInterval)
        }
        return () => {
            clearTimeout(initialTimeout)
            clearTimeout(setJumpInterval)
        }
    }, [])

    return (
        <span
            className="lightButton"
            onClick={() => toggleMode()}
            style={{
                padding: `25px 5px 10px 20px`,
                cursor: `pointer`,
                bottom: `10%`,
                right: `3%`,
                position: `fixed`,
                zIndex: 100000,
                color: `rgba(255,255,255,0.3)`,
                // background: `black`,
            }}
        >
            {backgroundDark ? (
                <span
                    className={classnames(jumpEffect)}
                    style={{
                        display: `grid`,
                        gridTemplateColumns: `1fr`,
                        gridTemplateRows: `1fr`,
                        gridTemplateAreas: `'overlap'`,
                        margin: 0,
                        gridGap: 0,
                        padding: 0,
                    }}
                >
                    <FontAwesomeIcon
                        className="overlap"
                        style={{
                            filter: `drop-shadow(1px 1px 1px #000000)`,
                            transform: `rotate(-10deg)`,
                        }}
                        size={`lg`}
                        icon={[`fas`, `sun`]}
                        color="black"
                        opacity={0.5}
                    />
                    <FontAwesomeIcon
                        className="overlap"
                        style={{
                            position: `relative`,
                            right: `10%`,
                            transform: `rotate(-10deg)`,
                        }}
                        size={`lg`}
                        icon={[`fas`, `sun`]}
                        color="rgba(255,255,255,0.6)"
                    />
                </span>
            ) : (
                <span
                    className={classnames(jumpEffect)}
                    style={{
                        display: `grid`,
                        gridTemplateColumns: `1fr`,
                        gridTemplateRows: `1fr`,
                        gridTemplateAreas: `'overlap'`,
                        margin: 0,
                        gridGap: 0,
                        padding: 0,
                    }}
                >
                    <FontAwesomeIcon
                        className="overlap"
                        style={{
                            position: `relative`,
                            filter: `drop-shadow(1px 1px 1px #000000)`,
                            // transform: `scaleX(-1)`,
                            transform: `rotate(-10deg)`,
                        }}
                        size={`lg`}
                        icon={[`fas`, `moon`]}
                        color="black"
                        opacity={0.5}
                    />
                    <FontAwesomeIcon
                        className="overlap"
                        style={{
                            filter: `drop-shadow(1px 1px 1px #ffffff)`,
                            position: `relative`,
                            right: `10%`,
                            transform: `rotate(-10deg)`,
                            // transform: `scaleX(-1)`,
                        }}
                        size={`lg`}
                        icon={[`fas`, `moon`]}
                        color="rgba(255,255,255,0.4)"
                    />
                </span>
            )}
        </span>
    )
}
