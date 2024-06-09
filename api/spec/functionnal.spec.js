const SeasonService = require('../services/seasonService'); // Ajustez le chemin selon votre structure de projet

describe('SeasonService Functional Tests', () => {
    it('should return a list of seasons', async () => {
        const seasonService = new SeasonService();
        const seasonList = await seasonService.getAllSeasons();
        expect(Array.isArray(seasonList)).toBe(true);
        expect(seasonList.length).toBeGreaterThan(0);
    });
});