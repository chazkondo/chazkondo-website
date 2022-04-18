import React from 'react'

import { Card, Row } from 'reactstrap'

import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'

import ReactTooltip from 'react-tooltip'

export default function RunningCard({ rawRunningData, currentDate, caption }) {
    // Running Data
    const [runningData, setRunningData] = React.useState([])

    // Card Date States
    const [currentYear, setCurrentYear] = React.useState(currentDate)
    const [minimumYear, setMinimumYear] = React.useState(currentDate)
    // The year initial data appeared:
    const [currentYearPage, setCurrentYearPage] = React.useState(currentDate)

    function setPreviousYear() {
        if (currentYearPage - 1 >= minimumYear) {
            setCurrentYearPage(currentYearPage - 1)
        }
    }

    function setNextYear() {
        if (currentYearPage + 1 <= currentYear) {
            setCurrentYearPage(currentYearPage + 1)
        }
    }

    function convertMetersToMiles(meters) {
        return Math.ceil(meters * 0.0621371192) / 100
    }

    function convertTime(d, rawFormatBool) {
        d = Number(d)
        var h = Math.floor(d / 3600)
        var m = Math.floor((d % 3600) / 60)
        var s = Math.floor((d % 3600) % 60)

        if (rawFormatBool) {
            return Math.floor(d / 60) + (Math.floor((d % 3600) % 60) / 60)
        }

        var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : ''
        var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : ''
        var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : ''

        return hDisplay + mDisplay + sDisplay
    }

    function convertPace(time) {
        var seconds = (time - Math.floor(time)) * 60
        var correctSeconds = seconds.toPrecision(2)
        return `${Math.floor(time)} minutes ${correctSeconds} seconds per mile`
    }

    function checkForSecondRun(data) {
        if (data.distance2) {
            return `
            <br />[ ${convertMetersToMiles(
        data.distance2
    )} miles ] <br />[ ${convertTime(data.time2)} ]
    <br />[ ${data.name2} ]
    `
        } else {
            return ``
        }
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear()

        if (month.length < 2) {
            month = '0' + month
        }
        if (day.length < 2) {
            day = '0' + day
        }

        return [year, month, day].join('-').replace(/-/g, '/')
    }

    function getMobileDates(startOrEnd) {
        var date = new Date(),
            y = date.getFullYear(),
            m = date.getMonth()
        if (startOrEnd === 'start') {
            var startDate = new Date(date.setMonth(date.getMonth() - 2))
            const startDateYear = startDate.getFullYear()
            const startDateMonth = startDate.getMonth()
            return [startDateYear, startDateMonth + 1, 1]
                .join('-')
                .replace(/-/g, '/')
        }
        if (startOrEnd === 'end') {
            const lastDay = new Date(y, m + 1, 0)
            return formatDate(lastDay)
        }
    }

    React.useEffect(() => {
        function setDistanceColor(distance) {
            // In meteres
            if (distance <= 3218.69) {
                return 1
            }
            if (distance >= 3218.69 && distance <= 6437.38) {
                return 2
            }
            if (distance >= 6437.38 && distance <= 12874.8) {
                return 3
            }
            if (distance >= 12874.8) {
                return 4
            }
        }

        if (rawRunningData.length) {
            let hashmap = {}
            let filteredData = []
            rawRunningData.forEach((run, i) => {
                if (
                    parseFloat(run.start_date_local.slice(0, 4)) < minimumYear
                ) {
                    setMinimumYear(parseFloat(run.start_date_local.slice(0, 4)))
                }

                let date = run.start_date_local.slice(0, 10)
                if (!hashmap[date]) {
                    hashmap[date] = { location: i }
                    filteredData.push({
                        rawDate: run.start_date_local,
                        date: date,
                        count: setDistanceColor(run.distance),
                        distance: run.distance,
                        run_id: run.id,
                        time: run.time,
                        name: run.name,
                    })
                } else {
                    let index = hashmap[date].location
                    filteredData[index].distance2 = run.distance
                    filteredData[index].time2 = run.time
                    filteredData[index].name2 = run.name
                    filteredData[index].count = setDistanceColor(
                        run.distance + filteredData[index].distance
                    )
                }
            })
            setRunningData(filteredData)
        }
    }, [rawRunningData])

    React.useEffect(() => {
        ReactTooltip.rebuild()
    })

    return (
        <>
            <div className="MainContent">
                <Row>
                    <Card
                        body
                        style={{
                            marginTop: '10px',
                            width: `100%`,
                            padding: `40px`,
                            // height: `500px`,
                            // backgroundColor: `pink`,
                        }}
                    >
                        <h3 style={{ paddingTop: 0, margin: 0 }}>🏃🏻 Running</h3>
                        <p
                            style={{
                                paddingTop: `10px`,
                                paddingBottom: `20px`,
                            }}
                        >
                            {caption} An updated tracker of my running
                            activities
                            {currentYearPage ? ` for ${currentYearPage}` : ''}
                        </p>
                        <div>
                            {runningData.length ? (
                                <CalendarHeatmap
                                    startDate={
                                        new Date(`${currentYearPage - 1}-12-31`)
                                    }
                                    endDate={
                                        new Date(`${currentYearPage}-12-31`)
                                    }
                                    values={runningData}
                                    classForValue={(value) => {
                                        if (!value) {
                                            return 'color-empty'
                                        }
                                        return `color-github-${value.count}`
                                    }}
                                    tooltipDataAttrs={(value) => {
                                        if (value.date) {
                                            let distance = convertMetersToMiles(value.distance)
                                            let time = convertTime(value.time)
                                            let time2 = convertTime(value.time, true)
                                            return {
                                                'data-tip': `${
                                                    value.date
                                                }:  <br />[ ${distance} miles ]
                                                <br />[ ${time} ]
                                                <br />[ ${convertPace(time2 / distance)} ]
                                <br />[ ${value.name} ]
                                    ${checkForSecondRun(value)}
                                    `,
                                            }
                                        }
                                        return
                                    }}
                                />
                            ) : (
                                'Loading...'
                            )}
                            {runningData.length ? (
                                <ReactTooltip multiline={true} />
                            ) : null}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: '20px',
                            }}
                        >
                            <div>
                                {currentYearPage !== minimumYear ? (
                                    <p
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setPreviousYear()}
                                    >
                                        « {currentYearPage - 1}
                                    </p>
                                ) : null}
                            </div>
                            <div>
                                {currentYearPage !== currentYear ? (
                                    <p
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setNextYear()}
                                    >
                                        {currentYearPage + 1} »
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    </Card>
                </Row>
            </div>

            <div className="MobileContent">
                <Row>
                    <Card
                        body
                        style={{
                            marginTop: '10px',
                            width: `100%`,
                            padding: `40px`,
                            // height: `500px`,
                            // backgroundColor: `pink`,
                        }}
                    >
                        <h3 style={{ paddingTop: 0, margin: 0 }}>🏃🏻 Running</h3>
                        <p
                            style={{
                                paddingTop: `10px`,
                                paddingBottom: `20px`,
                            }}
                        >
                            {caption} An updated tracker of my running
                            activities
                            {currentYearPage ? ` for ${currentYearPage}` : ''}
                        </p>
                        {runningData.length ? (
                            <CalendarHeatmap
                                startDate={new Date(getMobileDates('start'))}
                                endDate={new Date(getMobileDates('end'))}
                                values={runningData}
                                data-for={
                                    `${runningData[0].run_id}` +
                                    +Math.random()
                                        .toString(36)
                                        .replace(/[^a-z]+/g, '')
                                        .substr(0, 5)
                                }
                                data-event="touchstart focus mouseover"
                                data-event-off="mouseout"
                                showWeekdayLabels={true}
                                weekdayLabels={[
                                    'Mon',
                                    'Tue',
                                    'Wed',
                                    'Thu',
                                    'Fri',
                                    'Sat',
                                    'Sun',
                                ]}
                                classForValue={(value) => {
                                    if (!value) {
                                        return 'color-empty'
                                    }
                                    return `color-github-${value.count}`
                                }}
                                tooltipDataAttrs={(value) => {
                                    if (value.date) {
                                        let distance = convertMetersToMiles(value.distance)
                                        let time = convertTime(value.time)
                                        let time2 = convertTime(value.time, true)
                                        return {
                                            'data-tip': `${
                                                value.date
                                            }:  <br />[ ${distance} miles ]
                                            <br />[ ${time}} ]
                                            <br />[ ${convertPace(time2 / distance)} ]
                                            <br />[ ${value.name} ]
                                ${checkForSecondRun(value)}
                                `,
                                        }
                                    }
                                    return
                                }}
                            />
                        ) : (
                            <p>Loading...</p>
                        )}
                        {runningData.length ? (
                            <ReactTooltip
                                style={{ cursor: 'pointer' }}
                                globalEventOff={'touchstart'}
                                multiline={true}
                                // id={`${runningData[0].run_id}`}
                            />
                        ) : null}
                    </Card>
                </Row>
            </div>
        </>
    )
}
