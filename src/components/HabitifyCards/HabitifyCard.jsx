import React from 'react'

import { Card, Row } from 'reactstrap'

import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import ReactTooltip from 'react-tooltip'

export default function HabitifyCard({
    habitName,
    currentDate,
    emoji,
    name,
    caption,
    logMap,
}) {
    const [habitData, setHabitData] = React.useState([])

    const [currentLogs, setCurrentLog] = React.useState([])

    // Card Date States
    const [currentYear, setCurrentYear] = React.useState(currentDate)
    const [minimumYear, setMinimumYear] = React.useState(currentDate)
    // The year initial data appeared:
    const [currentYearPage, setCurrentYearPage] = React.useState(currentDate)

    const [habitTimeout, setHabitTimeout] = React.useState(1)

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

    function convertValue(unit, val) {
        if (unit === 'min') {
            return val + ' Minutes'
        }
        if (unit === 'rep') {
            return 'Completed'
        }
        return 'Error: New Unit Type Detected.'
    }

    function getThreeMonthsBack(month) {
        const months = {
            Jan: 10,
            Feb: 11,
            Mar: 12,
            Apr: 1,
            May: 2,
            Jun: 3,
            Jul: 4,
            Aug: 5,
            Sep: 6,
            Oct: 7,
            Nov: 8,
            Dec: 9,
        }

        return months[month]
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
            const currentMonth = date.toLocaleString('default', {
                month: 'short',
            })
            var startDate = new Date(date.setMonth(date.getMonth() - 3))
            const startDateYear = startDate.getFullYear()
            const startDateMonth = getThreeMonthsBack(currentMonth)
            return [startDateYear, startDateMonth, 28]
                .join('-')
                .replace(/-/g, '/')
        }
        if (startOrEnd === 'end') {
            const lastDay = new Date(y, m + 1, 0)
            return formatDate(lastDay)
        }
    }

    React.useEffect(() => {
        if (logMap[habitName]) {
            setCurrentLog(logMap[habitName])
        }
    }, [logMap])

    React.useEffect(() => {
        let timeout = setTimeout(() => setHabitTimeout(0), 10000)

        function setColor(unit, val) {
            // Divided by 1,2,3 or hours
            if (unit === 'min') {
                // In Minutes
                if (val < 15) {
                    return 1
                }
                if (val >= 15 && val < 30) {
                    return 2
                }
                if (val >= 30 && val < 45) {
                    return 3
                }
                if (val >= 45) {
                    return 4
                }
            }
        }

        if (currentLogs.length) {
            let filteredData = []
            currentLogs.forEach((log) => {
                const localDate = new Date(log.created_date)
                const yearData = parseFloat(localDate.toString().slice(11, 16))
                if (yearData < minimumYear) {
                    setMinimumYear(yearData)
                }

                let date = formatDate(localDate).replaceAll('/', '-')
                filteredData.push({
                    rawDate: log.created_date,
                    date: date,
                    count: setColor(log.unit_type, log.value),
                    value: log.value,
                    unit_type: log.unit_type,
                    newId: Math.random()
                        .toString(36)
                        .replace(/[^a-z]+/g, '')
                        .substr(0, 3),
                })
            })
            setHabitData(filteredData)
            clearTimeout(timeout)
        }

        return () => clearTimeout(timeout)
    }, [currentLogs])

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
                            // height: `350px`,
                            // backgroundColor: `pink`,
                        }}
                    >
                        <h3 style={{ paddingTop: 0, margin: 0 }}>
                            {emoji ? emoji : null} {name}
                        </h3>
                        <p
                            style={{
                                paddingTop: `10px`,
                                paddingBottom: `20px`,
                            }}
                        >
                            {caption}
                            {currentYearPage ? ` ${currentYearPage}` : ''}
                        </p>
                        <div>
                            {habitData.length ? (
                                <CalendarHeatmap
                                    startDate={
                                        new Date(`${currentYearPage - 1}-12-31`)
                                    }
                                    endDate={
                                        new Date(`${currentYearPage}-12-31`)
                                    }
                                    values={habitData}
                                    classForValue={(value) => {
                                        if (!value) {
                                            return 'color-empty'
                                        } else {
                                            if (value.unit_type === 'rep') {
                                                return `color-gitlab-2`
                                            }
                                        }
                                        return `color-github-${value.count}`
                                    }}
                                    data-for={habitData[0].habit_Id}
                                    tooltipDataAttrs={(value) => {
                                        if (value.date) {
                                            return {
                                                'data-tip': `${
                                                    value.date
                                                }:  <br />[ ${convertValue(
                                                    value.unit_type,
                                                    value.value
                                                )} ]
                                    `,
                                            }
                                        }
                                        return
                                    }}
                                />
                            ) : habitTimeout ? (
                                <p style={{ height: '150px' }}>Loading...</p>
                            ) : (
                                <p>Sorry, no data was found... ????</p>
                            )}
                            {habitData.length ? (
                                <ReactTooltip
                                    multiline={true}
                                    id={habitData[0].habit_Id}
                                />
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
                                        ?? {currentYearPage - 1}
                                    </p>
                                ) : null}
                            </div>
                            <div>
                                {currentYearPage !== currentYear ? (
                                    <p
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setNextYear()}
                                    >
                                        {currentYearPage + 1} ??
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
                        <h3 style={{ paddingTop: 0, margin: 0 }}>
                            {emoji ? emoji : null} {name}
                        </h3>
                        <p
                            style={{
                                paddingTop: `10px`,
                                paddingBottom: `20px`,
                            }}
                        >
                            {caption}
                        </p>
                        {habitData.length ? (
                            <CalendarHeatmap
                                startDate={new Date(getMobileDates('start'))}
                                endDate={new Date(getMobileDates('end'))}
                                values={habitData}
                                classForValue={(value) => {
                                    if (!value) {
                                        return 'color-empty'
                                    } else {
                                        if (value.unit_type === 'rep') {
                                            return `color-gitlab-2`
                                        }
                                    }
                                    return `color-github-${value.count}`
                                }}
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
                                data-for={
                                    habitData[0].habit_Id +
                                    Math.random()
                                        .toString(36)
                                        .replace(/[^a-z]+/g, '')
                                        .substr(0, 5)
                                }
                            />
                        ) : habitTimeout ? (
                            <p>Loading...</p>
                        ) : (
                            <p>Sorry, no data was found... ????</p>
                        )}
                    </Card>
                </Row>
            </div>
        </>
    )
}
