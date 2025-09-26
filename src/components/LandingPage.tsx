import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Volleyball } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LandingPageProps {
  onStartScoring: () => void;
}

export function LandingPage({ onStartScoring }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-red-600 to-red-800 flex items-center justify-center p-4">
      <Card className="p-12 bg-gradient-to-b from-white to-red-50 border-2 border-red-200 shadow-2xl max-w-md w-full">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-1 shadow-lg">
              <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1716223980506-3206d9b03f64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xsZXliYWxsJTIwY2x1YiUyMGxvZ28lMjBzcG9ydHN8ZW58MXx8fHwxNzU4NTUzMzYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="AMAL Taroudant Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            {/* Decorative volleyball icon */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <Volleyball className="w-5 h-5 text-red-700" />
            </div>
          </div>

          {/* Club Name */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-red-800 tracking-wide">AMAL</h1>
            <h2 className="text-xl font-semibold text-red-600">TAROUDANT</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto"></div>
          </div>

          {/* Description */}
          <p className="text-center text-red-700 text-sm leading-relaxed">
            Official Volleyball Club Scoring System
          </p>

          {/* Start Button */}
          <Button
            onClick={onStartScoring}
            size="lg"
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-yellow-400"
          >
            <Volleyball className="w-5 h-5 mr-2" />
            Start Scoring
          </Button>

          {/* Decorative elements */}
          <div className="flex space-x-2 opacity-50">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </Card>
    </div>
  );
}