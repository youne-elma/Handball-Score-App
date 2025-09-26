import { useState } from "react";
import { ScoreCard } from "./ScoreCard";
import { BreakTimer } from "./BreakTimer";
import { Button } from "./ui/button";
import { RotateCcw, Volleyball, ArrowLeft } from "lucide-react";

interface ScoringPageProps {
  onBackToHome: () => void;
}

export function ScoringPage({ onBackToHome }: ScoringPageProps) {
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [teamASets, setTeamASets] = useState(0);
  const [teamBSets, setTeamBSets] = useState(0);
  const [teamATimeouts, setTeamATimeouts] = useState(2);
  const [teamBTimeouts, setTeamBTimeouts] = useState(2);

  const incrementTeamA = () => {
    const newScore = teamAScore + 1;
    
    if (newScore >= 25) {
      setTeamASets(prev => prev + 1);
      setTeamAScore(0);
      setTeamBScore(0);
      // Reset timeouts for new set
      setTeamATimeouts(2);
      setTeamBTimeouts(2);
    } else {
      setTeamAScore(newScore);
    }
  };
  
  const decrementTeamA = () => setTeamAScore(prev => Math.max(0, prev - 1));
  
  const incrementTeamB = () => {
    const newScore = teamBScore + 1;
    
    if (newScore >= 25) {
      setTeamBSets(prev => prev + 1);
      setTeamAScore(0);
      setTeamBScore(0);
      // Reset timeouts for new set
      setTeamATimeouts(2);
      setTeamBTimeouts(2);
    } else {
      setTeamBScore(newScore);
    }
  };
  
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
    setTeamASets(0);
    setTeamBSets(0);
    setTeamATimeouts(2);
    setTeamBTimeouts(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-red-600 to-red-800 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onBackToHome}
          variant="outline"
          size="sm"
          className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
          <Volleyball className="w-8 h-8 text-white" />
          <h1 className="text-2xl font-bold text-white tracking-wide">VOLLEYBALL SCORER</h1>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>

        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      {/* Main Content - Horizontal Layout */}
      <div className="flex items-center justify-center space-x-6 mb-6">
        {/* Team A Score */}
        <div className="flex-1 max-w-xs">
          <ScoreCard
            teamName="TEAM A"
            score={teamAScore}
            sets={teamASets}
            timeouts={teamATimeouts}
            onIncrement={incrementTeamA}
            onDecrement={decrementTeamA}
            onTimeout={useTeamATimeout}
            side="left"
          />
        </div>

        {/* Break Timer */}
        <div className="flex-1 max-w-sm">
          <BreakTimer />
        </div>

        {/* Team B Score */}
        <div className="flex-1 max-w-xs">
          <ScoreCard
            teamName="TEAM B"
            score={teamBScore}
            sets={teamBSets}
            timeouts={teamBTimeouts}
            onIncrement={incrementTeamB}
            onDecrement={decrementTeamB}
            onTimeout={useTeamBTimeout}
            side="right"
          />
        </div>
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
          Reset Game
        </Button>
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 max-w-2xl mx-auto border border-yellow-400/30">
          <p className="text-white/90 text-sm">
            Scores auto-reset at 25 points (1 set won). Each team gets 2 timeouts per set.
          </p>
        </div>
      </div>
    </div>
  );
}