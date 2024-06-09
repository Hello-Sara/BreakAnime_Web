const AnimeService = require('../services/animeService'); // Ajustez le chemin selon votre structure de projet

describe('AnimeService', () => {
  describe('mapType', () => {
    it('should correctly map types', () => {
      expect(AnimeService.mapType(0)).toEqual('ANIME TV');
      expect(AnimeService.mapType(1)).toEqual('FILM');
      expect(AnimeService.mapType(2)).toEqual('SPECIAL');
      expect(AnimeService.mapType(4)).toEqual('ANIME ONA');
      expect(AnimeService.mapType(5)).toEqual('MUSIC');
      expect(AnimeService.mapType(6)).toEqual('UNDEFINED');
      expect(AnimeService.mapType(999)).toEqual('UNKNOWN');
    });
  });

  describe('mapStatus', () => {
    it('should correctly map statuses', () => {
      expect(AnimeService.mapStatus(0)).toEqual('FINI');
      expect(AnimeService.mapStatus(1)).toEqual('EN COURS');
      expect(AnimeService.mapStatus(2)).toEqual('PAS ENCORE DIFFUSÉ');
      expect(AnimeService.mapStatus(999)).toEqual('UNKNOWN');
    });
  });
});