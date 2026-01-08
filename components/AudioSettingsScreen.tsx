import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, Volume2, VolumeX, Music, Wand2, AudioLines, GripHorizontal } from 'lucide-react';

interface AudioSettingsScreenProps {
    onBack: () => void;
}

export const AudioSettingsScreen: React.FC<AudioSettingsScreenProps> = ({ onBack }) => {
    // Default values matching the image somewhat
    const [masterVol, setMasterVol] = useState(85);
    const [musicVol, setMusicVol] = useState(60);
    const [sfxVol, setSfxVol] = useState(80);
    const [voiceVol, setVoiceVol] = useState(0); // Set to 0 to show mute state example
    const [isMuted, setIsMuted] = useState(false);

    // Reusable Custom Slider Component
    const CustomSlider = ({ 
        value, 
        onChange, 
        thumbContent = null, 
        thumbSize = "small" 
    }: { 
        value: number, 
        onChange: (val: number) => void,
        thumbContent?: React.ReactNode,
        thumbSize?: "small" | "large"
    }) => {
        return (
            <div className="relative w-full h-8 flex items-center select-none group">
                {/* Track Background */}
                <div className="absolute w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    {/* Filled Track */}
                    <div 
                        className="h-full bg-primary transition-all duration-75 ease-out" 
                        style={{ width: `${value}%` }}
                    />
                </div>
                
                {/* Thumb (Visual) */}
                <div 
                    className={`absolute bg-white rounded-full shadow-md flex items-center justify-center pointer-events-none transition-all duration-75 ease-out z-10 ${
                        thumbSize === "large" ? "w-10 h-10 shadow-lg" : "w-6 h-6 border border-gray-100"
                    }`}
                    style={{ left: `calc(${value}% - ${thumbSize === "large" ? '20px' : '12px'})` }} 
                >
                    {thumbContent}
                </div>

                {/* Input (Interaction) */}
                <input 
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
            </div>
        );
    };

    const handleReset = () => {
        setMasterVol(85);
        setMusicVol(70);
        setSfxVol(50);
        setVoiceVol(100);
        setIsMuted(false);
    };

    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
            <header className="p-6 flex items-center justify-between relative">
                <button 
                    onClick={onBack}
                    className="p-3 bg-white dark:bg-surface-dark rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-white z-10"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-bold text-[#181811] dark:text-white absolute left-0 right-0 text-center pointer-events-none">
                    Audio y Sonido
                </h1>
            </header>

            <main className="flex-1 overflow-y-auto px-6 pb-24 no-scrollbar">
                
                {/* Visualizer */}
                <div className="flex items-end justify-center gap-2.5 h-32 mb-10 mt-2">
                    {[40, 75, 55, 95, 65, 85, 45].map((h, i) => (
                        <div 
                            key={i} 
                            style={{ height: `${h}%` }}
                            className="w-4 bg-primary rounded-full animate-bounce-slow" 
                        ></div>
                    ))}
                </div>

                {/* Master Volume Card */}
                <div className="bg-white dark:bg-surface-dark rounded-[2rem] p-6 shadow-sm mb-8">
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold dark:text-white mb-1">Volumen Maestro</h2>
                            <p className="text-gray-400 text-sm">Sistema global</p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-1.5 rounded-2xl font-bold text-gray-800 dark:text-white">
                            {masterVol}%
                        </div>
                    </div>

                    <div className="mb-8 px-2">
                        <CustomSlider 
                            value={masterVol} 
                            onChange={setMasterVol} 
                            thumbSize="large"
                            thumbContent={
                                <div className="flex flex-col gap-[2px]">
                                    <div className="w-3 h-0.5 bg-gray-400 rounded-full"></div>
                                    <div className="w-3 h-0.5 bg-gray-400 rounded-full"></div>
                                </div>
                            }
                        />
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Silenciar todo</span>
                        <div 
                            className="relative inline-flex items-center cursor-pointer"
                            onClick={() => setIsMuted(!isMuted)}
                        >
                            <div className={`w-12 h-7 rounded-full transition-colors duration-200 ${isMuted ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                            <div className={`absolute w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 top-1 left-1 ${isMuted ? 'translate-x-5' : ''}`}></div>
                        </div>
                    </div>
                </div>

                {/* Mixer */}
                <h3 className="font-bold text-lg mb-4 dark:text-white">Mezclador</h3>
                
                <div className="space-y-4">
                    {/* Music Channel */}
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-3xl flex items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-800 dark:text-white">
                            <Music className="w-5 h-5" />
                        </div>
                        <div className="flex-1 px-1">
                            <p className="font-bold text-sm mb-3 dark:text-white">Música</p>
                            <CustomSlider value={musicVol} onChange={setMusicVol} />
                        </div>
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${musicVol === 0 ? 'bg-gray-100 dark:bg-gray-800 text-gray-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-primary'}`}>
                            {musicVol === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </div>
                    </div>

                    {/* SFX Channel */}
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-3xl flex items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-800 dark:text-white">
                            <Wand2 className="w-5 h-5" />
                        </div>
                        <div className="flex-1 px-1">
                            <p className="font-bold text-sm mb-3 dark:text-white">Efectos (SFX)</p>
                            <CustomSlider value={sfxVol} onChange={setSfxVol} />
                        </div>
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${sfxVol === 0 ? 'bg-gray-100 dark:bg-gray-800 text-gray-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-primary'}`}>
                            {sfxVol === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </div>
                    </div>

                    {/* Voice Channel */}
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-3xl flex items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-800 dark:text-white">
                            <AudioLines className="w-5 h-5" />
                        </div>
                        <div className="flex-1 px-1">
                            <p className="font-bold text-sm mb-3 dark:text-white">Voz / Ambiente</p>
                            <CustomSlider value={voiceVol} onChange={setVoiceVol} />
                        </div>
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${voiceVol === 0 ? 'bg-gray-100 dark:bg-gray-800 text-gray-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-primary'}`}>
                            {voiceVol === 0 ? <VolumeX className="w-5 h-5 opacity-50" /> : <Volume2 className="w-5 h-5" />}
                        </div>
                    </div>
                </div>

                <button 
                    onClick={handleReset}
                    className="mt-8 w-full bg-white dark:bg-surface-dark border-2 border-transparent hover:border-gray-100 dark:hover:border-gray-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300 transition-all shadow-sm active:scale-95"
                >
                    <RefreshCw className="w-4 h-4" />
                    Restaurar Valores
                </button>

            </main>
        </div>
    );
};