import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Eye, EyeOff, Users, PenTool } from "lucide-react";

interface HandballCourtProps {
  homeTeam: string;
  awayTeam: string;
}

export function HandballCourt({ homeTeam, awayTeam }: HandballCourtProps) {
  const [showPlayers, setShowPlayers] = useState(true);
  const [drawingMode, setDrawingMode] = useState(false);

  // Équipe Rouge (Attaque) - Formation 3-3
  const attackingTeam = [
    { id: 1, position: "G", x: 8, y: 50, name: "Gardien" },
    { id: 2, position: "AG", x: 35, y: 30, name: "Arrière Gauche" },
    { id: 3, position: "AC", x: 40, y: 50, name: "Arrière Central" },
    { id: 4, position: "AD", x: 35, y: 70, name: "Arrière Droit" },
    { id: 5, position: "AL", x: 65, y: 25, name: "Ailier Gauche" },
    { id: 6, position: "PIV", x: 75, y: 50, name: "Pivot" },
    { id: 7, position: "AR", x: 65, y: 75, name: "Ailier Droit" },
  ];

  // Équipe Noire (Défense) - Formation 6-0 défensive
  const defendingTeam = [
    { id: 8, position: "G", x: 92, y: 50, name: "Gardien" },
    { id: 9, position: "D1", x: 82, y: 25, name: "Défenseur 1" },
    { id: 10, position: "D2", x: 82, y: 37, name: "Défenseur 2" },
    { id: 11, position: "D3", x: 82, y: 50, name: "Défenseur 3" },
    { id: 12, position: "D4", x: 82, y: 63, name: "Défenseur 4" },
    { id: 13, position: "D5", x: 82, y: 75, name: "Défenseur 5" },
    { id: 14, position: "D6", x: 78, y: 50, name: "Défenseur 6" },
  ];

  const togglePlayers = () => {
    setShowPlayers(!showPlayers);
    if (showPlayers) {
      setDrawingMode(true);
    } else {
      setDrawingMode(false);
    }
  };

  return (
    <Card className="p-4 bg-gradient-to-b from-white to-gray-50 border-2 border-red-500 shadow-lg">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-between w-full max-w-4xl mb-4">
          <h3 className="text-lg font-bold text-black">Terrain de Handball</h3>

          <div className="flex items-center space-x-2">
            <Button
              onClick={togglePlayers}
              variant="outline"
              size="sm"
              className={`${
                showPlayers
                  ? "bg-red-100 hover:bg-red-200 text-red-800 border-red-300"
                  : "bg-orange-100 hover:bg-orange-200 text-orange-800 border-orange-300"
              } transition-all duration-200`}
            >
              {showPlayers ? (
                <>
                  <EyeOff className="w-4 h-4 mr-1" />
                  Masquer Joueurs
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-1" />
                  Afficher Joueurs
                </>
              )}
            </Button>

            {drawingMode && (
              <div className="flex items-center space-x-1 px-3 py-1 bg-orange-200 rounded-lg border border-orange-300">
                <PenTool className="w-4 h-4 text-orange-800" />
                <span className="text-xs font-medium text-orange-800">
                  Mode Tactique
                </span>
              </div>
            )}
          </div>
        </div>

        <div
          className={`relative w-full max-w-4xl bg-green-100 border-4 border-white rounded-lg overflow-hidden ${
            drawingMode ? "cursor-crosshair" : "cursor-default"
          }`}
        >
          {/* Court background */}
          <div className="aspect-[2/1] relative bg-gradient-to-r from-green-200 via-green-100 to-green-200">
            {/* Court lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 200"
            >
              {/* Outer lines */}
              <rect
                x="10"
                y="10"
                width="380"
                height="180"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
              />

              {/* Center line */}
              <line
                x1="200"
                y1="10"
                x2="200"
                y2="190"
                stroke="#ffffff"
                strokeWidth="2"
              />

              {/* Center circle */}
              <circle
                cx="200"
                cy="100"
                r="15"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
              />

              {/* Left goal area (6m) */}
              <path
                d="M 10 60 Q 70 60 70 100 Q 70 140 10 140"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
              />

              {/* Left 9m line */}
              <path
                d="M 10 45 Q 90 45 90 100 Q 90 155 10 155"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeDasharray="5,5"
              />

              {/* Left 7m penalty line */}
              <line
                x1="80"
                y1="95"
                x2="80"
                y2="105"
                stroke="#ffffff"
                strokeWidth="3"
              />

              {/* Right goal area (6m) */}
              <path
                d="M 390 60 Q 330 60 330 100 Q 330 140 390 140"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
              />

              {/* Right 9m line */}
              <path
                d="M 390 45 Q 310 45 310 100 Q 310 155 390 155"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeDasharray="5,5"
              />

              {/* Right 7m penalty line */}
              <line
                x1="320"
                y1="95"
                x2="320"
                y2="105"
                stroke="#ffffff"
                strokeWidth="3"
              />

              {/* Goals */}
              <rect
                x="5"
                y="80"
                width="10"
                height="40"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <rect
                x="385"
                y="80"
                width="10"
                height="40"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </svg>

            {/* Attacking team players (Red) - Only show if showPlayers is true */}
            {showPlayers &&
              attackingTeam.map((player) => (
                <div
                  key={player.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-opacity duration-300"
                  style={{
                    left: `${player.x}%`,
                    top: `${player.y}%`,
                  }}
                >
                  <div className="w-8 h-8 bg-red-600 border-2 border-white rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-xs font-bold">
                      {player.id}
                    </span>
                  </div>
                  <span className="text-xs text-black mt-1 bg-white px-1 rounded opacity-75">
                    {player.position}
                  </span>
                </div>
              ))}

            {/* Defending team players (Black) - Only show if showPlayers is true */}
            {showPlayers &&
              defendingTeam.map((player) => (
                <div
                  key={player.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-opacity duration-300"
                  style={{
                    left: `${player.x}%`,
                    top: `${player.y}%`,
                  }}
                >
                  <div className="w-8 h-8 bg-black border-2 border-white rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-xs font-bold">
                      {player.id}
                    </span>
                  </div>
                  <span className="text-xs text-black mt-1 bg-white px-1 rounded opacity-75">
                    {player.position}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Team legends - Only show if players are visible */}
        {showPlayers && (
          <div className="flex justify-between w-full max-w-4xl mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-600 rounded-full border border-white"></div>
              <span className="text-sm font-medium text-black">
                {homeTeam} (Attaque)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-black rounded-full border border-white"></div>
              <span className="text-sm font-medium text-black">
                {awayTeam} (Défense)
              </span>
            </div>
          </div>
        )}

        {/* Tactical mode instructions */}
        {drawingMode && (
          <div className="mt-4 w-full max-w-4xl">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">
                  Mode Coach Tactique
                </span>
              </div>
              <p className="text-xs text-orange-700">
                Le terrain est maintenant libre. Vous pouvez utiliser un tableau
                blanc virtuel ou des annotations pour dessiner vos tactiques et
                expliquer les mouvements aux joueurs pendant les pauses.
              </p>
            </div>
          </div>
        )}

        {/* Formation legend - Only show if players are visible */}
        {showPlayers && (
          <div className="mt-4 text-xs text-gray-600 text-center">
            <p className="font-medium mb-2">Formations:</p>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="text-red-600">
                <span className="font-medium">Attaque (3-3):</span>
                <div>G: Gardien • AG/AC/AD: Arrières</div>
                <div>AL/AR: Ailiers • PIV: Pivot</div>
              </div>
              <div className="text-black">
                <span className="font-medium">Défense (6-0):</span>
                <div>G: Gardien • D1-D6: Défenseurs</div>
                <div>Formation défensive en ligne</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
