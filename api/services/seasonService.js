const Season = require('../models/seasonModel');

class SeasonService {
    async getAllSeasons() {
        const seasons = await Season.findAll({
            order: [
                ['year', 'DESC']
            ]
        });
        return seasons.map(animeSeason => this.mapSeason(animeSeason));
    }
    async getSeasonById(id) {
        return await Season.findByPk(id);
    }

    async createSeason(season) {
        const existingSeason = await Season.findOne({ where: { season: season.season, year: season.year } });
        if (existingSeason) {
            throw new Error('Une saison avec cette combinaison de season et year existe déjà');
        }
        return await Season.create(season);
    }

    async updateSeason(id, season) {
        const existingSeason = await Season.findOne({ 
            where: { 
                season: season.season, 
                year: season.year, 
                id: { [Op.ne]: id } 
            } 
        });
        if (existingSeason) {
            throw new Error('Une saison avec cette combinaison de season et year existe déjà');
        }
        return await Season.update(season, { where: { id: id } });
    }

    async findSeasonBySeasonAndYear(season, year) {
        return await Season.findOne({ where: { season: season, year: year } });
    }

    async deleteSeason(id) {
        return await Season.destroy({ where: { id: id } });
    }

    mapSeason(season) {
        switch(season.season) {
            case 0:
                return {id: season.id, 'season' : 'Printemps', year: season.year};
            case 1:
                return {id: season.id, 'season' :'Été', year: season.year};
            case 2:
                return {id: season.id, 'season' :'Automne', year: season.year};
            case 3:
                return {id: season.id, 'season' :'Hiver', year: season.year};
            default:
                return {id: season.id, 'season' :'Inconnu', year: season.year};
        }
    }
}

module.exports = SeasonService;