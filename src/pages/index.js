import React from 'react'

// core components
import IndexNavbar from '../components/Navbars/IndexNavbar.js'
import Main from '../components/Main/Main.js'
import Responsive from '../components/Responsive/Responsive.jsx'

import Swatch from '../components/Buttons/Swatch/Swatch.jsx'

//css
import '../assets/css/bootstrap.min.css'
import '../assets/scss/paper-kit.scss?v=1.2.0'
import '../assets/demo/demo.css?v=1.2.0'
import '../styles/app.css'

// helper
import useWindowSize from '../components/Helpers/useWindowSize.js'

// helmet
import { Helmet } from 'react-helmet'

function Index() {
    const [backgroundDark, setBackgroundDark] = React.useState(false)
    const [responsiveMode, setResponsiveMode] = React.useState(`block`)
    const [
        responsiveModeSmallScreen,
        setResponsiveModeSmallScreen,
    ] = React.useState(1)
    const [animation, setAnimation] = React.useState(true)
    const [videoDisplay, turnOffVideo] = React.useState(true)
    const title = `Chaz Kondo - Software Engineer`

    const size = useWindowSize()

    React.useLayoutEffect(() => {
        const hours = new Date().getHours()
        const isDayTime = hours > 6 && hours < 18
        setBackgroundDark(!isDayTime)
    }, [])

    React.useEffect(() => {
        if (size.height > size.width - size.width / 3) {
            return setResponsiveMode(`none`)
        } else if (size.height < size.width - size.width / 1.9) {
            return setResponsiveMode(`none`)
        } else {
            return setResponsiveMode(`block`)
        }
    }, [size.width, size.height])

    React.useEffect(() => {
        if (size.width < 767) {
            return setResponsiveModeSmallScreen(1)
        } else {
            return setResponsiveModeSmallScreen(0)
        }
    }, [size.width])

    return (
        <>
            <Helmet title={title} defer={false}>
                <title>{title}</title>
                <link rel="icon" href="/favicon.jpg" />
                <meta property="og:title" content={title} />
                <meta property="og:url" content="https://chazkondo.com" />
                <meta
                    property="og:image"
                    content="https://chazkondo.com/myfavicon.png"
                />
                <meta
                    property="og:description"
                    content="Full Stack Software Engineer/Cloud Developer"
                />
                <meta
                    property="image"
                    content="https://chazkondo.com/myfavicon.png"
                />
                <meta
                    property="description"
                    content="Full Stack Software Engineer"
                />
                <meta property="og:site_name" content="Chaz Kondo" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={title} />
                <meta
                    name="twitter:description"
                    content="Full Stack Software Engineer/Cloud Developer"
                />
                <meta name="twitter:creator" content="@chazkondo" />
                <meta
                    name="twitter:image"
                    content="https://chazkondo.com/myfavicon.png"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                />
                <link rel="shortcut icon" href="/favicon.jpg" />
                <script type="application/ld+json">
                    {`
                        {
                            "@context": "https://schema.org",
                            "url": "https://www.chazkondo.com",
                            "@type": "Person",
                            "name": "Chaz Kondo",
                            "status": "Developing 👓"
                            }
                        }
                    `}
                </script>
            </Helmet>
            <IndexNavbar
                responsiveMode={responsiveMode}
                showProgressBar={false}
                backgroundDark={backgroundDark}
            />
            {responsiveMode === `block` && (
                <Main
                    backgroundDark={backgroundDark}
                    size={size}
                    responsiveMode={responsiveMode}
                    animation={animation}
                    videoDisplay={videoDisplay}
                />
            )}
            {(responsiveMode !== `block` || responsiveModeSmallScreen) && (
                <Responsive
                    backgroundDark={backgroundDark}
                    size={size}
                    responsiveMode={responsiveMode}
                    animation={animation}
                    videoDisplay={videoDisplay}
                />
            )}
            <Swatch
                backgroundDark={backgroundDark}
                setBackgroundDark={setBackgroundDark}
                setAnimation={setAnimation}
                animation={animation}
                turnOffVideo={turnOffVideo}
                videoDisplay={videoDisplay}
            />
        </>
    )
}

export default Index
