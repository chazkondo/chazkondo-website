/*eslint-disable*/
import React from "react"


// core components

import ReactPlayer from "react-player/youtube"

export const Video = React.memo(props => {
    return (
        <ReactPlayer
            config={{
                youtube: {
                    playerVars: {
                        modestbranding: 1,
                        autohide: 1,
                        showinfo: 0,
                        controls: 0,
                        loop: 1,
                    },
                    // onUnstarted: playVideo(),
                },
            }}
            controls={false}
            playing={props.play}
            volume={1}
            muted={true}
            height="100%"
            width="100%"
            style={{ position: "absolute" }}
            url="https://www.youtube.com/watch?v=XNdsPW0VGZA"
        />
    )
})