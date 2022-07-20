import React from "react";

import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

// core components
import IndexNavbar from "../components/Navbars/IndexNavbar.js";

// helmet
import { Helmet } from "react-helmet";

// Cards
import RunningCard from "../components/HabitifyCards/RunningCard";
import HabitifyCard from "../components/HabitifyCards/HabitifyCard";
import ScheduleCard from "../components/HabitifyCards/ScheduleCard";

import axios from "axios";

// CSS
import "../assets/css/habitify-card.css";

var Spinner = require("react-spinkit");

export default function Habitify() {
    const title = `Chaz's Habitify Stats`;

    // Ant Design Tab State
    const [activeTab, setActiveTab] = React.useState(`1`);

    // Date to be passed as props
    const newDate = new Date();
    const currentDate = parseFloat(newDate.toISOString().slice(0, 4));

    // Habitify Card States
    const [logMap, setLogMap] = React.useState({});
    const [loadingAllHabits, setLoadingAllHabits] = React.useState("complete");
    const [specificHabits, setSpecificHabits] = React.useState([
        // {
        //     name: "Review Calendar Up To 1 Week",
        //     loading: 0,
        //     route: "reviewCalendarUpTo1Week",
        // },
        // {
        //     name: "Set Weekly Goals",
        //     loading: 0,
        //     route: "weeklyGoals",
        // },
        // {
        //     name: "Weekly Review ",
        //     loading: 0,
        //     route: "weeklyReview",
        // },
        {
            name: "Empty Captures",
            loading: 0,
            route: "emptyCaptures",
        },
        // {
        //     name: "Review/Reprioritize Personal Organizer",
        //     loading: 0,
        //     route: "reviewReprioritizePersonalOrganizer",
        // },
        // {
        //     name: "15 Minute Organizing/Cleaning",
        //     loading: 0,
        //     route: "fifteenMinuteOrganizingCleaning",
        // },
        // {
        //     name: "Meditation/Hypnosis",
        //     loading: 0,
        //     route: "meditationHypnosis",
        // },
        // {
        //     name: "Study/Read/Flash Cards/Audible",
        //     loading: 0,
        //     route: "studyReadFlashCardsAudible",
        // },
        // {
        //     name: "Intermittent Fasting",
        //     loading: 0,
        //     route: "intermittentFasting",
        // },
        // { name: "Nutriblast", loading: 0, route: "nutriblast" },
        // { name: "Lumosity", loading: 0, route: "lumosity" },
        // { name: "Running", loading: 0 },
        {
            name: "OM",
            loading: 0,
            route: "om",
        },
        {
            name: "VS",
            loading: 0,
            route: "vs",
        },
    ]);
    const [helpfulLoadingText, setText] = React.useState("");
    const [loadingArr, setLoadingArr] = React.useState([]);

    // Running Card States
    const [rawRunningData, setRawRunningData] = React.useState([]);

    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    // React.useEffect(() => {
    //     let mounted = true;
    //     if (
    //         mounted &&
    //         loadingArr.length === 12 &&
    //         loadingAllHabits === "loading"
    //     ) {
    //         setText(" * All Habits Loaded * 🥳");
    //         setTimeout(() => setLoadingAllHabits("completed"), 2000);
    //     }

    //     return () => (mounted = false);
    // }, [loadingArr, loadingAllHabits]);

    // React.useEffect(() => {
    //     axios
    //         .get(`https://youthful-elion-58e63d.netlify.app/api/running`)
    //         .then(async (res) => {
    //             let copy = specificHabits.slice();

    //             setRawRunningData(await res.data);

    //             copy.find((habit) => habit.name === "Running").loading =
    //                 "complete";

    //             setSpecificHabits(copy);
    //             setLoadingArr((previous) => [...previous, "Runnning"]);
    //         })
    //         .catch((err) => console.log("FAILED GETTING DATA", err));
    // }, []);

    React.useEffect(() => {
        specificHabits.forEach((habit, i) => {
            if (habit.name !== "Running") {
                axios
                    .get(
                        `https://youthful-elion-58e63d.netlify.app/api/${habit.route}`
                    )
                    .then(async (res) => {
                        const mapName = habit.name;
                        const logs = res.data.data;
                        setLogMap({ ...logMap, [mapName]: logs });

                        let copy = specificHabits.slice();

                        copy.find((habit) => habit.name === mapName).loading =
                            "complete";

                        setSpecificHabits(copy);
                        setLoadingArr((previous) => [...previous, habit.name]);
                    })
                    .catch((err) => console.log("FAILED GETTING DATA"));
            }
        });
    }, []);

    return (
        <>
            <Helmet title={title} defer={false}>
                <title>{title}</title>
                <link rel="icon" href="/favicon.jpg" />
                <meta property="og:title" content={title} />
                <meta
                    property="og:url"
                    content="https://chazkondo.com/habitify"
                />
                <meta
                    property="og:image"
                    content="https://chazkondo.com/myfavicon.png"
                />
                <meta
                    property="og:description"
                    content="Chaz's Habitify Stats"
                />
                <meta property="og:site_name" content="Habitify Stats" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={title} />
                <meta
                    name="twitter:description"
                    content="Chaz's Habitify Stats"
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
            </Helmet>
            {loadingAllHabits === "loading" && (
                <div
                    style={{
                        position: "absolute",
                        zIndex: 999999999999,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                    }}
                ></div>
            )}
            {loadingAllHabits === "loading" && (
                <div
                    style={{
                        position: "fixed",
                        zIndex: 9999999999999,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <div style={{ paddingBottom: "10px" }}>
                            <b>Retrieving Core Habits...</b>
                        </div>
                        <ul style={{ width: "100%", listStyleType: "none" }}>
                            {specificHabits.map((habit, i) => (
                                <li
                                    key={habit.name}
                                    style={{
                                        width: "100%",
                                        textAlign: "center",
                                    }}
                                >
                                    {habit.name}{" "}
                                    <div
                                        style={{
                                            display: "inline-block",
                                            position: "absolute",
                                        }}
                                    >
                                        {!specificHabits[i].loading ? (
                                            <Spinner
                                                name="circle"
                                                style={{
                                                    transform: "scale(0.4)",
                                                }}
                                            />
                                        ) : (
                                            <span
                                                style={{ paddingLeft: "5px" }}
                                            >
                                                ✅
                                            </span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div
                            style={{
                                height: "15px",
                                width: "100%",
                                textAlign: "center",
                            }}
                        >
                            {helpfulLoadingText}
                        </div>
                    </div>
                </div>
            )}
            <IndexNavbar
                showProgressBar={false}
                // changeScrollTop={1}
                isSticky={true}
                responsiveMode="none"
            />
            <div
                style={{
                    // paddingTop: `80px`,
                    display: `flex`,
                    flexDirection: `column`,
                    justifyContent: `center`,
                    alignItems: `center`,
                    width: `100%`,
                }}
            >
                <Nav
                    navbar
                    style={{
                        width: `100%`,
                        justifyContent: `center`,
                        display: `flex`,
                        flexDirection: `row`,
                    }}
                >
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active: activeTab === `1`,
                            })}
                            onClick={() => {
                                toggle(`1`);
                            }}
                        >
                            <h4
                                style={{
                                    margin: "10px",
                                    padding: `3px`,
                                    marginRight: `10px`,
                                    cursor: `pointer`,
                                    borderBottom:
                                        activeTab === `1`
                                            ? `1px solid black`
                                            : ``,
                                }}
                                alt="Core is the foundational habits that I am able to build upon to sharpen my edge in all other aspects of my life"
                            >
                                Current 23 Day Habits
                            </h4>
                        </NavLink>
                    </NavItem>
                    {/* <NavItem>
                        <NavLink
                            className={classnames({
                                active: activeTab === `2`,
                            })}
                            onClick={() => {
                                toggle(`2`);
                            }}
                        >
                            <h4
                                style={{
                                    margin: "10px",
                                    padding: `3px`,
                                    cursor: `pointer`,
                                    borderBottom:
                                        activeTab === `2`
                                            ? `1px solid black`
                                            : ``,
                                }}
                            >
                                Overall Habits
                            </h4>
                        </NavLink>
                    </NavItem> */}
                </Nav>
                <div
                    style={{
                        padding: `0px`,
                        display: `flex`,
                        flexDirection: `column`,
                        width: `75%`,
                    }}
                >
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1" style={{ paddingBottom: "30px" }}>
                            {/* <ScheduleCard
                                habitName={'Review Calendar Up To 1 Week'}
                                habit2Name={'Weekly Review '}
                                habit3Name={'Set Weekly Goals'}
                                logMap={logMap}
                                currentDate={currentDate}
                                emoji="📅"
                                name={'Schedule & Weekly Review + Target Setting'}
                                caption={
                                    <>
                                        <a
                                            className="basic-link"
                                            href="https://gettingthingsdone.com/"
                                            alt="Getting Things Done by David Allen"
                                        >
                                            [GTD Methodology]
                                        </a>
                                        <a
                                            href="https://calendar.google.com"
                                            alt=""
                                        >
                                            <span style={{ fontSize: 'small' }}>
                                                {' '}
                                                Calendar
                                            </span>
                                        </a>
                                    </>
                                }
                            /> */}
                            <HabitifyCard
                                habitName={"Empty Captures"}
                                logMap={logMap}
                                currentDate={currentDate}
                                emoji="🗂"
                                name="Empty Capture Locations"
                                caption={
                                    <a
                                        className="basic-link"
                                        href="https://gettingthingsdone.com/"
                                        alt="Getting Things Done by David Allen"
                                    >
                                        [GTD Methodology]
                                    </a>
                                }
                            />
                            <HabitifyCard
                                habitName={"OM"}
                                logMap={logMap}
                                currentDate={currentDate}
                                emoji="␥"
                                name="OM"
                                caption={
                                    <a
                                        className="basic-link"
                                        href="https://nutritionfacts.org/"
                                        alt="Dr. Greger"
                                    >
                                        [Nutrition Facts]
                                    </a>
                                }
                            />
                            <HabitifyCard
                                habitName={"VS"}
                                logMap={logMap}
                                currentDate={currentDate}
                                emoji="␥"
                                name="VS"
                                caption={
                                    <a
                                        className="basic-link"
                                        href="https://drhyman.com/"
                                        alt="Dr. Hyman"
                                    >
                                        [Ultra Mind Solution]
                                    </a>
                                }
                            />
                            {/* <HabitifyCard
                                habitName={
                                    'Review/Reprioritize Personal Organizer'
                                }
                                logMap={logMap}
                                currentDate={currentDate}
                                emoji="📒"
                                name={
                                    'Review & Reprioritize Personal Organizer'
                                }
                                caption={
                                    <a
                                        className="basic-link"
                                        href="https://store.tonyrobbins.com/products/the-time-of-your-life"
                                        alt="Tony Robbins RPM Planning Method"
                                    >
                                        [Tony Robbins RPM Method]
                                    </a>
                                }
                            />
                            <HabitifyCard
                                habitName={'Intermittent Fasting'}
                                logMap={logMap}
                                currentDate={currentDate}
                                emoji="🙅🏻"
                                name="Intermittent Fasting"
                                caption="[18 - 20 Hours]"
                            />
                            <HabitifyCard
                                habitName={'Nutriblast'}
                                logMap={logMap}
                                currentDate={currentDate}
                                emoji="🥬🥤"
                                name="Green Smoothie"
                                caption="[Kale, Pumpkin Seeds, Spirulina, Amla, Turmeric, Blue Berries, Strawberries, Banana]"
                            />
                            <RunningCard
                                rawRunningData={rawRunningData}
                                currentDate={currentDate}
                                caption={
                                    <a
                                        className="basic-link"
                                        href="https://strava.com/"
                                        alt="Strava"
                                    >
                                        [Strava]
                                    </a>
                                }
                            />
                            <HabitifyCard
                                habitName={'Meditation/Hypnosis'}
                                logMap={logMap}
                                currentDate={currentDate}
                                emoji="🧘🏻‍♂️"
                                name="Meditation / Hypnosis"
                                caption="[Meditation, Hypnosis, Image Streaming, Relaxation, etc...]"
                            />
                            <HabitifyCard
                                habitName={'Study/Read/Flash Cards/Audible'}
                                logMap={logMap}
                                currentDate={currentDate}
                                emoji="📚"
                                name="Reading"
                                caption="[Studying, Quizlet, Audible, Books,
                                        etc...]"
                            />
                            <HabitifyCard
                                habitName={'Lumosity'}
                                logMap={logMap}
                                currentDate={currentDate}
                                emoji="🧠"
                                name="Lumosity"
                                caption={
                                    <a
                                        className="basic-link"
                                        href="https://lumosity.com/"
                                        alt="Lumosity"
                                    >
                                        [Improve memory, increase focus, and
                                        feel sharper]
                                    </a>
                                }
                            />
                            <HabitifyCard
                                habitName={'15 Minute Organizing/Cleaning'}
                                logMap={logMap}
                                currentDate={currentDate}
                                emoji="🧺"
                                name="Organizing / Cleaning"
                                caption={
                                    <a
                                        className="basic-link"
                                        href="https://konmari.com/"
                                        alt="Marie Kondo"
                                    >
                                        [Konmari Method]
                                    </a>
                                }
                            /> */}
                        </TabPane>
                        {/* <TabPane tabId="2">
                            Coming Soon
                            {/* <Row>
                                <Col sm="6">
                                    <Card body>
                                        <CardTitle>
                                            Software Engineering
                                        </CardTitle>
                                        <CardText>
                                            With supporting text below as a
                                            natural lead-in to additional
                                            content.
                                        </CardText>
                                        <Button>Go somewhere</Button>
                                    </Card>
                                </Col>
                                <Col sm="6">
                                    <Card body>
                                        <CardTitle>Music Production</CardTitle>
                                        <CardText>
                                            With supporting text below as a
                                            natural lead-in to additional
                                            content.
                                        </CardText>
                                        <Button>Go somewhere</Button>
                                    </Card>
                                </Col>
                            </Row> */}
                        {/* <Row>
                                <Col sm="6">
                                    <Card body>
                                        <CardTitle>Music Composition</CardTitle>
                                        <CardText>
                                            With supporting text below as a
                                            natural lead-in to additional
                                            content.
                                        </CardText>
                                        <Button>Go somewhere</Button>
                                    </Card>
                                </Col>
                                <Col sm="6">
                                    <Card body>
                                        <CardTitle>Musician/Vocalist</CardTitle>
                                        <CardText>
                                            With supporting text below as a
                                            natural lead-in to additional
                                            content.
                                        </CardText>
                                        <Button>Go somewhere</Button>
                                    </Card>
                                </Col>
                            </Row> */}
                        {/* <Row>
                                <Col sm="6">
                                    <Card body>
                                        <CardTitle>Gaming/Streaming</CardTitle>
                                        <CardText>
                                            With supporting text below as a
                                            natural lead-in to additional
                                            content.
                                        </CardText>
                                        <Button>Go somewhere</Button>
                                    </Card>
                                </Col>
                                <Col sm="6">
                                    <Card body>
                                        <CardTitle>Video Production</CardTitle>
                                        <CardText>
                                            WitSanityging text below as a
                                            natural lead-in to additional
                                            content.
                                        </CardText>
                                        <Link to="/habitify/video-production">
                                            blog
                                        </Link>
                                    </Card>
                                </Col>
                            </Row>}
                        </TabPane> */}
                    </TabContent>
                </div>
            </div>
        </>
    );
}
