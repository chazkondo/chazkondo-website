import React from 'react'

import { Card, Row } from 'reactstrap'

import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import '../../assets/css/schedule-card.css'
import ReactTooltip from 'react-tooltip'

export default function ScheduleCard({
    habitName,
    habit2Name,
    habit3Name,
    currentDate,
    emoji,
    name,
    caption,
    logMap,
}) {
    const [habitData, setHabitData] = React.useState([])
    const [hashmap, setHashmap] = React.useState({})
    const [habit2Flag, setHabit2Flag] = React.useState(false)
    const [completionFlag, setCompletionFlag] = React.useState(false)

    const [currentLogs, setCurrentLog] = React.useState([])
    const [currentLogs2, setCurrentLog2] = React.useState([])
    const [currentLogs3, setCurrentLog3] = React.useState([])

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

    function convertValue(unit) {
        if (unit === 'calendarReview') {
            return 'Calendar Review Completed'
        }
        if (unit === 'weeklyReview') {
            return 'Weekly Review Completed'
        }
        if (unit === 'weeklyGoals') {
            return 'Weekly Targets Set'
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
        if (logMap[habit2Name]) {
            setCurrentLog2(logMap[habit2Name])
        }
        if (logMap[habit3Name]) {
            setCurrentLog3(logMap[habit3Name])
        }
    }, [logMap])

    React.useEffect(() => {
        let timeout = setTimeout(() => setHabitTimeout(0), 10000)

        if (currentLogs.length) {
            let filteredData = []
            let hashmap = {}
            currentLogs.forEach((log, i) => {
                const localDate = new Date(log.created_date)
                const yearData = parseFloat(localDate.toString().slice(11, 16))
                if (yearData < minimumYear) {
                    setMinimumYear(yearData)
                }

                let date = formatDate(localDate).replaceAll('/', '-')
                filteredData.push({
                    rawDate: log.created_date,
                    date: date,
                    value: log.value,
                    count: log.value,
                    unit_type: 'calendarReview',
                    newId: Math.random()
                        .toString(36)
                        .replace(/[^a-z]+/g, '')
                        .substr(0, 3),
                })
                hashmap[date] = { location: i }
            })
            setHabitData(filteredData)
            setHashmap(hashmap)
            clearTimeout(timeout)
        }

        return () => clearTimeout(timeout)
    }, [currentLogs, currentLogs2, currentLogs3])

    React.useEffect(() => {
        ReactTooltip.rebuild()
    })

    React.useEffect(() => {
        if (habitData.length) {
            let filteredData = [...habitData]
            currentLogs2.forEach((log) => {
                const localDate = new Date(log.created_date)
                const yearData = parseFloat(localDate.toString().slice(11, 16))
                if (yearData < minimumYear) {
                    setMinimumYear(yearData)
                }

                let date = formatDate(localDate).replaceAll('/', '-')
                if (hashmap[date]) {
                    let index = hashmap[date].location
                    filteredData[index].value2 = log.value
                    filteredData[index].unit_type2 = 'weeklyReview'
                }
            })
            setHabit2Flag(true)
            setHabitData(filteredData)
        }
    }, [hashmap])

    React.useEffect(() => {
        if (habitData.length && habit2Flag) {
            let filteredData = [...habitData]
            currentLogs3.forEach((log) => {
                const localDate = new Date(log.created_date)
                const yearData = parseFloat(localDate.toString().slice(11, 16))
                if (yearData < minimumYear) {
                    setMinimumYear(yearData)
                }

                let date = formatDate(localDate).replaceAll('/', '-')
                if (hashmap[date]) {
                    let index = hashmap[date].location
                    filteredData[index].value3 = log.value
                    filteredData[index].unit_type3 = 'weeklyGoals'
                }
            })
            setCompletionFlag(true)
            setHabitData(filteredData)
        }
    }, [habit2Flag])

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
                            {completionFlag ? (
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
                                            if (
                                                value.unit_type3 ===
                                                'weeklyGoals'
                                            ) {
                                                return `color-weekly-goals`
                                            }
                                            if (
                                                value.unit_type2 ===
                                                'weeklyReview'
                                            ) {
                                                return `color-weekly-review`
                                            }
                                            if (
                                                value.unit_type ===
                                                'calendarReview'
                                            ) {
                                                return `color-gitlab-2`
                                            }
                                        }
                                        return `color-github-${value.count}`
                                    }}
                                    data-for={habitData[0].habit_Id}
                                    weekdayLabels={[
                                        'Sun',
                                        'Mon',
                                        'Tue',
                                        'Wed',
                                        'Thu',
                                        'Fri',
                                        'Sat',
                                    ]}
                                    tooltipDataAttrs={(value) => {
                                        if (value.date) {
                                            return {
                                                'data-tip': `${
                                                    value.date
                                                }:  <br />[ ${convertValue(
                                                    value.unit_type
                                                )} ]
                                                ${
                                value.value2
                                    ? `<br />[ ${convertValue(
                                        value.unit_type2
                                    )} ]`
                                    : ``
                                }
                                ${
                                value.value3
                                    ? `<br />[ ${convertValue(
                                        value.unit_type3
                                    )} ]`
                                    : ``
                                }
                                    `,
                                            }
                                        }
                                        return
                                    }}
                                />
                            ) : habitTimeout ? (
                                <p style={{ height: '150px' }}>Loading...</p>
                            ) : (
                                <p>Sorry, no data was found... 😣</p>
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
                        {completionFlag ? (
                            <CalendarHeatmap
                                startDate={new Date(getMobileDates('start'))}
                                endDate={new Date(getMobileDates('end'))}
                                values={habitData}
                                classForValue={(value) => {
                                    if (!value) {
                                        return 'color-empty'
                                    } else {
                                        if (
                                            value.unit_type3 === 'weeklyGoals'
                                        ) {
                                            return `color-weekly-goals`
                                        }
                                        if (
                                            value.unit_type2 === 'weeklyReview'
                                        ) {
                                            return `color-weekly-review`
                                        }
                                        if (
                                            value.unit_type === 'calendarReview'
                                        ) {
                                            return `color-gitlab-2`
                                        }
                                    }
                                    return `color-github-${value.count}`
                                }}
                                showWeekdayLabels={true}
                                weekdayLabels={[
                                    'Sun',
                                    'Mon',
                                    'Tue',
                                    'Wed',
                                    'Thu',
                                    'Fri',
                                    'Sat',
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
                            <p>Sorry, no data was found... 😣</p>
                        )}
                    </Card>
                </Row>
            </div>
        </>
    )
}
