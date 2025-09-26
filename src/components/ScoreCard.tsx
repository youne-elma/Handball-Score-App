import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Plus, Minus, Clock } from "lucide-react";

interface ScoreCardProps {
  teamName: string;
  score: number;
  sets: number;
  timeouts: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onTimeout: () => void;
  side: 'left' | 'right';
}

export function ScoreCard({ teamName, score, sets, timeouts, onIncrement, onDecrement, onTimeout, side }: ScoreCardProps) {
  return (
    <Card className="p-6 bg-gradient-to-b from-white to-red-50 border-2 border-red-200 shadow-lg relative overflow-hidden">
      {/* Bright accent corner */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 transform rotate-45 translate-x-4 -translate-y-4"></div>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-bold text-red-900 tracking-wide">{teamName}</h2>
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Sets: {sets}
          </Badge>
        </div>
        
        <div className="text-6xl font-bold text-red-800 bg-white rounded-xl px-6 py-4 shadow-inner min-w-[120px] text-center border-2 border-yellow-300">
          {score}
        </div>
        
        <div className="flex space-x-3">
          <Button
            onClick={onDecrement}
            variant="outline"
            size="lg"
            className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white border-red-700 shadow-md"
            disabled={score <= 0}
          >
            <Minus className="w-6 h-6" />
          </Button>
          
          <Button
            onClick={onIncrement}
            size="lg"
            className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-md border-2 border-yellow-400"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <Button
            onClick={onTimeout}
            variant="outline"
            size="sm"
            className="bg-white hover:bg-red-50 text-red-700 border-red-300 shadow-md"
            disabled={timeouts <= 0}
          >
            <Clock className="w-4 h-4 mr-1" />
            Timeout
          </Button>
          <div className="flex space-x-1">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < timeouts ? 'bg-red-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}