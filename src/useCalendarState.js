/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useMemo } from "react";
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    format,
    isSameMonth,
    addMonths,
    subMonths,
    isBefore,
} from "date-fns";

export function useCalendarState() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [activeDate, setActiveDate] = useState(new Date());
    const [notes, setNotes] = useState({});

    // Load notes
    useEffect(() => {
        const savedNotes = localStorage.getItem("calendarNotes");
        if (savedNotes) {
            try {
                setNotes(JSON.parse(savedNotes));
            } catch (error) {
                console.error("Failed to parse notes", error);
            }
        }
    }, []);

    // Save notes
    useEffect(() => {
        localStorage.setItem("calendarNotes", JSON.stringify(notes));
    }, [notes]);

    // Derived calendar grid logic
    const days = useMemo(() => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);
        const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
        const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
        return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    }, [currentDate]);

    // Handlers
    const handlePrevMonth = () => setCurrentDate((prev) => subMonths(prev, 1));
    const handleNextMonth = () => setCurrentDate((prev) => addMonths(prev, 1));

    const handleDateClick = (day) => {
        setActiveDate(day);

        if (!isSameMonth(day, currentDate)) {
            setCurrentDate(startOfMonth(day));
        }

        if (!startDate || (startDate && endDate)) {
            setStartDate(day);
            setEndDate(null);
        } else if (isBefore(day, startDate)) {
            setEndDate(startDate);
            setStartDate(day);
        } else {
            setEndDate(day);
        }
    };

    const handleNoteChange = (e) => {
        const dateKey = format(activeDate, "yyyy-MM-dd");
        setNotes((prevNotes) => ({
            ...prevNotes,
            [dateKey]: e.target.value,
        }));
    };

    const activeDateKey = format(activeDate, "yyyy-MM-dd");
    const currentNote = notes[activeDateKey] || "";

    return {
        currentDate,
        startDate,
        endDate,
        activeDate,
        notes,
        days,
        currentNote,
        handlePrevMonth,
        handleNextMonth,
        handleDateClick,
        handleNoteChange,
    };
}
