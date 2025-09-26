import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Target } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HandballLandingPageProps {
  onStartScoring: () => void;
}

export function HandballLandingPage({
  onStartScoring,
}: HandballLandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 flex items-center justify-center p-4">
      <Card className="p-12 bg-gradient-to-b from-white to-gray-50 border-2 border-red-500 shadow-2xl max-w-md w-full">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 p-1 shadow-lg">
              <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                <img
                  src="/handball-logo.jpg"
                  alt="Handball Logo"
                  className="w-24 h-24 object-contain"
                />
              </div>
            </div>
            {/* Decorative handball icon */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Target className="w-5 h-5 text-black" />
            </div>
          </div>

          {/* Club Name */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-black tracking-wide">
              ARR HANDBAll
            </h1>
            <h2 className="text-xl font-semibold text-red-600">CLUB</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mx-auto"></div>
          </div>

          {/* Description */}
          <p className="text-center text-gray-700 text-sm leading-relaxed">
            Système de Score Officiel Handball
          </p>

          {/* Start Button */}
          <Button
            onClick={onStartScoring}
            size="lg"
            className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-orange-500"
          >
            <Target className="w-5 h-5 mr-2" />
            Commencer le Score
          </Button>

          {/* Decorative elements */}
          <div className="flex space-x-2 opacity-50">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
        </div>
      </Card>
    </div>
  );
}
