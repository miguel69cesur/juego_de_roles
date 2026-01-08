import React, { useState, useEffect } from 'react';
import { GameScreen, GameState, Player, RoundPhase, RoundData } from './types';
import { generateRound, calculateScore } from './services/gameService';
import { HomeScreen } from './components/HomeScreen';
import { PlayerSetupScreen } from './components/PlayerSetupScreen';
import { RoundScreen } from './components/RoundScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { HowToPlayScreen } from './components/HowToPlayScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { AudioSettingsScreen } from './components/AudioSettingsScreen';
import { EditProfileScreen } from './components/EditProfileScreen';
import { nanoid } from 'nanoid';

const App: React.FC = () => {
  // State initialization
  const [gameState, setGameState] = useState<GameState>(() => {
    // Attempt to load from localStorage
    const saved = localStorage.getItem('imitaGame');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      screen: GameScreen.HOME,
      players: [],
      currentRound: null,
      phase: RoundPhase.PRE_ROUND
    };
  });

  // Persist state
  useEffect(() => {
    localStorage.setItem('imitaGame', JSON.stringify(gameState));
  }, [gameState]);

  // --- ACTIONS ---

  const handleStartSetup = () => {
    setGameState(prev => ({ ...prev, screen: GameScreen.SETUP }));
  };

  const handleAddPlayer = (name: string) => {
    const newPlayer: Player = {
      id: nanoid(),
      name,
      score: 0,
      avatarId: gameState.players.length // Deterministic random avatar
    };
    setGameState(prev => ({ ...prev, players: [...prev.players, newPlayer] }));
  };

  const handleRemovePlayer = (id: string) => {
    setGameState(prev => ({ ...prev, players: prev.players.filter(p => p.id !== id) }));
  };

  const handleStartGame = () => {
    const firstRound = generateRound(gameState.players, 1);
    setGameState(prev => ({
      ...prev,
      screen: GameScreen.ROUND,
      currentRound: firstRound,
      phase: RoundPhase.PRE_ROUND,
      // Reset scores on new game
      players: prev.players.map(p => ({ ...p, score: 0 }))
    }));
  };

  const handleRoundReady = () => {
    setGameState(prev => ({ ...prev, phase: RoundPhase.ACTION }));
  };

  const handleRoundAnswer = () => {
    setGameState(prev => ({ ...prev, phase: RoundPhase.VOTING }));
  };

  const handleVote = (result: 'pass' | 'fail') => {
    if (!gameState.currentRound) return;

    // Update Score
    const updatedPlayers = gameState.players.map(p => {
      if (p.id === gameState.currentRound?.imitatorId) {
        return { ...p, score: calculateScore(p.score, result) };
      }
      return p;
    });

    // Determine Next Step
    if (gameState.currentRound.roundNumber >= gameState.currentRound.totalRounds) {
      // Game Over
      setGameState(prev => ({
        ...prev,
        players: updatedPlayers,
        screen: GameScreen.RESULTS,
        currentRound: null
      }));
    } else {
      // Next Round
      const nextRound = generateRound(updatedPlayers, gameState.currentRound.roundNumber + 1);
      setGameState(prev => ({
        ...prev,
        players: updatedPlayers,
        currentRound: nextRound,
        phase: RoundPhase.PRE_ROUND
      }));
    }
  };

  const handleResetGame = () => {
    setGameState({
      screen: GameScreen.HOME,
      players: [],
      currentRound: null,
      phase: RoundPhase.PRE_ROUND
    });
    localStorage.removeItem('imitaGame');
  };

  const handleBackToHome = () => {
      setGameState(prev => ({ ...prev, screen: GameScreen.HOME }));
  };

  const handleOpenSettings = () => {
      setGameState(prev => ({ ...prev, screen: GameScreen.SETTINGS }));
  };

  const handleOpenHowToPlay = () => {
      setGameState(prev => ({ ...prev, screen: GameScreen.HOW_TO_PLAY }));
  };
  
  const handleOpenAudioSettings = () => {
      setGameState(prev => ({ ...prev, screen: GameScreen.AUDIO_SETTINGS }));
  };

  const handleOpenEditProfile = () => {
      setGameState(prev => ({ ...prev, screen: GameScreen.EDIT_PROFILE }));
  };
  
  const handleCloseHowToPlay = () => {
      setGameState(prev => ({ ...prev, screen: GameScreen.HOME }));
  };

  const handleBackFromSettings = () => {
      setGameState(prev => ({ ...prev, screen: GameScreen.HOME }));
  };
  
  const handleBackFromAudio = () => {
      setGameState(prev => ({ ...prev, screen: GameScreen.SETTINGS }));
  };

  const handleBackFromEditProfile = () => {
      setGameState(prev => ({ ...prev, screen: GameScreen.SETTINGS }));
  };


  // --- RENDER ---

  return (
    <div className="w-full h-screen bg-neutral-100 dark:bg-black flex items-center justify-center font-sans">
      {/* Mobile Container Simulator */}
      <div className="w-full max-w-md h-full md:h-[850px] md:max-h-[95vh] bg-background-light dark:bg-background-dark md:rounded-[2.5rem] shadow-2xl overflow-hidden relative border-4 border-transparent md:border-gray-800">
        
        {gameState.screen === GameScreen.HOME && (
          <HomeScreen 
            onStart={handleStartSetup} 
            onSettings={handleOpenSettings}
            onHowToPlay={handleOpenHowToPlay}
            onAudioSettings={handleOpenAudioSettings}
          />
        )}

        {gameState.screen === GameScreen.SETUP && (
          <PlayerSetupScreen 
            players={gameState.players}
            onAddPlayer={handleAddPlayer}
            onRemovePlayer={handleRemovePlayer}
            onStartGame={handleStartGame}
            onBack={handleBackToHome}
          />
        )}

        {gameState.screen === GameScreen.ROUND && gameState.currentRound && (
          <RoundScreen 
            roundData={gameState.currentRound}
            phase={gameState.phase}
            players={gameState.players}
            onReady={handleRoundReady}
            onAnswer={handleRoundAnswer}
            onVote={handleVote}
          />
        )}

        {gameState.screen === GameScreen.RESULTS && (
          <ResultsScreen 
            players={gameState.players}
            onReset={handleResetGame}
          />
        )}

        {gameState.screen === GameScreen.HOW_TO_PLAY && (
            <HowToPlayScreen onClose={handleCloseHowToPlay} />
        )}

        {gameState.screen === GameScreen.SETTINGS && (
            <SettingsScreen 
                onBack={handleBackFromSettings} 
                onAudioSettings={handleOpenAudioSettings}
                onEditProfile={handleOpenEditProfile}
            />
        )}

        {gameState.screen === GameScreen.AUDIO_SETTINGS && (
            <AudioSettingsScreen onBack={handleBackFromAudio} />
        )}

        {gameState.screen === GameScreen.EDIT_PROFILE && (
            <EditProfileScreen onBack={handleBackFromEditProfile} />
        )}

      </div>
    </div>
  );
};

export default App;