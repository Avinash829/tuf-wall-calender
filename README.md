
# 🗓️ Interactive Wall Calendar Component

A highly interactive, responsive, and aesthetically polished calendar component inspired by physical wall calendars. Built to demonstrate strong frontend architecture, clean state management, and pixel-perfect UI/UX design.

**🔗 [Live Demo](https://tuf-wall-calender-avinash.pages.dev/)** **📹 [Video Walkthrough](https://www.loom.com/share/aa51ad1988b24d78bf486b33989cbd8c)**

---

## ✨ Core Features

* **Wall Calendar Aesthetic:** Features a prominent, dynamic hero image that changes based on the current month, complete with a physical "spiral ring" design element and a sleek glassmorphism overlay for the year/month header.
* **Intuitive Date Range Selection:** Users can click to select a start date and an end date. The UI updates instantly with clear, accessible visual states (highlighted endpoints and a subtle connected background for dates in between).
* **Integrated Sticky Notes:** A functional, ruled-paper style notes section. Notes are scoped to specific dates and securely persisted on the client using `localStorage`. Days with attached notes display a subtle indicator dot on the calendar grid.
* **Fully Responsive (Mobile-First):** * **Desktop:** Displays a clean, side-by-side or well-proportioned layout utilizing the screen real estate.
  * **Mobile:** Gracefully collapses into a highly readable, vertically stacked layout optimized for touch targets.

---

## 🚀 "Creative Liberty" & Polish

Beyond the core requirements, this component includes several UX enhancements:

* **Smooth Animations:** Custom `@keyframes` fade animations trigger cleanly when switching months to make the image transitions feel organic rather than abrupt.
* **Smart Date Navigation:** Clicking a date outside the currently viewed month automatically navigates the calendar to that month.
* **Visual Hierarchy:** Weekends are visually distinguished, and out-of-month dates are muted to keep the user focused on the active data.

---

## 🏗️ Architectural Decisions

To ensure the codebase is maintainable, scalable, and production-ready, the component is built with a strict separation of concerns:

* **`useCalendarState` (Custom Hook):** All complex date math, local storage syncing, and state transitions are abstracted into a custom hook. This keeps the React components pure and focused solely on rendering UI.
* **Modular Component Structure:** The UI is broken down into highly focused sub-components (`CalendarHeader`, `NotesSection`, `CalendarDay`). This prevents monolithic "prop drilling" and makes unit testing trivial.
* **Memoization:** Date generation logic (`eachDayOfInterval`) is wrapped in `useMemo` to prevent expensive re-calculations on unrelated renders (like typing in the notes field).
* **Utility-First Styling:** Tailwind CSS is used extensively to manage responsive breakpoints (`sm:`, `md:`) without writing bloated custom media queries, keeping the bundle size small and the styles directly coupled to the markup.

---

## 💻 Tech Stack

* **Framework:** React (Next.js / Vite)
* **Styling:** Tailwind CSS
* **Date Utility:** `date-fns` *(Chosen over native JS dates or Moment.js for its immutability, modularity, and tree-shaking capabilities).*
* **Persistence:** `localStorage` API

---

## 🛠️ Local Setup & Installation

To run this project locally, ensure you have Node.js installed, then follow these steps:

**1. Clone the repository:**
```bash
git clone [https://github.com/Avinash829/tuf-wall-calender.git](https://github.com/Avinash829/tuf-wall-calender.git)
cd tuf-wall-calender
2. Install dependencies:

Bash
npm install
3. Start the development server:

Bash
npm run dev
4. Open your browser: Navigate to http://localhost:5173 (or the port provided in your terminal).
