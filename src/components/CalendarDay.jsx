import { format, isSameDay, isAfter, isBefore, isSameMonth } from "date-fns";

export function CalendarDay({
    day,
    currentDate,
    startDate,
    endDate,
    activeDate,
    notes,
    onClick,
}) {
    const isStart = startDate && isSameDay(day, startDate);
    const isEnd = endDate && isSameDay(day, endDate);
    const inRange =
        startDate &&
        endDate &&
        isAfter(day, startDate) &&
        isBefore(day, endDate);
    const currentMonth = isSameMonth(day, currentDate);
    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
    const dayKey = format(day, "yyyy-MM-dd");
    const hasNote = notes[dayKey] && notes[dayKey].trim() !== "";
    const isActiveNoteDay = isSameDay(day, activeDate);

    return (
        <div
            onClick={() => onClick(day)}
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
                        !isStart && !isEnd && currentMonth
                            ? isWeekend
                                ? "text-[#1A8ECB]"
                                : "text-gray-800"
                            : ""
                    }
                    ${!currentMonth ? "text-gray-300" : ""}
                    ${!isStart && !isEnd ? "hover:bg-gray-100" : ""}
                    ${
                        isActiveNoteDay && !isStart && !isEnd
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
}
