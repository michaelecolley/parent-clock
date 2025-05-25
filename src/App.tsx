import { useState, useEffect } from "react";
import { Clock, Moon, Sun, Coffee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeUntil5am, setTimeUntil5am] = useState("");
  const [timeUntil9pm, setTimeUntil9pm] = useState("");
  const [hoursOfSleep, setHoursOfSleep] = useState(0);
  const [sleepStatus, setSleepStatus] = useState<"excellent" | "good" | "okay" | "poor">("excellent");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);
      const next5am = new Date();
      next5am.setHours(5, 0, 0, 0);
      if (now.getHours() >= 5) {
        next5am.setDate(next5am.getDate() + 1);
      }
      const timeDiff = next5am.getTime() - now.getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      setTimeUntil5am(`${hours}h ${minutes}m ${seconds}s`);
      const sleepHours = timeDiff / (1000 * 60 * 60);
      setHoursOfSleep(sleepHours);
      if (sleepHours >= 8) {
        setSleepStatus("excellent");
      } else if (sleepHours >= 7) {
        setSleepStatus("good");
      } else if (sleepHours >= 6) {
        setSleepStatus("okay");
      } else {
        setSleepStatus("poor");
      }
      const next9pm = new Date();
      next9pm.setHours(21, 0, 0, 0);
      if (now.getHours() >= 21) {
        next9pm.setDate(next9pm.getDate() + 1);
      }
      const diff9pm = next9pm.getTime() - now.getTime();
      const hours9 = Math.floor(diff9pm / (1000 * 60 * 60));
      const minutes9 = Math.floor((diff9pm % (1000 * 60 * 60)) / (1000 * 60));
      const seconds9 = Math.floor((diff9pm % (1000 * 60)) / 1000);
      setTimeUntil9pm(`${hours9}h ${minutes9}m ${seconds9}s`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (sleepStatus) {
      case "excellent":
        return "bg-green-500";
      case "good":
        return "bg-blue-500";
      case "okay":
        return "bg-yellow-500";
      case "poor":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = () => {
    switch (sleepStatus) {
      case "excellent":
        return "Perfect! 8+ hours 🌟";
      case "good":
        return "Good! 7+ hours ✨";
      case "okay":
        return "Okay, 6+ hours 😴";
      case "poor":
        return "Too late! Less than 6 hours 😰";
      default:
        return "";
    }
  };

  const getMotivationalMessage = () => {
    if (hoursOfSleep >= 8) {
      return "You're on track for excellent sleep! Your 5am self will thank you. 🌅";
    } else if (hoursOfSleep >= 7) {
      return "Still time for good sleep! Get to bed soon for that early rise. ⏰";
    } else if (hoursOfSleep >= 6) {
      return "Sleep window is closing! Consider going to bed now. 🛏️";
    } else {
      return "It's getting very late! Every minute counts now. 💤";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Moon className="h-6 w-6" />
            Bedtime Countdown
            <Sun className="h-6 w-6" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Time */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-5 w-5" />
              <span className="text-sm opacity-80">Current Time</span>
            </div>
            <div className="text-3xl font-mono font-bold">
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>
          </div>
          {/* Countdown to 5am */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Coffee className="h-5 w-5" />
              <span className="text-sm opacity-80">Time Until 5:00 AM</span>
            </div>
            <div className="text-4xl font-mono font-bold text-yellow-300">{timeUntil5am}</div>
          </div>
          {/* Sleep Hours */}
          <div className="text-center">
            <div className="text-sm opacity-80 mb-2">Potential Sleep Hours</div>
            <div className="text-2xl font-bold mb-2">{hoursOfSleep.toFixed(1)} hours</div>
            <Badge className={`${getStatusColor()} text-white border-0`}>{getStatusText()}</Badge>
            {/* Countdown to 9pm */}
            <div className="mt-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-blue-300" />
                <span className="text-sm opacity-80">Time Until 9:00 PM</span>
              </div>
              <div className="text-2xl font-mono font-bold text-blue-300">{timeUntil9pm}</div>
            </div>
          </div>
          {/* Motivational Message */}
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-sm leading-relaxed">{getMotivationalMessage()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
