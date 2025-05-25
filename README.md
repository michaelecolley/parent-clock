# Parent Clock

A beautiful, cross-platform bedtime countdown and sleep tracker desktop app built with **React**, **Vite**, **Electron**, and **Tailwind CSS**.

## Features

- **Live Bedtime Countdown:** See exactly how long until your next 5:00 AM wake-up.
- **Potential Sleep Hours:** Instantly know how much sleep you can get if you go to bed now.
- **Sleep Quality Badge:** Get a quick status (Excellent, Good, Okay, Poor) based on your potential sleep.
- **Motivational Messages:** Encouragement and tips for healthy sleep habits.
- **9:00 PM Countdown:** See how long until your ideal bedtime for a full 8 hours of sleep.
- **Modern UI:** Responsive, glassy, and colorful interface with live updating timers.
- **Electron-Powered:** Runs as a native app on macOS, Windows, and Linux.

---

## Screenshot

![App Screenshot](./Screenshot%202025-05-25%20at%2009.40.22.png)

---

## Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/michaelecolley/parent-clock.git
cd parent-clock
```

### 2. Install dependencies
```sh
npm install
```

### 3. Run in development mode
Start the Vite dev server:
```sh
npm run dev
```
In another terminal, start Electron:
```sh
npm run electron
```

### 4. Build and package as a desktop app
```sh
npm run dist
```
The installer/executable will be created in the `dist/` directory.

---

## Tech Stack
- React 19
- Vite
- Electron
- Tailwind CSS
- TypeScript

---

## License
MIT
