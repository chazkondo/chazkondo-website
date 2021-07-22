import React from 'react'
// nodejs library that concatenates strings
import classnames from 'classnames'
// reactstrap components
import {
    Collapse,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
} from 'reactstrap'

import HabitifyIcon from '../../assets/img/habitify.jsx'

import { StaticQuery, graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../utils/fontawesome'

const stopPropagation = event => event.stopPropagation()

function IndexNavbar(props) {
    const [state, dispatch] = React.useReducer(reducer, {
        navbarColor: `navbar-transparent`,
    })
    const [loading, setLoading] = React.useState(0)
    const [divLoading, setDivLoading] = React.useState(false)
    const [tier, changeTier] = React.useState(0)

    function reducer(state, action) {
        switch (action.type) {
        case `isBeforeMarker`:
            return { navbarColor: `navbar-transparent` }
        case `isPastMarker`:
            return { navbarColor: `` }
        default:
            throw new Error()
        }
    }

    const [navbarCollapse, setNavbarCollapse] = React.useState(false)
    const [smDropdownOpen, setSmDropdownOpen] = React.useState(false)
    const [dropdownOpen, setDropdownOpen] = React.useState(false)
    const wrapperRef = React.useRef(null)
    const [readingProgress, setReadingProgress] = React.useState(0)

    const scrollListener = () => {
        const totalHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight -
            0.04 *
                (document.documentElement.scrollHeight -
                    document.documentElement.clientHeight)
        const windowScrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0

        if (windowScrollTop === 0) {
            return setReadingProgress(0)
        }

        if (windowScrollTop > totalHeight) {
            return setReadingProgress(100)
        }

        setReadingProgress((windowScrollTop / totalHeight) * 100)
    }

    const toggleNavbarCollapse = () => {
        setNavbarCollapse(navbarCollapse => !navbarCollapse)
        document.documentElement.classList.toggle(`nav-open`)
        setTimeout(() => changeTier(0), 200)
    }

    const toggle = () => setDropdownOpen(!dropdownOpen)
    const toggleSm = () => setSmDropdownOpen(!smDropdownOpen)

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setNavbarCollapse(false)
            document.documentElement.classList.remove(`nav-open`)
            setTimeout(() => changeTier(0), 200)
        }
    }

    React.useEffect(() => {
        let updateNavbarColor
        if (props.changeScrollTop) {
            updateNavbarColor = () => {
                if (
                    document.documentElement.scrollTop > 99 ||
                    document.body.scrollTop > 99
                ) {
                    dispatch({ type: `isPastMarker` })
                } else if (
                    document.documentElement.scrollTop < 100 ||
                    document.body.scrollTop < 100
                ) {
                    dispatch({ type: `isBeforeMarker` })
                }
            }
        } else {
            updateNavbarColor = () => {
                if (
                    document.documentElement.scrollTop > 549 ||
                    document.body.scrollTop > 549
                ) {
                    dispatch({ type: `isPastMarker` })
                } else if (
                    document.documentElement.scrollTop < 550 ||
                    document.body.scrollTop < 550
                ) {
                    dispatch({ type: `isBeforeMarker` })
                }
            }
        }

        window.addEventListener(`scroll`, updateNavbarColor)

        return function cleanup() {
            window.removeEventListener(`scroll`, updateNavbarColor)
        }
    })

    React.useEffect(() => {
        document.addEventListener(`click`, handleClickOutside, false)
        return () => {
            document.removeEventListener(`click`, handleClickOutside, false)
        }
    }, [])

    React.useEffect(() => {
        window.addEventListener(`scroll`, scrollListener)
        return () => window.removeEventListener(`scroll`, scrollListener)
    })

    React.useEffect(() => {
        let load
        function startTransition() {
            setDivLoading(true)
            load = setTimeout(() => setLoading(1), 1)
        }

        const divload = setTimeout(() => startTransition(), 500)

        return () => {
            clearTimeout(load)
            clearTimeout(divload)
        }
    }, [loading, divLoading])

    return (
        <StaticQuery
            query={graphql`
                {
                    allGhostTag {
                        nodes {
                            slug
                            visibility
                            name
                        }
                    }
                }
            `}
            render={data => (
                <div ref={wrapperRef}>
                    {divLoading && (
                        <Navbar
                            style={{
                                opacity: loading,
                            }}
                            className={
                                props.isSticky
                                    ? props.backgroundDark
                                        ? classnames(
                                            state.navbarColor,
                                            `darkmode`
                                        )
                                        : classnames(
                                            state.navbarColor,
                                            `lightmode`
                                        )
                                    : props.backgroundDark
                                        ? classnames(
                                            `fixed-top`,
                                            state.navbarColor,
                                            `darkmode`
                                        )
                                        : classnames(
                                            `fixed-top`,
                                            state.navbarColor,
                                            `lightmode`
                                        )
                            }
                            expand="lg"
                        >
                            <Container>
                                <div
                                    className={classnames(`navbar-translate`, {
                                        darkMode: props.backgroundDark,
                                        lightMode: !props.backgroundDark,
                                    })}
                                    onClick={stopPropagation}
                                >
                                    <NavbarBrand
                                        data-placement="bottom"
                                        href="/"
                                        title="Chaz Kondo"
                                    >
                                        {props.responsiveMode === `none` ? (
                                            `Chaz Kondo`
                                        ) : props.backgroundDark ? (
                                            <span className="textTrans anim-typewriterDark">
                                                Chaz Kondo
                                                <span className="disappear">
                                                    .com
                                                </span>
                                            </span>
                                        ) : (
                                            <span className="textTrans anim-typewriter">
                                                Chaz Kondo
                                                <span className="disappear">
                                                    .com
                                                </span>
                                            </span>
                                        )}
                                    </NavbarBrand>
                                    <button
                                        aria-expanded={navbarCollapse}
                                        className={classnames(
                                            `navbar-toggler navbar-toggler`,
                                            {
                                                toggled: navbarCollapse,
                                            }
                                        )}
                                        onClick={toggleNavbarCollapse}
                                    >
                                        <span className="navbar-toggler-bar bar1" />
                                        <span className="navbar-toggler-bar bar2" />
                                        <span className="navbar-toggler-bar bar3" />
                                    </button>
                                </div>
                                <Collapse
                                    className={classnames(
                                        `justify-content-end`,
                                        {
                                            darkMode: props.backgroundDark,
                                            lightMode: !props.backgroundDark,
                                        }
                                    )}
                                    navbar
                                    isOpen={navbarCollapse}
                                >
                                    <Nav
                                        className={classnames({
                                            darkMode: props.backgroundDark,
                                            lightMode: !props.backgroundDark,
                                        })}
                                        navbar
                                    >
                                        <NavItem
                                            className="d-lg-none"
                                            style={{
                                                display:
                                                    tier === 0
                                                        ? `block`
                                                        : `none`,
                                            }}
                                        >
                                            <NavLink disabled href="#">
                                                Main Menu
                                                <hr />
                                            </NavLink>
                                        </NavItem>
                                        <NavItem
                                            className="d-lg-none"
                                            style={{
                                                display:
                                                    tier !== 0
                                                        ? `block`
                                                        : `none`,
                                            }}
                                        >
                                            <NavLink
                                                style={{ cursor: `pointer` }}
                                                target="_blank"
                                                href="https://www.instagram.com/chazkondo"
                                                onClick={() => {
                                                    changeTier(0)
                                                }}
                                                data-placement="bottom"
                                                title="Follow me on Instagram"
                                            >
                                                Back
                                                <hr />
                                            </NavLink>
                                        </NavItem>
                                        {tier === 1 && (
                                            <NavItem>
                                                <p
                                                    style={{
                                                        fontSize: `1em`,
                                                        opacity: 0.8,
                                                    }}
                                                >
                                                    Social Media
                                                </p>
                                            </NavItem>
                                        )}
                                        <NavItem
                                            className={
                                                tier === 1
                                                    ? ``
                                                    : `d-none d-lg-block`
                                            }
                                        >
                                            <NavLink
                                                className="tooltip"
                                                data-placement="bottom"
                                                href="https://www.linkedin.com/in/chazkondo"
                                                target="_blank"
                                                title="Add me on LinkedIn!"
                                            >
                                                <FontAwesomeIcon
                                                    size={`lg`}
                                                    icon={[
                                                        `fab`,
                                                        `linkedin-in`,
                                                    ]}
                                                />
                                                <p className="d-lg-none">
                                                    {` `}
                                                    Linked In
                                                </p>
                                                <span className="tooltiptext">
                                                    Linked In
                                                </span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem
                                            className={
                                                tier === 1
                                                    ? ``
                                                    : `d-none d-lg-block`
                                            }
                                        >
                                            <NavLink
                                                data-placement="bottom"
                                                href="https://www.facebook.com/demifire1337/"
                                                target="_blank"
                                                title="Add me on Facebook"
                                            >
                                                <FontAwesomeIcon
                                                    size={`lg`}
                                                    icon={[`fab`, `facebook`]}
                                                />
                                                <p className="d-lg-none">
                                                    {` `}
                                                    Facebook
                                                </p>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem
                                            className={
                                                tier === 1
                                                    ? ``
                                                    : `d-none d-lg-block`
                                            }
                                        >
                                            <NavLink
                                                data-placement="bottom"
                                                href="https://www.linkedin.com/in/chazkondo"
                                                target="_blank"
                                                title="Follow me on Instagram"
                                            >
                                                <FontAwesomeIcon
                                                    size={`lg`}
                                                    icon={[`fab`, `instagram`]}
                                                />
                                                <p className="d-lg-none">
                                                    {` `}
                                                    Instagram
                                                </p>
                                                <span className="tooltiptext">
                                                    Instagram
                                                </span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem
                                            className={
                                                tier === 1
                                                    ? ``
                                                    : `d-none d-lg-block`
                                            }
                                        >
                                            <NavLink
                                                className="tooltip"
                                                data-placement="bottom"
                                                href="https://www.github.com/chazkondo"
                                                target="_blank"
                                                title="Github Profile"
                                            >
                                                <FontAwesomeIcon
                                                    style={{
                                                        marginTop: `1px`,
                                                    }}
                                                    size={`lg`}
                                                    icon={[`fab`, `github`]}
                                                />
                                                <p className="d-lg-none">
                                                    {` `}
                                                    Github
                                                </p>
                                                <span className="tooltiptext">
                                                    Github
                                                </span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem
                                            className={`d-none d-lg-block`}
                                        >
                                            <NavLink
                                                className="tooltip"
                                                data-placement="bottom"
                                                href="/habitify"
                                                title="My progress"
                                            >
                                                <HabitifyIcon
                                                    backgroundDark={
                                                        props.backgroundDark
                                                    }
                                                />
                                                <p className="d-lg-none">
                                                    {` `}
                                                    Habitify
                                                </p>
                                                <span className="tooltiptext">
                                                    Habitify
                                                </span>
                                            </NavLink>
                                        </NavItem>
                                        {tier === 2 && (
                                            <>
                                                <NavItem>
                                                    <p
                                                        style={{
                                                            fontSize: `1em`,
                                                            opacity: 0.8,
                                                        }}
                                                    >
                                                        Blog
                                                    </p>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        onClick={
                                                            toggleNavbarCollapse
                                                        }
                                                        data-placement="bottom"
                                                        href="/blog"
                                                        title="Blog Posts"
                                                    >
                                                        ○ All Posts
                                                    </NavLink>
                                                </NavItem>
                                                {data.allGhostTag.nodes.map(
                                                    (tag) => {
                                                        if (
                                                            tag.slug ===
                                                            `data-schema`
                                                        ) {
                                                        } else {
                                                            return (
                                                                <NavItem>
                                                                    <NavLink
                                                                        onClick={
                                                                            toggleNavbarCollapse
                                                                        }
                                                                        key={
                                                                            tag.slug +
                                                                            1
                                                                        }
                                                                        data-placement="bottom"
                                                                        href={`/tag/${tag.slug}`}
                                                                        title={`${tag.slug} Blog Posts`}
                                                                    >
                                                                        ○
                                                                        {` #${tag.name}`}
                                                                    </NavLink>
                                                                </NavItem>
                                                            )
                                                        }
                                                    }
                                                )}
                                            </>
                                        )}

                                        {tier === 0 && (
                                            <>
                                                <NavItem>
                                                    <NavLink
                                                        onClick={
                                                            toggleNavbarCollapse
                                                        }
                                                        className="d-lg-none"
                                                        data-placement="bottom"
                                                        href="/"
                                                        title="Follow us on Instagram"
                                                    >
                                                        Home
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className="tooltip"
                                                        data-placement="bottom"
                                                        // href="mailto:clutterfreehawaii@gmail.com"
                                                        target="_blank"
                                                        title="Check Out My Portfolio"
                                                    >
                                                        Projects
                                                        <span className="tooltiptext">
                                                            Coming Soon
                                                        </span>
                                                    </NavLink>
                                                </NavItem>
                                                <Dropdown
                                                    nav
                                                    className="d-none d-lg-block"
                                                    isOpen={dropdownOpen}
                                                    toggle={toggle}
                                                >
                                                    <DropdownToggle nav caret>
                                                        Blog
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem
                                                            data-placement="bottom"
                                                            href="/blog"
                                                            title="Blog Posts"
                                                        >
                                                            All Posts
                                                        </DropdownItem>
                                                        {data.allGhostTag.nodes.map(
                                                            (tag) => {
                                                                if (
                                                                    tag.slug ===
                                                                    `data-schema`
                                                                ) {
                                                                } else {
                                                                    return (
                                                                        <DropdownItem
                                                                            key={
                                                                                tag.slug
                                                                            }
                                                                            data-placement="bottom"
                                                                            href={`/tag/${tag.slug}`}
                                                                            title={`${tag.slug} Blog Posts`}
                                                                        >
                                                                            {`#${tag.name}`}
                                                                        </DropdownItem>
                                                                    )
                                                                }
                                                            }
                                                        )}
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </>
                                        )}
                                        <NavItem
                                            className="d-lg-none"
                                            style={{
                                                display:
                                                    tier === 0
                                                        ? `block`
                                                        : `none`,
                                            }}
                                        >
                                            <NavLink
                                                onClick={() => toggleNavbarCollapse()
                                                }
                                                data-placement="bottom"
                                                href="/habitify"
                                                title="My Habitify Progress"
                                            >
                                                Habitify
                                            </NavLink>
                                        </NavItem>
                                        <NavItem
                                            className="d-lg-none"
                                            style={{
                                                display:
                                                    tier === 0
                                                        ? `block`
                                                        : `none`,
                                            }}
                                        >
                                            <NavLink
                                                style={{ cursor: `pointer` }}
                                                onClick={() => {
                                                    changeTier(1)
                                                }}
                                                data-placement="bottom"
                                                title="Follow us on Social Media"
                                            >
                                                Social Media
                                            </NavLink>
                                        </NavItem>
                                        <NavItem
                                            className="d-lg-none"
                                            style={{
                                                display:
                                                    tier === 0
                                                        ? `block`
                                                        : `none`,
                                            }}
                                        >
                                            <NavLink
                                                style={{ cursor: `pointer` }}
                                                onClick={() => {
                                                    changeTier(2)
                                                }}
                                                data-placement="bottom"
                                                title="Visit our Blog"
                                            >
                                                Blog
                                            </NavLink>
                                        </NavItem>
                                        <NavItem></NavItem>
                                    </Nav>
                                </Collapse>
                            </Container>
                        </Navbar>
                    )}
                    {props.showProgressBar && (
                        <div
                            className={classnames(
                                `reading-progress-bar`,
                                `fixed-top`,
                                state.navbarColor
                            )}
                            style={{
                                position: `fixed`,
                                backgroundColor: props.backgroundDark
                                    ? `mediumspringgreen`
                                    : ``,
                                width: `${readingProgress}%`,
                            }}
                        />
                    )}
                </div>
            )}
        />
    )
}

export default IndexNavbar
