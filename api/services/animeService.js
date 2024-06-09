const Anime = require('../models/animeModel');
const Synonyms = require('../models/synonymsModel');
const Genre = require('../models/genreModel');
const AnimeSeason = require('../models/seasonModel');
const SeasonService = require('./seasonService');
const { Op } = require('sequelize');

class AnimeService {
    
    // Afficher tous les animes avec leurs synonymes
    static async getAllAnimes() {
        const seasonService = new SeasonService();
        try {
            let animes = await Anime.findAll({
                attributes: { exclude: ['season_id'] }, // Exclure season_id de la réponse
                include: [{
                    model: Synonyms,
                    as: 'synonyms',
                    attributes: ['name']
                }, {
                    model: Genre,
                    as: 'genres',
                    attributes: ['name', 'description'],
                    through: { attributes: [] } // Cela exclut les attributs de la table d'association
                },
                {
                    model: AnimeSeason,
                    as: 'animeSeason',
                    attributes: ['season', 'year', 'id'] // Ajoutez les attributs que vous voulez récupérer
                }]
            });

            animes = animes.map(anime => {
                const plainAnime = anime.get({ plain: true }); // Convertir l'objet Sequelize en une version modifiable
                if(plainAnime.animeSeason) {
                    plainAnime.animeSeason = seasonService.mapSeason(plainAnime.animeSeason);
                }
                return plainAnime;
            });

            return animes;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Afficher un anime spécifique par son ID avec ses synonymes
    static async getAnimeById(id) {
        const seasonService = new SeasonService();
        try {
            let anime = await Anime.findByPk(id, {
                attributes: { exclude: ['season_id'] }, // Exclure season_id de la réponse
                include: [{
                    model: Synonyms,
                    as: 'synonyms',
                    attributes: ['name']
                }, {
                    model: Genre,
                    as: 'genres',
                    attributes: ['name', 'description'],
                    through: { attributes: [] } // Cela exclut les attributs de la table d'association
                },
                {
                    model: AnimeSeason,
                    as: 'animeSeason',
                    attributes: ['season', 'year', 'id'] // Ajoutez les attributs que vous voulez récupérer
                }
            ]
            });
            if (!anime) {
                const error = new Error('Anime non trouvé');
                error.name = 'NOT_FOUND';
                throw error;
            } else {
                animes = animes.map(anime => {
                    const plainAnime = anime.get({ plain: true }); // Convertir l'objet Sequelize en une version modifiable
                    if(plainAnime.animeSeason) {
                        plainAnime.animeSeason = seasonService.mapSeason(plainAnime.animeSeason);
                    }
                    return plainAnime;
                });
            }

            return anime;
        } catch (error) {
            throw error;
        }
    }

    // Rechercher un anime par titre ou synonyme
    static async searchAnimeByTitleOrSynonym(term) {
        const seasonService = new SeasonService();
        try {
            const animes = await Anime.findAll({
                where: {
                    [Op.or]: [
                        { titre: { [Op.like]: '%' + term + '%' } },
                        { '$synonyms.name$': { [Op.like]: '%' + term + '%' } }
                    ]
                },
                include: [{
                    model: Synonyms,
                    as: 'synonyms',
                    attributes: ['name']
                }, {
                    model: Genre,
                    as: 'genres',
                    attributes: ['name', 'description'],
                    through: { attributes: [] }
                }, {
                    model: AnimeSeason,
                    as: 'animeSeason',
                    attributes: ['season', 'year', 'id']
                }]
            });

            return animes.map(anime => {
                const plainAnime = anime.get({ plain: true });
                if(plainAnime.animeSeason) {
                    plainAnime.animeSeason = seasonService.mapSeason(plainAnime.animeSeason);
                }
                return plainAnime;
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Créer un nouvel anime avec ses synonymes
    static async createAnime(data) {
        try {
            const { synonyms, seasonId,  ...animeData } = data;
            const anime = await Anime.create(animeData);
            if (synonyms && synonyms.length > 0) {
                const synonymsData = synonyms.map(synonym => ({ name: synonym, anime_id: anime.id }));
                await Synonyms.bulkCreate(synonymsData);
            }

            if (seasonId) {
                const season = await AnimeSeason.findByPk(seasonId);
                if (!season) {
                    const error = new Error('Saison non trouvée');
                    error.name = 'NOT_FOUND';
                    throw error;
                }
    
                await anime.setAnimeSeason(season);
            }
            return anime;
        } catch (error) {
            throw error;
        }
    }

    // Mettre à jour un anime existant et ses synonymes
    static async updateAnime(id, data) {
        try {
            const { synonyms, ...animeData } = data;
            const anime = await Anime.findByPk(id);
            if (!anime) {
                const error = new Error('Anime non trouvé');
                error.name = 'NOT_FOUND';
                throw error;
            }
            await anime.update(animeData);
            if (synonyms && synonyms.length > 0) {
                // Supprimer les anciens synonymes
                await Synonyms.destroy({ where: { anime_id: id } });
                // Ajouter les nouveaux synonymes
                const synonymsData = synonyms.map(synonym => ({ name: synonym, anime_id: id }));
                await Synonyms.bulkCreate(synonymsData);
            }
            return anime;
        } catch (error) {
            throw error;
        }
    }

    // Supprimer un anime
    static async deleteAnime(id) {
        try {
            const anime = await Anime.findByPk(id);
            if (!anime) {
                const error = new Error('Anime non trouvé');
                error.name = 'NOT_FOUND';
                throw error;
            }
            await Synonyms.destroy({ where: { anime_id: id } });
            await anime.destroy();
            return anime;
        } catch (error) {
            throw error;
        }
    }

    static async addGenresToAnime(animeId, genreIds) {
        try {
            const anime = await Anime.findByPk(animeId);
            if (!anime) {
                const error = new Error('Anime non trouvé');
                error.name = 'NOT_FOUND';
                throw error;
            }
    
            const genres = await Genre.findAll({
                where: {
                    id: genreIds
                }
            });
    
            if (genres.length !== genreIds.length) {
                const error = new Error('Un ou plusieurs genres non trouvés');
                error.name = 'NOT_FOUND';
                throw error;
            }
    
            await anime.addGenres(genres);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AnimeService;