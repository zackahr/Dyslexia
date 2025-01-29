export class CreatePlayDto {
    playerId: string;
    gameId: string;
    pdfId: string;
    timeSpent?: number;
    videoId?: string;
    voiceId?: string;
    score?: number;
}