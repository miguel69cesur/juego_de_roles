import React, { useState } from 'react';
import { Plus, X, ArrowLeft, Users, Play } from 'lucide-react';
import { Button } from './Button';
import { Player } from '../types';
import { MIN_PLAYERS, AVATAR_IMAGES } from '../constants';

interface PlayerSetupScreenProps {
    players: Player[];
    onAddPlayer: (name: string) => void;
    onRemovePlayer: (id: string) => void;
    onStartGame: () => void;
    onBack: () => void;
}

export const PlayerSetupScreen: React.FC<PlayerSetupScreenProps> = ({
    players,
    onAddPlayer,
    onRemovePlayer,
    onStartGame,
    onBack
}) => {
    const [name, setName] = useState('');

    const handleAdd = () => {
        if (name.trim()) {
            onAddPlayer(name.trim());
            setName('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleAdd();
    };

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
            <header className="p-6 flex items-center gap-4">
                <button 
                    onClick={onBack}
                    className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-800 dark:text-white transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold text-[#181811] dark:text-white">Jugadores</h1>
            </header>

            <main className="flex-1 px-6 flex flex-col overflow-hidden">
                <div className="mb-8">
                    <p className="text-[#8c8b5f] dark:text-gray-400 mb-4">
                        Añade al menos {MIN_PLAYERS} jugadores para comenzar.
                    </p>
                    
                    <div className="relative group">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Nombre del jugador..."
                            className="w-full h-16 pl-6 pr-16 bg-white dark:bg-surface-dark border-2 border-transparent focus:border-primary rounded-2xl text-lg outline-none transition-all shadow-sm text-gray-900 dark:text-white placeholder:text-gray-400"
                        />
                        <button 
                            onClick={handleAdd}
                            disabled={!name.trim()}
                            className="absolute right-2 top-2 h-12 w-12 bg-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all text-[#181811]"
                        >
                            <Plus className="w-6 h-6 stroke-[3]" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pb-24">
                    {players.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-48 text-gray-400 opacity-50 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl">
                            <Users className="w-12 h-12 mb-2" />
                            <span className="font-medium">Lista vacía</span>
                        </div>
                    )}
                    
                    {players.map((player) => (
                        <div 
                            key={player.id} 
                            className="flex items-center justify-between bg-white dark:bg-surface-dark p-3 pr-4 rounded-2xl shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-100 dark:border-gray-700">
                                    <img 
                                        src={AVATAR_IMAGES[player.avatarId % AVATAR_IMAGES.length]} 
                                        alt={player.name}
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                                <span className="font-bold text-lg text-[#181811] dark:text-white">
                                    {player.name}
                                </span>
                            </div>
                            <button 
                                onClick={() => onRemovePlayer(player.id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            <div className="p-6 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pt-12">
                <Button 
                    onClick={onStartGame} 
                    fullWidth 
                    disabled={players.length < MIN_PLAYERS}
                    className={players.length < MIN_PLAYERS ? "opacity-50 grayscale" : ""}
                    icon={<Play className="fill-current" />}
                >
                    COMENZAR JUEGO
                </Button>
            </div>
        </div>
    );
};