import React, { useState, useEffect } from 'react';
import './style.css';

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Calendar = () => {
    const date = new Date();
    const [calendar, setCalendar] = useState({
        today: date,
        selectedDate: date,
        month: date.getMonth(),
        year: date.getFullYear(),
    });

    // Creates the days fragment for the given month and year
    const getDaysFragment = (month, year) => {
        const fragment = [];
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // Adds empty spans for the days before the first day of the month
        for (let day = 0; day < firstDay; day++) {
            fragment.push(<span key={`empty-${day}`}></span>);
        }

        // Adds buttons for each day of the month
        for (let date = 1; date <= lastDate; date++) {
            fragment.push(
                <button
                    key={`date-${date}`}
                    className={`date-${date} ${calendar.selectedDate.getDate() === date ? 'selected' : ''}`}
                    onClick={() => setCalendar({ ...calendar, selectedDate: new Date(calendar.year, calendar.month, date) })}
                >
                    {date}
                </button>
            );
        }

        return fragment;
    };

    // Populates the month and year controls
    const populateControls = () => {
        return (
            <>
                <select
                    className="month"
                    value={calendar.month}
                    onChange={(e) => setCalendar({ ...calendar, month: parseInt(e.target.value) })}
                >
                    {MONTHS.map((month, index) => (
                        <option key={month} value={index}>
                            {month}
                        </option>
                    ))}
                </select>
                <select
                    className="year"
                    value={calendar.year}
                    onChange={(e) => setCalendar({ ...calendar, year: parseInt(e.target.value) })}
                >
                    {Array.from({ length: 110 }, (_, i) => calendar.today.getFullYear() - 100 + i).map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </>
        );
    };

    // Populates the week days row
    const populateWeekDays = () => {
        return WEEK_DAYS.map((weekDay, index) => (
            <span key={index}>{weekDay}</span>
        ));
    };

    // Updates the selected date display
    const updateSelectedDate = () => {
        const days = getDaysFragment(calendar.month, calendar.year);
        const selectedDateElement = days.find(
            (day) => day.props.children === calendar.selectedDate.getDate()
        );
        return selectedDateElement;
    };

    // Updates the calendar when month, year, or selected date changes
    const updateCalendar = () => {
        updateSelectedDate();
    };

    // Effect hook to update calendar when state changes
    useEffect(() => {
        updateCalendar();
    }, [calendar.month, calendar.year, calendar.selectedDate]);

    // Handles the "Previous Month" button click
    const handlePrev = () => {
        const prevDate = new Date(calendar.year, calendar.month - 1, 1);
        if (prevDate.getFullYear() >= calendar.today.getFullYear() - 100) {
            setCalendar({ ...calendar, month: prevDate.getMonth(), year: prevDate.getFullYear() });
        }
    };

    // Handles the "Next Month" button click
    const handleNext = () => {
        const nextDate = new Date(calendar.year, calendar.month + 1, 1);
        if (nextDate.getFullYear() < calendar.today.getFullYear() + 10) {
            setCalendar({ ...calendar, month: nextDate.getMonth(), year: nextDate.getFullYear() });
        }
    };

    // Handles the "Today" button click
    const handleToday = () => {
        setCalendar({
            ...calendar,
            month: calendar.today.getMonth(),
            year: calendar.today.getFullYear(),
            selectedDate: calendar.today,
        });
    };

    return (
        <div className="container text-center">
            <div className="calendar">
                <div className="controls">
                    <button className="prev" onClick={handlePrev}>
                        &lt;
                    </button>
                    {populateControls()}
                    <button className="next" onClick={handleNext}>
                        &gt;
                    </button>
                </div>
                <div className="week-days">{populateWeekDays()}</div>
                <div className="days">{getDaysFragment(calendar.month, calendar.year)}</div>
                <button className="btn btn-primary btn-today" onClick={handleToday}>
                    Today
                </button>
                <p className="selected-date">{calendar.selectedDate.toDateString()}</p>
            </div>
        </div>
    );
};

export default Calendar;
