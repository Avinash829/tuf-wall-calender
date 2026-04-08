import { format } from "date-fns";

export function NotesSection({ activeDate, currentNote, onNoteChange }) {
    return (
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
                    onChange={onNoteChange}
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
    );
}
