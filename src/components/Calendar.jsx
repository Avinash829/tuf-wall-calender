/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    format,
    isSameDay,
    isAfter,
    isBefore,
    isSameMonth,
} from "date-fns";

export default function Calendar() {
    // State management
    const [currentDate] = useState(new Date(2022, 0, 1));
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [activeDate, setActiveDate] = useState(new Date(2022, 0, 1));
    const [notes, setNotes] = useState({});

    // Load notes from local storage
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

    // Save notes to local storage
    useEffect(() => {
        localStorage.setItem("calendarNotes", JSON.stringify(notes));
    }, [notes]);

    // Calendar Calculations
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    // Handle clicks for BOTH range selection and setting the active note day
    const handleDateClick = (day) => {
        setActiveDate(day); // Always make the clicked day the active one for notes

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

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-300 p-4 md:p-10 font-sans">
            <div className="bg-gray-50 shadow-gray-700 shadow shadow-2xl w-full max-w-[450px] aspect-[1/1.4] flex flex-col relative overflow-visible">
                {/* 1. TOP SECTION: Hero Image & Geometric Overlay */}
                <div className="relative h-[45%] w-full overflow-visible rounded-3xl">
                    <img
                        src="/wp.jpg"
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-[20%] z-10 -translate-y-3/5">
                        {/* Center Hanger / Holding Line */}
                        {/* Positioned dead center horizontally. 'z-0' puts it behind the spiral, and '-top-4' pushes it up to look like a wall mount. */}
                        <div className="absolute left-1/2 -translate-x-1/2 w-1.5 h-6 bg-slate-800 rounded-full shadow-md z-0" />

                        {/* Spiral Binding */}
                        <img
                            src="/spiral.png"
                            alt="spiral"
                            className="w-full h-full object-contain drop-shadow-md relative z-10"
                        />
                    </div>
                    <div className="absolute bottom-4 left-4 w-[45%] max-w-[220px] rounded-2xl overflow-hidden z-20 shadow-lg border border-white/10">
                        {/* Background Image */}
                        <img
                            src="/wp.jpg"
                            alt="card-bg"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* Overlay (for readability) */}
                        <div className="absolute inset-0 bg-slate-50/10 backdrop-blur-[3px]" />
                        {/* Content */}
                        <div className="relative z-10 p-5 flex flex-col justify-center items-start">
                            <p className="text-base md:text-lg font-bold tracking-widest leading-none text-gray-100 mb-1">
                                {format(currentDate, "yyyy")}
                            </p>
                            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-white">
                                {format(currentDate, "MMMM").toUpperCase()}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* 2. BOTTOM SECTION: Notes and Calendar */}
                <div className="flex-1 flex flex-row p-4 md:p-8 gap-4 md:gap-8 bg-white rounded-b-3xl">
                    {/* Notes Column */}
                    <div className="w-[35%] flex flex-col">
                        <h3 className="text-[10px] md:text-xs font-black uppercase text-gray-900 mb-4 tracking-widest">
                            Notes{" "}
                            <span className="text-gray-400 font-normal normal-case block mt-1">
                                {format(activeDate, "MMM d")}
                            </span>
                        </h3>
                        <div className="flex-1 relative">
                            <textarea
                                value={currentNote}
                                onChange={handleNoteChange}
                                placeholder="Add note..."
                                // Removed responsive leading (md:leading-[32px]) so it stays locked to our 28px background grid.
                                // Added pt-1 (padding-top) to perfectly seat the text baseline onto the printed lines.
                                className="w-full h-full resize-none focus:outline-none text-[15px] text-gray-700 bg-transparent pt-[2px]"
                                style={{
                                    // 1. Lock line-height perfectly to background grid
                                    lineHeight: "28px",
                                    // 2. Darkened the hex code to #9ca3af (Tailwind gray-400) for better visibility
                                    backgroundImage:
                                        "linear-gradient(transparent, transparent 27px, #9ca3af 27px, #9ca3af 28px)",
                                    backgroundSize: "100% 28px",
                                    // 3. This ensures the lines scroll *with* the text if the notes get long
                                    backgroundAttachment: "local",
                                }}
                            />
                        </div>
                    </div>

                    {/* Calendar Column */}
                    <div className="flex-1 flex flex-col">
                        <div className="grid grid-cols-7 mb-4">
                            {[
                                "MON",
                                "TUE",
                                "WED",
                                "THU",
                                "FRI",
                                "SAT",
                                "SUN",
                            ].map((day, i) => (
                                <span
                                    key={day}
                                    className={`text-[9px] md:text-[10px] font-bold text-center ${
                                        i >= 5
                                            ? "text-[#1A8ECB]"
                                            : "text-gray-400"
                                    }`}
                                >
                                    {day}
                                </span>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 grid-rows-6 gap-y-1 flex-1">
                            {days.map((day, idx) => {
                                // Range Boolean logic restored
                                const isStart =
                                    startDate && isSameDay(day, startDate);
                                const isEnd =
                                    endDate && isSameDay(day, endDate);
                                const inRange =
                                    startDate &&
                                    endDate &&
                                    isAfter(day, startDate) &&
                                    isBefore(day, endDate);

                                const currentMonth = isSameMonth(
                                    day,
                                    currentDate
                                );
                                const isWeekend =
                                    day.getDay() === 0 || day.getDay() === 6;

                                // Notes logic
                                const dayKey = format(day, "yyyy-MM-dd");
                                const hasNote =
                                    notes[dayKey] &&
                                    notes[dayKey].trim() !== "";
                                const isActiveNoteDay = isSameDay(
                                    day,
                                    activeDate
                                );

                                return (
                                    <div
                                        key={idx}
                                        onClick={() => handleDateClick(day)}
                                        className="relative flex items-center justify-center cursor-pointer group"
                                    >
                                        {/* Range Highlights restored */}
                                        {inRange && (
                                            <div className="absolute inset-0 bg-[#1A8ECB]/10 z-0" />
                                        )}
                                        {isStart && endDate && (
                                            <div className="absolute right-0 w-1/2 h-[80%] bg-[#1A8ECB]/10 z-0" />
                                        )}
                                        {isEnd && (
                                            <div className="absolute left-0 w-1/2 h-[80%] bg-[#1A8ECB]/10 z-0" />
                                        )}

                                        {/* Day Circle */}
                                        <div
                                            className={`
                                            z-10 w-7 h-7 md:w-9 md:h-9 flex flex-col items-center justify-center rounded-full text-[11px] md:text-sm font-bold transition-all relative
                                            ${
                                                isStart || isEnd
                                                    ? "bg-[#1A8ECB] text-white shadow-lg scale-110"
                                                    : ""
                                            }
                                            ${
                                                !isStart &&
                                                !isEnd &&
                                                currentMonth
                                                    ? isWeekend
                                                        ? "text-[#1A8ECB]"
                                                        : "text-gray-800"
                                                    : ""
                                            }
                                            ${
                                                !currentMonth
                                                    ? "text-gray-300"
                                                    : ""
                                            }
                                            ${
                                                !isStart && !isEnd
                                                    ? "hover:bg-gray-100"
                                                    : ""
                                            }
                                            ${
                                                isActiveNoteDay &&
                                                !isStart &&
                                                !isEnd
                                                    ? "ring-2 ring-[#1A8ECB]/50"
                                                    : ""
                                            } 
                                        `}
                                        >
                                            {format(day, "d")}

                                            {/* Note indicator dot */}
                                            {hasNote && !(isStart || isEnd) && (
                                                <span className="absolute bottom-[2px] w-1 h-1 bg-[#1A8ECB] rounded-full"></span>
                                            )}
                                            {hasNote && (isStart || isEnd) && (
                                                <span className="absolute bottom-[2px] w-1 h-1 bg-white rounded-full"></span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
