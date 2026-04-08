import { format } from "date-fns";
import { MONTH_IMAGES } from "../constants/constants";

export function CalendarHeader({ currentDate, onPrevMonth, onNextMonth }) {
    const currentMonthImage = MONTH_IMAGES[currentDate.getMonth()];

    return (
        <div className="relative shrink-0 h-[220px] sm:h-[40%] md:h-[45%] w-full rounded-t-3xl z-10 overflow-visible bg-slate-800">
            <div className="absolute -top-5 sm:-top-4 left-1/2 -translate-x-1/2 w-1.5 h-10 sm:h-8 bg-slate-800 rounded-full shadow-md z-0" />

            <div className="absolute -top-4 sm:-top-6 left-0 w-full h-[30px] sm:h-[40px] z-20">
                <img
                    src="/spiral.png"
                    alt="spiral"
                    className="w-full h-full object-cover sm:object-contain drop-shadow-md"
                />
            </div>

            <img
                key={`bg-${currentDate.getMonth()}`}
                src={currentMonthImage}
                alt="Seasonal Background"
                className="absolute inset-0 w-full h-full object-cover rounded-t-3xl animate-fade"
            />

            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-[60%] sm:w-[50%] max-w-[240px] rounded-2xl overflow-hidden z-20 shadow-lg border border-white/10">
                <img
                    key={`overlay-bg-${currentDate.getMonth()}`}
                    src={currentMonthImage}
                    alt="card-bg"
                    className="absolute inset-0 w-full h-full object-cover animate-fade"
                />
                <div className="absolute inset-0 bg-slate-900/60 sm:bg-slate-900/40 backdrop-blur-md sm:backdrop-blur-[5px]" />

                <div className="relative z-10 p-4 sm:p-5 flex flex-col justify-center items-start w-full">
                    <div className="flex justify-between items-center w-full mb-1">
                        <p className="text-sm sm:text-base md:text-lg font-bold tracking-widest leading-none text-gray-200">
                            {format(currentDate, "yyyy")}
                        </p>
                        <div className="flex gap-1.5 sm:gap-2">
                            <button
                                onClick={onPrevMonth}
                                className="text-white bg-white/10 hover:bg-white/30 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center transition-all pb-1 hover:scale-110 active:scale-95"
                            >
                                &lsaquo;
                            </button>
                            <button
                                onClick={onNextMonth}
                                className="text-white bg-white/10 hover:bg-white/30 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center transition-all pb-1 hover:scale-110 active:scale-95"
                            >
                                &rsaquo;
                            </button>
                        </div>
                    </div>
                    <h1
                        key={`title-${currentDate.getMonth()}`}
                        className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-white animate-fade"
                    >
                        {format(currentDate, "MMMM").toUpperCase()}
                    </h1>
                </div>
            </div>
        </div>
    );
}
