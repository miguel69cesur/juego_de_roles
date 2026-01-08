import React, { useState } from 'react';
import { ArrowLeft, Camera, Edit2, Lock, Copy, Check, Save } from 'lucide-react';
import { Button } from './Button';

interface EditProfileScreenProps {
    onBack: () => void;
}

const FRAMES = [
    { id: 'gold', name: 'Gold Dragon', gradient: 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600', border: 'border-yellow-400' },
    { id: 'neon', name: 'Neon Pulse', gradient: 'bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600', border: 'border-cyan-400' },
    { id: 'pink', name: 'Cyber Pink', gradient: 'bg-gradient-to-br from-pink-400 via-rose-500 to-indigo-600', border: 'border-pink-400' },
    { id: 'silver', name: 'Silver Wolf', gradient: 'bg-gradient-to-br from-gray-300 via-gray-400 to-slate-600', border: 'border-gray-300' },
];

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ onBack }) => {
    const [username, setUsername] = useState('Anfitrión');
    const [bio, setBio] = useState('Shadow stepping through the ranks. Support main, but I carry hard.');
    const [selectedFrame, setSelectedFrame] = useState('gold');
    const [showWinRate, setShowWinRate] = useState(true);
    const [allowGuildInvites, setAllowGuildInvites] = useState(false);

    const handleSave = () => {
        // Here you would typically save to backend
        onBack();
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
                    Editar Perfil
                </h1>
            </header>

            <main className="flex-1 overflow-y-auto px-6 pb-24 no-scrollbar">
                
                {/* Avatar Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative mb-3 group cursor-pointer">
                        <div className="w-32 h-32 rounded-full border-4 border-white dark:border-surface-dark shadow-xl overflow-hidden relative">
                            <img src="https://picsum.photos/seed/p8/200" alt="Profile" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                             {/* Gradient Overlay for style */}
                             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-primary text-[#181811] p-2.5 rounded-full border-4 border-background-light dark:border-background-dark shadow-sm">
                            <Camera className="w-5 h-5" />
                        </div>
                    </div>
                    <span className="text-primary-dark dark:text-primary font-bold text-xs uppercase tracking-wider mb-1">Level 42</span>
                    <p className="text-gray-400 text-xs font-medium">Toca la imagen para cambiar el avatar</p>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 pl-1">Nombre de Usuario</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-white dark:bg-surface-dark border-2 border-transparent focus:border-primary rounded-2xl py-4 pl-4 pr-12 font-bold text-gray-800 dark:text-white outline-none shadow-sm transition-all"
                            />
                            <Edit2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Player ID */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 pl-1">
                            ID de Jugador <Lock className="w-3 h-3 text-gray-400" />
                        </label>
                        <div className="w-full bg-gray-100 dark:bg-gray-800/50 rounded-2xl py-2 pl-4 pr-2 flex items-center justify-between border-2 border-transparent">
                            <span className="font-mono text-gray-500 dark:text-gray-400 font-medium tracking-wide">#8829-XJ-22</span>
                            <button className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 text-[10px] font-bold px-3 py-2 rounded-xl transition-colors uppercase tracking-wider">
                                Copiar
                            </button>
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 pl-1">Bio / Frase</label>
                        <div className="relative">
                            <textarea 
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                maxLength={150}
                                rows={3}
                                className="w-full bg-white dark:bg-surface-dark border-2 border-transparent focus:border-primary rounded-2xl p-4 font-medium text-gray-800 dark:text-white outline-none shadow-sm transition-all resize-none"
                            ></textarea>
                            <span className="absolute bottom-3 right-4 text-xs font-bold text-gray-400">
                                {bio.length}/150
                            </span>
                        </div>
                    </div>

                    {/* Profile Frame */}
                    <div>
                        <div className="flex items-center justify-between mb-3 px-1">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Marco de Perfil</label>
                            <span className="bg-primary text-[#181811] text-[10px] font-black px-2 py-0.5 rounded uppercase">Shop</span>
                        </div>
                        
                        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
                            {FRAMES.map((frame) => (
                                <div 
                                    key={frame.id}
                                    onClick={() => setSelectedFrame(frame.id)}
                                    className="flex flex-col items-center gap-2 min-w-[100px] cursor-pointer group"
                                >
                                    <div className={`relative w-24 h-24 rounded-full p-1.5 transition-all duration-300 ${selectedFrame === frame.id ? 'scale-110' : 'scale-100 opacity-70 group-hover:opacity-100'}`}>
                                        {/* Selection Ring */}
                                        {selectedFrame === frame.id && (
                                            <div className={`absolute inset-0 rounded-full border-4 ${frame.border} animate-pulse`}></div>
                                        )}
                                        
                                        {/* Frame Graphic (Gradient Mockup) */}
                                        <div className={`w-full h-full rounded-full ${frame.gradient} flex items-center justify-center p-1 overflow-hidden shadow-lg`}>
                                            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center relative">
                                                {/* Placeholder for user avatar inside frame */}
                                                <div className="w-10 h-10 bg-black/20 rounded-full blur-sm"></div>
                                                <div className="absolute bottom-2 w-8 h-3 bg-black/10 rounded-full blur-[2px]"></div>
                                            </div>
                                        </div>

                                        {/* Checkmark Badge */}
                                        {selectedFrame === frame.id && (
                                            <div className="absolute top-0 right-0 bg-primary text-[#181811] rounded-full p-1 shadow-md z-10">
                                                <Check className="w-3 h-3 stroke-[4]" />
                                            </div>
                                        )}
                                    </div>
                                    <span className={`text-xs font-bold ${selectedFrame === frame.id ? 'text-primary-dark dark:text-primary' : 'text-gray-400'}`}>
                                        {frame.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Privacy & Stats */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 pl-1">Privacidad y Estadísticas</h3>
                        <div className="bg-white dark:bg-surface-dark rounded-3xl overflow-hidden shadow-sm">
                            <div className="p-5 flex items-center justify-between border-b border-gray-50 dark:border-gray-800">
                                 <div className="flex flex-col">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="font-bold text-sm dark:text-white">Mostrar Ratio de Victoria</p>
                                        <span className="bg-[#e4e4ce] dark:bg-[#3f3f2e] text-[#5c5c4a] dark:text-[#bfbfac] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Public</span>
                                    </div>
                                    <p className="text-xs text-gray-400">Tus estadísticas de batalla</p>
                                 </div>
                                 <div 
                                    className="relative inline-flex items-center cursor-pointer"
                                    onClick={() => setShowWinRate(!showWinRate)}
                                >
                                    <input type="checkbox" className="sr-only peer" checked={showWinRate} readOnly />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                </div>
                            </div>

                            <div className="p-5 flex items-center justify-between">
                                 <div className="flex flex-col">
                                    <p className="font-bold text-sm dark:text-white mb-1">Permitir Invitaciones de Clan</p>
                                    <p className="text-xs text-gray-400">Recibir invitaciones de otros</p>
                                 </div>
                                 <div 
                                    className="relative inline-flex items-center cursor-pointer"
                                    onClick={() => setAllowGuildInvites(!allowGuildInvites)}
                                >
                                    <input type="checkbox" className="sr-only peer" checked={allowGuildInvites} readOnly />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-4"></div>
                <Button onClick={handleSave} fullWidth icon={<Save className="w-5 h-5" />}>
                    Guardar Cambios
                </Button>

            </main>
        </div>
    );
};