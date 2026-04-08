import { useState } from "react";
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
    const [note, setNote] = useState("");

    // Calendar Calculations
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    const handleDateClick = (day) => {
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

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-200 p-4 md:p-10 font-sans">
            {/* Main Container - Aspect Ratio Box for consistent scaling */}
            <div className="bg-white shadow-2xl w-full max-w-[450px] aspect-[1/1.4] flex flex-col relative overflow-hidden">
                {/* 1. TOP SECTION: Hero Image & Geometric Overlay */}
                <div className="relative h-[45%] w-full overflow-hidden">
                    <img
                        src="/wp.jpg"
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* The Blue & White Sharp Geometric Overlay */}
                    <svg
                        viewBox="0 0 500 250"
                        className="absolute bottom-[-2px] left-0 w-full h-auto drop-shadow-md"
                        preserveAspectRatio="none"
                    >
                        {/* Blue Shape */}
                        <path
                            d="M0,150 
                            L160,220 
                            Q180,230 200,220 
                            L500,100 
                            L500,250 
                            L0,250 
                            Z"
                            fill="#1A8ECB"
                        />
                        {/* White Cutting Shape */}
                        {/* <path
                            d="M0,240 L100,100 L350,180 L500,220 L500,250 L0,250 Z"
                            fill="white"
                        /> */}
                    </svg>

                    {/* Header Text */}
                    <div className="absolute bottom-[18%] right-[8%] text-right text-white z-10">
                        <p className="text-xl md:text-2xl font-light tracking-widest leading-none">
                            {format(currentDate, "yyyy")}
                        </p>
                        <h1 className="text-2xl md:text-4xl font-black tracking-tighter leading-tight">
                            {format(currentDate, "MMMM").toUpperCase()}
                        </h1>
                    </div>
                </div>

                {/* 2. BOTTOM SECTION: Notes and Calendar */}
                <div className="flex-1 flex flex-row p-4 md:p-8 gap-4 md:gap-8 bg-white">
                    {/* Notes Column */}
                    <div className="w-[35%] flex flex-col">
                        <h3 className="text-[10px] md:text-xs font-black uppercase text-gray-900 mb-4 tracking-widest">
                            Notes
                        </h3>
                        <div className="flex-1 relative">
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full h-full resize-none focus:outline-none text-[12px] leading-[28px] md:leading-[32px] text-gray-600 bg-transparent"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(transparent, transparent 27px, #e5e7eb 27px, #e5e7eb 28px)",
                                    backgroundSize: "100% 28px",
                                    lineHeight: "28px",
                                }}
                            />
                        </div>
                    </div>

                    {/* Calendar Column */}
                    <div className="flex-1 flex flex-col">
                        {/* Days of Week Header */}
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

                                return (
                                    <div
                                        key={idx}
                                        onClick={() => handleDateClick(day)}
                                        className="relative flex items-center justify-center cursor-pointer group"
                                    >
                                        {/* Range Highlight */}
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
                                            z-10 w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-full text-[11px] md:text-sm font-bold transition-all
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
                                        `}
                                        >
                                            {format(day, "d")}
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
