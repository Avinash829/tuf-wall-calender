import { useCalendarState } from "../useCalendarState";
import { CalendarHeader } from "../components/CalendarHeader";
import { NotesSection } from "../components/NotesSection";
import { CalendarDay } from "../components/CalendarDay";
import { DAYS_OF_WEEK } from "../constants/constants";

export default function Calendar() {
    const {
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
    } = useCalendarState();

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-200 p-3 sm:p-6 md:p-10 font-sans">
            <style>{`
                @keyframes smoothFade {
                    from { opacity: 0.3; transform: scale(1.02); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade {
                    animation: smoothFade 0.4s ease-out forwards;
                }
            `}</style>

            <div className="bg-gray-50 shadow-2xl shadow-gray-400 w-full max-w-[480px] sm:aspect-[1/1.4] min-h-[650px] sm:min-h-0 flex flex-col relative rounded-3xl z-0">
                <CalendarHeader
                    currentDate={currentDate}
                    onPrevMonth={handlePrevMonth}
                    onNextMonth={handleNextMonth}
                />

                <div className="flex-1 flex flex-col sm:flex-row p-4 sm:p-6 md:p-8 gap-5 sm:gap-6 md:gap-8 bg-white rounded-b-3xl z-10">
                    <NotesSection
                        activeDate={activeDate}
                        currentNote={currentNote}
                        onNoteChange={handleNoteChange}
                    />

                    <div className="flex-1 flex flex-col justify-between">
                        <div className="grid grid-cols-7 mb-2 sm:mb-4">
                            {DAYS_OF_WEEK.map((day, i) => (
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

                        <div
                            key={`grid-${currentDate.getMonth()}`}
                            className="grid grid-cols-7 grid-rows-6 gap-y-1 sm:gap-y-1.5 flex-1 items-center animate-fade"
                        >
                            {days.map((day, idx) => (
                                <CalendarDay
                                    key={idx}
                                    day={day}
                                    currentDate={currentDate}
                                    startDate={startDate}
                                    endDate={endDate}
                                    activeDate={activeDate}
                                    notes={notes}
                                    onClick={handleDateClick}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
