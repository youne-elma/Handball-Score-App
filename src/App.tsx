import { useState } from "react";
import { HandballLandingPage } from "./components/HandballLandingPage";
import { HandballScoringPage } from "./components/HandballScoringPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'scoring'>('landing');

  const handleStartScoring = () => {
    setCurrentPage('scoring');
  };

  const handleBackToHome = () => {
    setCurrentPage('landing');
  };

  if (currentPage === 'landing') {
    return <HandballLandingPage onStartScoring={handleStartScoring} />;
  }

  return <HandballScoringPage onBackToHome={handleBackToHome} />;
}