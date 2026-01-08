import React from 'react';
import { Player } from '../types';
import { Button } from './Button';
import { RotateCcw, Trophy, Medal } from 'lucide-react';
import { AVATAR_IMAGES } from '../constants';

interface ResultsScreenProps {
    players: Player[];
    onReset: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ players, onReset }) => {
    // Sort players by score descending
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const winner = sortedPlayers[0];

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
             <div className="flex items-center p-4 pb-2 sticky top-0 z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
                 <div className="w-12"></div> {/* Spacer */}
                 <h2 className="text-xl font-bold flex-1 text-center dark:text-white">Resultados Finales</h2>
                 <div className="w-12"></div>
             </div>

             <div className="flex-1 overflow-y-auto px-4 pb-24 pt-4 no-scrollbar">
                {/* Winner Podium */}
                <div className="flex flex-col items-center mb-10">
                    <div className="relative">
                        <Trophy className="w-12 h-12 text-yellow-500 absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce-slow" />
                        <div className="w-32 h-32 rounded-full border-4 border-primary p-1 bg-white dark:bg-surface-dark shadow-[0_0_40px_rgba(249,245,6,0.5)] z-10 relative">
                             <img 
                                src={AVATAR_IMAGES[winner.avatarId % AVATAR_IMAGES.length]} 
                                className="w-full h-full rounded-full object-cover" 
                            />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary text-[#181811] px-4 py-1 rounded-full font-bold shadow-sm whitespace-nowrap border-2 border-white dark:border-surface-dark">
                            1º Puesto
                        </div>
                    </div>
                    <h2 className="text-3xl font-black mt-6 dark:text-white">{winner.name}</h2>
                    <p className="text-primary-dark dark:text-primary font-bold text-xl">{winner.score} pts</p>
                </div>

                {/* List of others */}
                <div className="space-y-4 max-w-sm mx-auto">
                    {sortedPlayers.slice(1).map((player, index) => (
                        <div key={player.id} className="flex items-center bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-transparent dark:border-gray-800">
                             <div className="w-8 font-bold text-gray-400 text-lg">#{index + 2}</div>
                             <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden mx-4">
                                <img src={AVATAR_IMAGES[player.avatarId % AVATAR_IMAGES.length]} className="w-full h-full object-cover" />
                             </div>
                             <div className="flex-1">
                                 <h3 className="font-bold text-lg dark:text-white">{player.name}</h3>
                             </div>
                             <div className="font-bold text-gray-500 dark:text-gray-400">
                                 {player.score} pts
                             </div>
                        </div>
                    ))}
                </div>
             </div>

             <div className="p-6 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark">
                 <Button onClick={onReset} fullWidth icon={<RotateCcw />}>
                     JUGAR DE NUEVO
                 </Button>
             </div>
        </div>
    );
};