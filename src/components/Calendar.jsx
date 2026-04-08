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
    addMonths,
    subMonths,
} from "date-fns";

// Array of 12 beautiful seasonal images from Unsplash for each month
const monthImages = [
    "/2.avif",
    "/3.jpg",
    "/4.avif",
    "/april.jpg", // Apr (Bloom)
    "/1.avif", // May (Hills)
    "/6.jpg", // Jun (Summer Beach)
    "/1.jpg", // Jul (Ocean)
    "/2.avif", // Aug (Sunset)
    "/3.jpg", // Sep (Autumn)
    "/april.jpg", // Oct (Fall colors)
    "/rain.avif", // Nov (Foggy)
    "/5.jpg", // Dec (Mountains)
];

export default function Calendar() {
    // Note: We now use setCurrentDate to update the viewed month
    const [currentDate, setCurrentDate] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [activeDate, setActiveDate] = useState(new Date());
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

    // Navigation Handlers
    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    // Handle clicks for BOTH range selection and setting the active note day
    const handleDateClick = (day) => {
        setActiveDate(day);

        // If clicking a date outside the current month, auto-navigate to that month
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

    // Get the dynamic image based on the current month index (0-11)
    const currentMonthImage = monthImages[currentDate.getMonth()];

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-200 p-3 sm:p-6 md:p-10 font-sans">
            {/* Custom CSS for smooth fading transitions */}
            <style>{`
                @keyframes smoothFade {
                    from { opacity: 0.3; transform: scale(1.02); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade {
                    animation: smoothFade 0.4s ease-out forwards;
                }
            `}</style>

            <div className="bg-gray-50 shadow-2xl shadow-gray-400/50 w-full max-w-[480px] sm:aspect-[1/1.4] min-h-[650px] sm:min-h-0 flex flex-col relative rounded-3xl z-0">
                {/* 1. TOP SECTION: Hero Image & Geometric Overlay */}
                <div className="relative shrink-0 h-[220px] sm:h-[40%] md:h-[45%] w-full rounded-t-3xl z-10 overflow-visible bg-slate-800">
                    <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 w-1.5 h-6 sm:h-8 bg-slate-800 rounded-full shadow-md z-0" />

                    <div className="absolute -top-4 sm:-top-6 left-0 w-full h-[30px] sm:h-[40px] z-20">
                        <img
                            src="/spiral.png"
                            alt="spiral"
                            className="w-full h-full object-cover sm:object-contain drop-shadow-md"
                        />
                    </div>

                    {/* Background Image - The 'key' attribute forces React to remount this element when the month changes, triggering the custom fade animation */}
                    <img
                        key={`bg-${currentDate.getMonth()}`}
                        src={currentMonthImage}
                        alt="Seasonal Background"
                        className="absolute inset-0 w-full h-full object-cover rounded-t-3xl animate-fade"
                    />

                    {/* Overlay Module */}
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-[60%] sm:w-[50%] max-w-[240px] rounded-2xl overflow-hidden z-20 shadow-lg border border-white/10">
                        <img
                            key={`overlay-bg-${currentDate.getMonth()}`}
                            src={currentMonthImage}
                            alt="card-bg"
                            className="absolute inset-0 w-full h-full object-cover animate-fade"
                        />
                        <div className="absolute inset-0 bg-slate-900/60 sm:bg-slate-900/40 backdrop-blur-md sm:backdrop-blur-[5px]" />

                        <div className="relative z-10 p-4 sm:p-5 flex flex-col justify-center items-start w-full">
                            {/* Year and Navigation controls */}
                            <div className="flex justify-between items-center w-full mb-1">
                                <p className="text-sm sm:text-base md:text-lg font-bold tracking-widest leading-none text-gray-200">
                                    {format(currentDate, "yyyy")}
                                </p>
                                <div className="flex gap-1.5 sm:gap-2">
                                    <button
                                        onClick={handlePrevMonth}
                                        className="text-white bg-white/10 hover:bg-white/30 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center transition-all pb-1 hover:scale-110 active:scale-95"
                                    >
                                        &lsaquo;
                                    </button>
                                    <button
                                        onClick={handleNextMonth}
                                        className="text-white bg-white/10 hover:bg-white/30 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center transition-all pb-1 hover:scale-110 active:scale-95"
                                    >
                                        &rsaquo;
                                    </button>
                                </div>
                            </div>
                            {/* Month Header (animated on change) */}
                            <h1
                                key={`title-${currentDate.getMonth()}`}
                                className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-white animate-fade"
                            >
                                {format(currentDate, "MMMM").toUpperCase()}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* 2. BOTTOM SECTION: Notes and Calendar */}
                <div className="flex-1 flex flex-col sm:flex-row p-4 sm:p-6 md:p-8 gap-5 sm:gap-6 md:gap-8 bg-white rounded-b-3xl z-10">
                    {/* Notes Column */}
                    <div className="w-full sm:w-[35%] h-[120px] sm:h-auto flex flex-col shrink-0">
                        <h3 className="text-[10px] md:text-xs font-black uppercase text-gray-900 mb-2 sm:mb-4 tracking-widest flex justify-between items-end sm:block">
                            <span>Notes</span>
                            <span className="text-gray-400 font-normal normal-case sm:block mt-1">
                                {format(activeDate, "MMM d")}
                            </span>
                        </h3>
                        <div className="flex-1 relative overflow-hidden">
                            <textarea
                                value={currentNote}
                                onChange={handleNoteChange}
                                placeholder="Add note..."
                                className="w-full h-full resize-none focus:outline-none text-[14px] sm:text-[15px] text-gray-700 bg-transparent pt-[2px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                                style={{
                                    lineHeight: "28px",
                                    backgroundImage:
                                        "linear-gradient(transparent, transparent 27px, #9ca3af 27px, #9ca3af 28px)",
                                    backgroundSize: "100% 28px",
                                    backgroundAttachment: "local",
                                }}
                            />
                        </div>
                    </div>

                    {/* Calendar Column */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div className="grid grid-cols-7 mb-2 sm:mb-4">
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
                                    className={`text-[9px] sm:text-[10px] font-bold text-center ${
                                        i >= 5
                                            ? "text-[#1A8ECB]"
                                            : "text-gray-400"
                                    }`}
                                >
                                    {day}
                                </span>
                            ))}
                        </div>

                        {/* Calendar Grid - Re-animates when month changes */}
                        <div
                            key={`grid-${currentDate.getMonth()}`}
                            className="grid grid-cols-7 grid-rows-6 gap-y-1 sm:gap-y-1.5 flex-1 items-center animate-fade"
                        >
                            {days.map((day, idx) => {
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
                                        className="relative flex items-center justify-center cursor-pointer group w-full h-full min-h-[32px]"
                                    >
                                        {/* Range Highlights */}
                                        {inRange && (
                                            <div className="absolute inset-0 bg-[#1A8ECB]/10 z-0" />
                                        )}
                                        {isStart && endDate && (
                                            <div className="absolute right-0 w-1/2 h-[70%] sm:h-[80%] bg-[#1A8ECB]/10 z-0" />
                                        )}
                                        {isEnd && (
                                            <div className="absolute left-0 w-1/2 h-[70%] sm:h-[80%] bg-[#1A8ECB]/10 z-0" />
                                        )}

                                        {/* Day Circle */}
                                        <div
                                            className={`
                                            z-10 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex flex-col items-center justify-center rounded-full text-[12px] sm:text-[13px] md:text-sm font-bold transition-all relative
                                            ${
                                                isStart || isEnd
                                                    ? "bg-[#1A8ECB] text-white shadow-md scale-105 sm:scale-110"
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
                                                <span className="absolute bottom-[2px] sm:bottom-[3px] w-1 h-1 bg-[#1A8ECB] rounded-full"></span>
                                            )}
                                            {hasNote && (isStart || isEnd) && (
                                                <span className="absolute bottom-[2px] sm:bottom-[3px] w-1 h-1 bg-white rounded-full"></span>
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
