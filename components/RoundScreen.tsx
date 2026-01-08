import React from 'react';
import { ArrowRight, Mic, ThumbsUp, ThumbsDown, MessageSquare, AlertCircle } from 'lucide-react';
import { Player, RoundData, RoundPhase } from '../types';
import { Button } from './Button';
import { AVATAR_IMAGES } from '../constants';

interface RoundScreenProps {
    roundData: RoundData;
    phase: RoundPhase;
    players: Player[];
    onReady: () => void;
    onAnswer: () => void;
    onVote: (result: 'pass' | 'fail') => void;
}

export const RoundScreen: React.FC<RoundScreenProps> = ({
    roundData,
    phase,
    players,
    onReady,
    onAnswer,
    onVote
}) => {
    const imitator = players.find(p => p.id === roundData.imitatorId);
    const target = players.find(p => p.id === roundData.targetId);

    if (!imitator || !target) return null;

    // --- PHASE 1: PRE-ROUND (Handover) ---
    if (phase === RoundPhase.PRE_ROUND) {
        return (
            <div className="flex flex-col h-full items-center justify-center p-6 text-center animate-in fade-in">
                <div className="mb-8 relative">
                    <div className="w-32 h-32 rounded-full border-4 border-primary p-1 bg-white dark:bg-surface-dark shadow-[0_0_30px_rgba(249,245,6,0.3)]">
                        <img 
                            src={AVATAR_IMAGES[imitator.avatarId % AVATAR_IMAGES.length]} 
                            className="w-full h-full rounded-full object-cover" 
                        />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-primary text-black p-3 rounded-full shadow-lg">
                        <Mic className="w-6 h-6" />
                    </div>
                </div>
                
                <h2 className="text-gray-500 dark:text-gray-400 font-bold tracking-widest uppercase text-sm mb-4">
                    TURNO DE
                </h2>
                <h1 className="text-4xl font-black text-[#181811] dark:text-white mb-8">
                    {imitator.name}
                </h1>
                
                <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 p-4 rounded-xl max-w-xs mb-12 flex items-start gap-3 text-left">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">
                        Pasa el teléfono a {imitator.name}. Nadie más debe ver la pantalla aún.
                    </p>
                </div>

                <Button onClick={onReady} fullWidth className="max-w-xs">
                    ESTOY LISTO
                </Button>
            </div>
        );
    }

    // --- PHASE 2: ACTION (The Performance) ---
    if (phase === RoundPhase.ACTION) {
        return (
            <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
                {/* Header Info */}
                <header className="p-4 flex items-center justify-between">
                     <div className="px-4 py-1.5 bg-white dark:bg-surface-dark rounded-full shadow-sm border border-neutral-100 dark:border-neutral-700">
                        <span className="text-xs font-bold uppercase text-neutral-500">
                            Ronda {roundData.roundNumber} / {roundData.totalRounds}
                        </span>
                    </div>
                </header>

                <main className="flex-1 flex flex-col px-6 pb-6">
                    {/* Who mimics Who */}
                    <div className="flex items-center justify-center gap-6 py-8">
                        <div className="flex flex-col items-center gap-2">
                             <div className="w-16 h-16 rounded-full border-2 border-primary overflow-hidden">
                                <img src={AVATAR_IMAGES[imitator.avatarId % AVATAR_IMAGES.length]} className="w-full h-full object-cover" />
                             </div>
                             <span className="font-bold text-sm">{imitator.name}</span>
                        </div>
                        
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] uppercase font-bold text-gray-400 mb-1">IMITA A</span>
                            <ArrowRight className="text-gray-300" />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                             <div className="w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-600 grayscale overflow-hidden">
                                <img src={AVATAR_IMAGES[target.avatarId % AVATAR_IMAGES.length]} className="w-full h-full object-cover" />
                             </div>
                             <span className="font-bold text-sm text-gray-500">{target.name}</span>
                        </div>
                    </div>

                    {/* The Card */}
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="relative w-full bg-[#181811] dark:bg-[#000] rounded-3xl overflow-hidden shadow-2xl p-8 text-center flex flex-col items-center justify-center min-h-[320px] group">
                             {/* Decorative Background */}
                             <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                             <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                             
                             <div className="relative z-10 flex flex-col gap-6 items-center">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md mb-2">
                                    <MessageSquare className="text-primary w-6 h-6" />
                                </div>
                                <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                                    "{roundData.question}"
                                </h2>
                                <p className="text-gray-400 text-sm font-medium mt-4">
                                    Responde como lo haría <span className="text-primary">{target.name}</span>
                                </p>
                             </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-8 space-y-4">
                        <Button onClick={onAnswer} fullWidth>
                            YA RESPONDÍ
                        </Button>
                        <p className="text-center text-xs text-gray-400 px-8">
                            Actúa tu respuesta. Cuando termines, pulsa el botón para que voten.
                        </p>
                    </div>
                </main>
            </div>
        );
    }

    // --- PHASE 3: VOTING ---
    if (phase === RoundPhase.VOTING) {
        return (
            <div className="flex flex-col h-full bg-background-light dark:bg-background-dark p-6 justify-center">
                <div className="text-center mb-8">
                    <h2 className="text-gray-500 dark:text-gray-400 uppercase tracking-widest text-sm font-bold mb-2">VOTACIÓN</h2>
                    <h1 className="text-3xl font-bold dark:text-white">
                        ¿Qué tal lo hizo {imitator.name}?
                    </h1>
                </div>

                <div className="flex-1 flex items-center justify-center mb-8">
                    <div className="relative w-full aspect-square max-w-sm bg-white dark:bg-surface-dark rounded-3xl border-2 border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center p-8 shadow-sm">
                         <div className="w-32 h-32 rounded-full border-4 border-gray-200 dark:border-gray-600 mb-6 overflow-hidden">
                             <img src={AVATAR_IMAGES[imitator.avatarId % AVATAR_IMAGES.length]} className="w-full h-full object-cover" />
                         </div>
                         <p className="text-lg font-medium text-center text-gray-600 dark:text-gray-300">
                             Imitando a <strong className="text-primary-dark dark:text-primary">{target.name}</strong>
                         </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button 
                        variant="secondary" 
                        className="flex-1 !bg-red-50 hover:!bg-red-100 border-red-200 text-red-600"
                        onClick={() => onVote('fail')}
                    >
                        <ThumbsDown className="mr-2" /> Fatal
                    </Button>
                    <Button 
                        className="flex-1 bg-green-500 shadow-[0_4px_0_#15803d] hover:bg-green-400 active:shadow-none active:translate-y-[4px] text-white"
                        onClick={() => onVote('pass')}
                    >
                        <ThumbsUp className="mr-2 fill-current" /> ¡Genial!
                    </Button>
                </div>
            </div>
        );
    }

    return null;
};