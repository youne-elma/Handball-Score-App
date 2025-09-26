import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Play, Pause, RotateCcw } from "lucide-react";

export function BreakTimer() {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(120);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const setCustomTime = (minutes: number) => {
    const seconds = minutes * 60;
    setInitialTime(seconds);
    setTimeLeft(seconds);
    setIsRunning(false);
  };

  const progress = timeLeft > 0 ? (timeLeft / initialTime) * 100 : 0;

  return (
    <Card className="p-6 bg-gradient-to-b from-white to-red-50 border-2 border-red-200 shadow-lg relative overflow-hidden">
      {/* Bright accent corner */}
      <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 transform rotate-45 -translate-x-4 -translate-y-4"></div>
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-lg font-bold text-red-900 tracking-wide">BREAK TIME</h2>
        
        <div className="relative">
          <div className="text-5xl font-bold text-red-800 bg-white rounded-xl px-8 py-4 shadow-inner min-w-[160px] text-center border-2 border-yellow-300">
            {formatTime(timeLeft)}
          </div>
          <div 
            className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-b-xl transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex space-x-3">
          <Button
            onClick={toggleTimer}
            size="lg"
            className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-md border-2 border-yellow-400"
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>
          
          <Button
            onClick={resetTimer}
            variant="outline"
            size="lg"
            className="w-12 h-12 rounded-full bg-white hover:bg-red-50 text-red-700 border-red-300 shadow-md"
          >
            <RotateCcw className="w-6 h-6" />
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button
            onClick={() => setCustomTime(0.5)}
            variant="outline"
            size="sm"
            className="bg-red-100 hover:bg-red-200 text-red-800 border-red-300"
          >
            30sec
          </Button>
          <Button
            onClick={() => setCustomTime(1)}
            variant="outline"
            size="sm"
            className="bg-red-100 hover:bg-red-200 text-red-800 border-red-300"
          >
            1min
          </Button>
          <Button
            onClick={() => setCustomTime(2)}
            variant="outline"
            size="sm"
            className="bg-red-100 hover:bg-red-200 text-red-800 border-red-300"
          >
            2min
          </Button>
          <Button
            onClick={() => setCustomTime(5)}
            variant="outline"
            size="sm"
            className="bg-red-100 hover:bg-red-200 text-red-800 border-red-300"
          >
            5min
          </Button>
        </div>
      </div>
    </Card>
  );
}