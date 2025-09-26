import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

interface HandballMatchTimerProps {
  onHalfTimeEnd?: () => void;
}

export function HandballMatchTimer({ onHalfTimeEnd }: HandballMatchTimerProps) {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [currentHalf, setCurrentHalf] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            if (currentHalf === 1) {
              // End of first half
              onHalfTimeEnd?.();
              return 0;
            } else {
              // End of match
              return 0;
            }
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
  }, [isRunning, timeLeft, currentHalf, onHalfTimeEnd]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetMatch = () => {
    setIsRunning(false);
    setTimeLeft(1800);
    setCurrentHalf(1);
  };

  const startSecondHalf = () => {
    setCurrentHalf(2);
    setTimeLeft(1800);
    setIsRunning(false);
  };

  const addTime = (minutes: number) => {
    setTimeLeft(prev => prev + (minutes * 60));
  };

  const progress = timeLeft > 0 ? (timeLeft / 1800) * 100 : 0;

  return (
    <Card className="p-6 bg-gradient-to-b from-white to-gray-50 border-2 border-black shadow-lg relative overflow-hidden">
      {/* Bright accent corner */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 transform rotate-45 translate-x-4 -translate-y-4"></div>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-2">
          <Timer className="w-5 h-5 text-black" />
          <h2 className="text-lg font-bold text-black tracking-wide">MI-TEMPS {currentHalf}</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge variant="default" className="bg-black text-white">
            {currentHalf === 1 ? "Première Mi-temps" : "Seconde Mi-temps"}
          </Badge>
        </div>
        
        <div className="relative">
          <div className="text-5xl font-bold text-black bg-white rounded-xl px-8 py-4 shadow-inner min-w-[160px] text-center border-2 border-black">
            {formatTime(timeLeft)}
          </div>
          <div 
            className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-black to-red-600 rounded-b-xl transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex space-x-3">
          <Button
            onClick={toggleTimer}
            size="lg"
            className="w-12 h-12 rounded-full bg-gradient-to-r from-black to-red-600 hover:from-gray-800 hover:to-red-700 text-white shadow-md border-2 border-orange-400"
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>
          
          <Button
            onClick={resetMatch}
            variant="outline"
            size="lg"
            className="w-12 h-12 rounded-full bg-white hover:bg-gray-50 text-black border-black shadow-md"
          >
            <RotateCcw className="w-6 h-6" />
          </Button>
        </div>

        {timeLeft === 0 && currentHalf === 1 && (
          <Button
            onClick={startSecondHalf}
            variant="outline"
            size="sm"
            className="bg-orange-100 hover:bg-orange-200 text-orange-800 border-orange-400"
          >
            Commencer 2ème Mi-temps
          </Button>
        )}
        
        <div className="flex space-x-2">
          <Button
            onClick={() => addTime(1)}
            variant="outline"
            size="sm"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300 text-xs"
          >
            +1min
          </Button>
          <Button
            onClick={() => addTime(5)}
            variant="outline"
            size="sm"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300 text-xs"
          >
            +5min
          </Button>
          <Button
            onClick={() => setTimeLeft(1800)}
            variant="outline"
            size="sm"
            className="bg-red-100 hover:bg-red-200 text-red-800 border-red-300 text-xs"
          >
            Reset 30min
          </Button>
        </div>
      </div>
    </Card>
  );
}