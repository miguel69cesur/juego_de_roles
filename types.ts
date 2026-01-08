export interface Player {
    id: string;
    name: string;
    score: number;
    avatarId: number; // For picking a random avatar image
}

export enum GameScreen {
    HOME = 'HOME',
    SETUP = 'SETUP',
    ROUND = 'ROUND',
    RESULTS = 'RESULTS',
    HOW_TO_PLAY = 'HOW_TO_PLAY',
    SETTINGS = 'SETTINGS',
    AUDIO_SETTINGS = 'AUDIO_SETTINGS',
    EDIT_PROFILE = 'EDIT_PROFILE'
}

export enum RoundPhase {
    PRE_ROUND = 'PRE_ROUND', // "Pass phone to [Imitator]"
    ACTION = 'ACTION',       // "Imitate [Target] answering [Question]"
    VOTING = 'VOTING',       // "Did they do well?"
}

export interface RoundData {
    roundNumber: number;
    totalRounds: number;
    imitatorId: string;
    targetId: string;
    question: string;
}

export interface GameState {
    screen: GameScreen;
    players: Player[];
    currentRound: RoundData | null;
    phase: RoundPhase;
}