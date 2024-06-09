const Season = require('../models/seasonModel');

class SeasonService {
    async getAllSeasons() {
        const seasons = await Season.findAll();
       // console.log(seasons);
        return seasons.map(animeSeason => this.mapSeason(animeSeason));
    }
    async getSeasonById(id) {
        return await Season.findByPk(id);
    }

    async createSeason(season) {
        return await Season.create(season);
    }

    async updateSeason(id, season) {
        return await Season.update(season, { where: { id: id } });
    }

    async deleteSeason(id) {
        return await Season.destroy({ where: { id: id } });
    }

    static mapSeason(season) {
        switch(season.season) {
            case '0':
                return {id: season.id, 'season' : 'Printemps', year: season.year};
            case '1':
                return {id: season.id, 'season' :'Été', year: season.year};
            case '2':
                return {id: season.id, 'season' :'Automne', year: season.year};
            case '3':
                return {id: season.id, 'season' :'Hiver', year: season.year};
            default:
                return {id: season.id, 'season' :'Inconnu', year: season.year};
        }
    }
}

module.exports = SeasonService;