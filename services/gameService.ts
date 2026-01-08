import { Player, RoundData } from '../types';
import { QUESTIONS, TOTAL_ROUNDS } from '../constants';

export const getRandomQuestion = (): string => {
    const randomIndex = Math.floor(Math.random() * QUESTIONS.length);
    return QUESTIONS[randomIndex];
};

export const generateRound = (players: Player[], currentRoundNumber: number): RoundData => {
    // Pick an imitator
    const imitatorIndex = Math.floor(Math.random() * players.length);
    const imitator = players[imitatorIndex];

    // Pick a target (must not be the imitator)
    let targetIndex = Math.floor(Math.random() * players.length);
    while (targetIndex === imitatorIndex && players.length > 1) {
        targetIndex = Math.floor(Math.random() * players.length);
    }
    const target = players[targetIndex];

    return {
        roundNumber: currentRoundNumber,
        totalRounds: TOTAL_ROUNDS,
        imitatorId: imitator.id,
        targetId: target.id,
        question: getRandomQuestion(),
    };
};

export const calculateScore = (currentScore: number, votes: 'pass' | 'fail'): number => {
    // Simple scoring: Pass = +100, Fail = 0
    return votes === 'pass' ? currentScore + 100 : currentScore;
};