import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

export function HandballTimer() {
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute by default
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(60);
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
    <Card className="p-6 bg-gradient-to-b from-white to-gray-50 border-2 border-red-500 shadow-lg relative overflow-hidden">
      {/* Bright accent corner */}
      <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 transform rotate-45 -translate-x-4 -translate-y-4"></div>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-black" />
          <h2 className="text-lg font-bold text-black tracking-wide">TEMPS MORT</h2>
        </div>
        
        <div className="relative">
          <div className="text-5xl font-bold text-black bg-white rounded-xl px-8 py-4 shadow-inner min-w-[160px] text-center border-2 border-orange-400">
            {formatTime(timeLeft)}
          </div>
          <div 
            className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-b-xl transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex space-x-3">
          <Button
            onClick={toggleTimer}
            size="lg"
            className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-md border-2 border-orange-400"
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>
          
          <Button
            onClick={resetTimer}
            variant="outline"
            size="lg"
            className="w-12 h-12 rounded-full bg-white hover:bg-gray-50 text-black border-red-400 shadow-md"
          >
            <RotateCcw className="w-6 h-6" />
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button
            onClick={() => setCustomTime(1)}
            variant="outline"
            size="sm"
            className="bg-red-100 hover:bg-red-200 text-red-800 border-red-300"
          >
            1min
          </Button>
          <Button
            onClick={() => setCustomTime(10)}
            variant="outline"
            size="sm"
            className="bg-orange-100 hover:bg-orange-200 text-orange-800 border-orange-300"
          >
            10min
          </Button>
          <Button
            onClick={() => setCustomTime(15)}
            variant="outline"
            size="sm"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300"
          >
            15min
          </Button>
        </div>
      </div>
    </Card>
  );
}