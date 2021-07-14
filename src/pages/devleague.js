import React from "react"

import certificate from "../images/certificate.jpg"
import devleaguePDF from "../images/chaz-kondo-devleague-certificate.pdf"

export default function Devleague() {
    return (
        <div
            style={{
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                flexDirection: `column`,
                textAlign: `center`,
            }}
        >
            <a style={{ cursor: `pointer` }} href={devleaguePDF} download>
                <img
                    style={{
                        border: `2px solid green`,
                        // height: `75%`,
                        // width: `75%`,
                    }}
                    alt={``}
                    src={certificate}
                />
                Download
            </a>
        </div>
    )
}
