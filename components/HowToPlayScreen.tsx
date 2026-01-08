import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface HowToPlayScreenProps {
    onClose: () => void;
}

export const HowToPlayScreen: React.FC<HowToPlayScreenProps> = ({ onClose }) => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "El Objetivo",
            description: "Imita a tus amigos respondiendo preguntas absurdas y consigue votos para ganar estrellas y liderar el ranking.",
            image: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?q=80&w=600&auto=format&fit=crop"
        },
        {
            title: "Tu Turno",
            description: "Cuando seas el imitador, actúa como la persona objetivo. Copia su voz, sus gestos y su estilo. ¡Sé exagerado!",
            image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=600&auto=format&fit=crop"
        },
        {
            title: "Votación",
            description: "Después de la actuación, todos votan. Si la mayoría cree que lo hiciste bien, ganas puntos. ¡Diviértete!",
            image: "https://images.unsplash.com/photo-1533227297464-9429738d1978?q=80&w=600&auto=format&fit=crop"
        }
    ];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            onClose();
        }
    };

    return (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#181811] w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col h-[650px]">
                
                {/* Header */}
                <div className="flex justify-between items-center p-6 pb-2">
                    <h2 className="text-xl font-bold dark:text-white">Cómo Jugar</h2>
                    <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <X className="w-5 h-5 dark:text-white" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-6 pt-2">
                    <div className="flex-1 bg-gray-100 dark:bg-surface-dark rounded-[2rem] overflow-hidden relative mb-8 group">
                        <div className="absolute top-4 right-4 bg-primary text-black text-xs font-bold px-3 py-1.5 rounded-full z-10">
                            Paso {step + 1}
                        </div>
                        <img 
                            src={steps[step].image} 
                            alt="Tutorial" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        
                        {/* Floating elements simulation (Stars) */}
                        {step === 0 && (
                             <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 text-6xl animate-bounce-slow drop-shadow-lg">
                                 ⭐
                             </div>
                        )}
                    </div>

                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-black mb-3 dark:text-white">{steps[step].title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                            {steps[step].description}
                        </p>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mb-8">
                        {steps.map((_, i) => (
                            <div 
                                key={i}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === step ? 'bg-primary w-8' : 'bg-gray-200 dark:bg-gray-700'}`}
                            />
                        ))}
                    </div>

                    <button 
                        onClick={handleNext}
                        className="w-full bg-primary text-[#181811] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-[0_4px_0_#d4d105] active:shadow-none active:translate-y-[4px]"
                    >
                        {step === steps.length - 1 ? "¡Entendido! Vamos" : "Siguiente"}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};