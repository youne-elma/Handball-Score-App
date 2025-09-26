import { Card } from "./ui/card";

interface VolleyballCourtProps {
  teamAPositions: number[];
  teamBPositions: number[];
  servingTeam: "A" | "B";
}

export function VolleyballCourt({
  teamAPositions,
  teamBPositions,
  servingTeam,
}: VolleyballCourtProps) {
  const PlayerPosition = ({
    number,
    isServing,
  }: {
    number: number;
    isServing: boolean;
  }) => (
    <div
      className={`
      w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
      ${
        isServing
          ? "bg-white text-red-700 ring-2 ring-red-300 border border-red-300"
          : "bg-red-800 text-white border border-red-600"
      }
      transition-all duration-300 shadow-md
    `}
    >
      {number}
    </div>
  );

  return (
    <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20 shadow-lg">
      <div className="text-center mb-3">
        <h2 className="font-bold text-white text-sm">COURT POSITIONS</h2>
        <p className="text-white/80 text-xs">
          White = Server • Rotate clockwise on serve win
        </p>
      </div>

      {/* Compact Court */}
      <div className="bg-red-900 rounded-lg p-4 relative max-w-lg mx-auto">
        {/* Court background */}
        <div className="bg-red-700 border-2 border-white rounded relative h-48 flex">
          {/* Team A Half */}
          <div className="flex-1 relative p-3">
            <div className="text-center mb-2">
              <div className="text-red-800 text-xs font-bold bg-white rounded px-2 py-1 inline-block">
                TEAM A {servingTeam === "A" && "●"}
              </div>
            </div>

            {/* Compact 3x2 grid */}
            <div className="relative h-full">
              {/* Front row */}
              <div className="absolute bottom-4 left-2">
                <PlayerPosition
                  number={teamAPositions[3]}
                  isServing={
                    servingTeam === "A" &&
                    teamAPositions[3] === teamAPositions[0]
                  }
                />
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <PlayerPosition
                  number={teamAPositions[2]}
                  isServing={
                    servingTeam === "A" &&
                    teamAPositions[2] === teamAPositions[0]
                  }
                />
              </div>
              <div className="absolute bottom-4 right-2">
                <PlayerPosition
                  number={teamAPositions[1]}
                  isServing={
                    servingTeam === "A" &&
                    teamAPositions[1] === teamAPositions[0]
                  }
                />
              </div>

              {/* Back row */}
              <div className="absolute top-4 left-2">
                <PlayerPosition
                  number={teamAPositions[4]}
                  isServing={
                    servingTeam === "A" &&
                    teamAPositions[4] === teamAPositions[0]
                  }
                />
              </div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <PlayerPosition
                  number={teamAPositions[5]}
                  isServing={
                    servingTeam === "A" &&
                    teamAPositions[5] === teamAPositions[0]
                  }
                />
              </div>
              <div className="absolute top-4 right-2">
                <PlayerPosition
                  number={teamAPositions[0]}
                  isServing={servingTeam === "A"}
                />
              </div>
            </div>
          </div>

          {/* Net */}
          <div className="w-0.5 bg-white"></div>

          {/* Team B Half */}
          <div className="flex-1 relative p-3">
            <div className="text-center mb-2">
              <div className="text-red-800 text-xs font-bold bg-white rounded px-2 py-1 inline-block">
                TEAM B {servingTeam === "B" && "●"}
              </div>
            </div>

            {/* Compact 3x2 grid */}
            <div className="relative h-full">
              {/* Front row (mirrored) */}
              <div className="absolute bottom-4 left-2">
                <PlayerPosition
                  number={teamBPositions[1]}
                  isServing={
                    servingTeam === "B" &&
                    teamBPositions[1] === teamBPositions[0]
                  }
                />
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <PlayerPosition
                  number={teamBPositions[2]}
                  isServing={
                    servingTeam === "B" &&
                    teamBPositions[2] === teamBPositions[0]
                  }
                />
              </div>
              <div className="absolute bottom-4 right-2">
                <PlayerPosition
                  number={teamBPositions[3]}
                  isServing={
                    servingTeam === "B" &&
                    teamBPositions[3] === teamBPositions[0]
                  }
                />
              </div>

              {/* Back row (mirrored) */}
              <div className="absolute top-4 left-2">
                <PlayerPosition
                  number={teamBPositions[0]}
                  isServing={servingTeam === "B"}
                />
              </div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <PlayerPosition
                  number={teamBPositions[5]}
                  isServing={
                    servingTeam === "B" &&
                    teamBPositions[5] === teamBPositions[0]
                  }
                />
              </div>
              <div className="absolute top-4 right-2">
                <PlayerPosition
                  number={teamBPositions[4]}
                  isServing={
                    servingTeam === "B" &&
                    teamBPositions[4] === teamBPositions[0]
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Attack line indicators */}
        <div className="absolute top-1/2 left-8 right-8 h-px bg-white/30 transform -translate-y-1/2"></div>
      </div>
    </Card>
  );
}
