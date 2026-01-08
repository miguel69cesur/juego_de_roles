import React from 'react';
import { Play, HelpCircle, Volume2, Settings } from 'lucide-react';
import { Button } from './Button';

interface HomeScreenProps {
    onStart: () => void;
    onSettings: () => void;
    onHowToPlay: () => void;
    onAudioSettings: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStart, onSettings, onHowToPlay, onAudioSettings }) => {
    return (
        <div className="flex flex-col h-full items-center justify-between p-6">
            <header className="flex w-full justify-between pt-4">
                <button 
                    onClick={onAudioSettings}
                    className="p-3 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-sm transition-colors hover:bg-white dark:hover:bg-white/20"
                >
                    <Volume2 className="w-6 h-6 text-gray-800 dark:text-white" />
                </button>
                <button 
                    onClick={onSettings}
                    className="p-3 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-sm transition-colors hover:bg-white dark:hover:bg-white/20"
                >
                    <Settings className="w-6 h-6 text-gray-800 dark:text-white" />
                </button>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center w-full max-w-md gap-8">
                <div className="relative group">
                    <div className="absolute inset-0 bg-primary/40 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-700 animate-pulse"></div>
                    <div className="relative w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-primary to-yellow-300 rounded-[3rem] shadow-2xl rotate-3 hover:rotate-6 transition-transform duration-300 flex items-center justify-center border-4 border-white dark:border-surface-dark">
                        <span className="text-6xl md:text-8xl">🎭</span>
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <h1 className="text-5xl font-black tracking-tighter uppercase text-[#181811] dark:text-white drop-shadow-sm">
                        Imita al<br />
                        <span className="text-primary dark:text-primary">Jugador</span>
                    </h1>
                    <p className="text-[#8c8b5f] dark:text-gray-400 font-medium tracking-wide uppercase text-sm">
                        Party Game Edition
                    </p>
                </div>
            </main>

            <div className="w-full max-w-md space-y-4 pb-8">
                <Button onClick={onStart} fullWidth icon={<Play className="fill-current" />}>
                    JUGAR AHORA
                </Button>
                <Button onClick={onHowToPlay} variant="secondary" fullWidth icon={<HelpCircle />}>
                    CÓMO JUGAR
                </Button>
                
                <div className="text-center pt-4">
                    <span className="bg-white/50 dark:bg-black/20 px-4 py-1 rounded-full text-xs font-bold text-gray-500">
                        v1.0.0
                    </span>
                </div>
            </div>
        </div>
    );
};