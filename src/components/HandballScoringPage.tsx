import { useState } from "react";
import { HandballScoreCard } from "./HandballScoreCard";
import { HandballTimer } from "./HandballTimer";
import { HandballMatchTimer } from "./HandballMatchTimer";
import { HandballCourt } from "./HandballCourt";
import { Button } from "./ui/button";
import { RotateCcw, Target, ArrowLeft } from "lucide-react";

interface HandballScoringPageProps {
  onBackToHome: () => void;
}

export function HandballScoringPage({ onBackToHome }: HandballScoringPageProps) {
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [teamATimeouts, setTeamATimeouts] = useState(3);
  const [teamBTimeouts, setTeamBTimeouts] = useState(3);

  const incrementTeamA = () => setTeamAScore(prev => prev + 1);
  const decrementTeamA = () => setTeamAScore(prev => Math.max(0, prev - 1));
  
  const incrementTeamB = () => setTeamBScore(prev => prev + 1);
  const decrementTeamB = () => setTeamBScore(prev => Math.max(0, prev - 1));

  const useTeamATimeout = () => {
    if (teamATimeouts > 0) {
      setTeamATimeouts(prev => prev - 1);
    }
  };

  const useTeamBTimeout = () => {
    if (teamBTimeouts > 0) {
      setTeamBTimeouts(prev => prev - 1);
    }
  };

  const resetGame = () => {
    setTeamAScore(0);
    setTeamBScore(0);
    setTeamATimeouts(3);
    setTeamBTimeouts(3);
  };

  const handleHalfTimeEnd = () => {
    // Reset timeouts for second half
    setTeamATimeouts(3);
    setTeamBTimeouts(3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onBackToHome}
          variant="outline"
          size="sm"
          className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        
        <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
          <Target className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-bold text-white tracking-wide">SCORE HANDBALL</h1>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
        </div>

        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      {/* Main Content - Horizontal Layout */}
      <div className="flex items-start justify-center space-x-6 mb-6">
        {/* Team A Score */}
        <div className="flex-1 max-w-xs">
          <HandballScoreCard
            teamName="ÉQUIPE A"
            score={teamAScore}
            timeouts={teamATimeouts}
            onIncrement={incrementTeamA}
            onDecrement={decrementTeamA}
            onTimeout={useTeamATimeout}
            side="left"
          />
        </div>

        {/* Timeout Timer */}
        <div className="flex-1 max-w-sm">
          <HandballTimer />
        </div>

        {/* Team B Score */}
        <div className="flex-1 max-w-xs">
          <HandballScoreCard
            teamName="ÉQUIPE B"
            score={teamBScore}
            timeouts={teamBTimeouts}
            onIncrement={incrementTeamB}
            onDecrement={decrementTeamB}
            onTimeout={useTeamBTimeout}
            side="right"
          />
        </div>
      </div>

      {/* Match Timer */}
      <div className="flex justify-center mb-6">
        <div className="max-w-sm">
          <HandballMatchTimer onHalfTimeEnd={handleHalfTimeEnd} />
        </div>
      </div>

      {/* Court Visualization */}
      <div className="mb-6">
        <HandballCourt homeTeam="ÉQUIPE A" awayTeam="ÉQUIPE B" />
      </div>

      {/* Reset Button */}
      <div className="flex justify-center">
        <Button
          onClick={resetGame}
          variant="outline"
          size="lg"
          className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm shadow-lg"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Nouveau Match
        </Button>
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 max-w-2xl mx-auto border border-orange-500/30">
          <p className="text-white/90 text-sm">
            Match: 2 mi-temps de 30 minutes • 3 temps morts par équipe par match • Temps mort: 1, 10, 15 min
          </p>
        </div>
      </div>
    </div>
  );
}