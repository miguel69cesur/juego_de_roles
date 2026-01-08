import React from 'react';
import { ArrowLeft, ChevronRight, HelpCircle, FileText, LogOut, Edit3, Volume2, Bell, Smartphone, Globe } from 'lucide-react';

interface SettingsScreenProps {
    onBack: () => void;
    onAudioSettings: () => void;
    onEditProfile: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, onAudioSettings, onEditProfile }) => {
    return (
        <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
            <header className="p-6 flex items-center gap-4">
                <button 
                    onClick={onBack}
                    className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-800 dark:text-white transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold text-[#181811] dark:text-white">Ajustes</h1>
            </header>

            <main className="flex-1 overflow-y-auto px-6 pb-24 no-scrollbar">
                
                {/* Profile Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative mb-4">
                        <div className="w-28 h-28 rounded-full border-4 border-white dark:border-surface-dark shadow-lg overflow-hidden">
                            <img src="https://picsum.photos/seed/p8/200" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                            <span className="bg-primary text-[#181811] text-xs font-bold px-2 py-0.5 rounded border-2 border-white dark:border-surface-dark">
                                LVL 42
                            </span>
                        </div>
                    </div>
                    <h2 className="text-xl font-bold dark:text-white">Anfitrión</h2>
                    <p className="text-gray-400 text-sm font-medium mb-4">Imitador Pro</p>
                    <button 
                        onClick={onEditProfile}
                        className="bg-primary text-[#181811] px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:brightness-105 transition-all shadow-sm"
                    >
                        <Edit3 className="w-4 h-4" />
                        Editar Perfil
                    </button>
                </div>

                {/* Audio Section */}
                <section className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-xl text-yellow-600 dark:text-primary">
                            <Volume2 className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-lg dark:text-white">Audio</h3>
                    </div>
                    
                    <div className="bg-white dark:bg-surface-dark rounded-3xl p-5 shadow-sm space-y-6">
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="dark:text-gray-300">Música</span>
                                <span className="text-gray-400">70%</span>
                            </div>
                            <input 
                                type="range" 
                                className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" 
                                defaultValue={70} 
                            />
                        </div>
                        <div className="space-y-3">
                             <div className="flex justify-between text-sm font-medium">
                                <span className="dark:text-gray-300">Efectos</span>
                                <span className="text-gray-400">50%</span>
                            </div>
                            <input 
                                type="range" 
                                className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" 
                                defaultValue={50} 
                            />
                        </div>
                        <button onClick={onAudioSettings} className="w-full text-center text-primary font-bold text-sm hover:underline">
                            Mezclador Avanzado
                        </button>
                    </div>
                </section>

                {/* General Section */}
                <section className="mb-8">
                     <div className="flex items-center gap-2 mb-4">
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-xl text-yellow-600 dark:text-primary">
                            <Smartphone className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-lg dark:text-white">General</h3>
                    </div>

                    <div className="bg-white dark:bg-surface-dark rounded-3xl overflow-hidden shadow-sm">
                        <div className="p-5 flex items-center justify-between border-b border-gray-50 dark:border-gray-800">
                             <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400">
                                    <Bell className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm dark:text-white">Notificaciones</p>
                                    <p className="text-xs text-gray-400">Actualizaciones y retos</p>
                                </div>
                             </div>
                             <div className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                            </div>
                        </div>

                        <div className="p-5 flex items-center justify-between border-b border-gray-50 dark:border-gray-800">
                             <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400">
                                    <Smartphone className="w-5 h-5" />
                                </div>
                                <p className="font-bold text-sm dark:text-white">Vibración</p>
                             </div>
                             <div className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                            </div>
                        </div>

                        <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                             <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <p className="font-bold text-sm dark:text-white">Idioma</p>
                             </div>
                             <div className="flex items-center gap-2 text-gray-400 text-sm">
                                 Español
                                 <ChevronRight className="w-4 h-4" />
                             </div>
                        </div>
                    </div>
                </section>

                {/* Support Section */}
                <section className="mb-8">
                     <div className="flex items-center gap-2 mb-4">
                        <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-xl text-yellow-600 dark:text-primary">
                            <HelpCircle className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-lg dark:text-white">Soporte</h3>
                    </div>
                    
                    <div className="bg-white dark:bg-surface-dark rounded-3xl overflow-hidden shadow-sm">
                         <div className="p-5 flex items-center justify-between border-b border-gray-50 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <span className="font-bold text-sm dark:text-white">Centro de Ayuda</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                         </div>
                         <div className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <span className="font-bold text-sm dark:text-white">Política de Privacidad</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                         </div>
                    </div>
                </section>

                <button className="w-full bg-red-50 hover:bg-red-100 text-red-500 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors mb-4">
                    <LogOut className="w-5 h-5" />
                    Cerrar Sesión
                </button>
                
                <p className="text-center text-xs text-gray-400">Versión 1.0.4</p>

            </main>
        </div>
    );
};