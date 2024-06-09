const SeasonService = require('../services/seasonService');
const seasonService = new SeasonService();

exports.getAllSeasons = async (req, res) => {
  try {
    const seasons = await seasonService.getAllSeasons();
    res.status(200).json(seasons);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des saisons', error: error.message });
  }
};

exports.getSeasonById = async (req, res) => {
  try {
    const season = await seasonService.getSeasonById(req.params.id);
    if (!season) {
      return res.status(404).json({ message: 'Saison non trouvée' });
    }
    res.status(200).json(season);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la saison', error: error.message });
  }
};

exports.createSeason = async (req, res) => {
  try {
    const { season } = req.body;
    if (season < 0 || season > 3) {
      return res.status(400).json({ message: 'La valeur de la saison doit être un nombre entre 0 et 3' });
    }
    const newSeason = await seasonService.createSeason(req.body);
    res.status(201).json(newSeason);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la saison', error: error.message });
  }
};

exports.updateSeason = async (req, res) => {
  try {
    const { season } = req.body;
    if (season < 0 || season > 3) {
      return res.status(400).json({ message: 'La valeur de la saison doit être un nombre entre 0 et 3' });
    }
    const updatedSeason = await seasonService.updateSeason(req.params.id, req.body);
    if (!updatedSeason) {
      return res.status(404).json({ message: 'Saison non trouvée' });
    }
    res.status(200).json(updatedSeason);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la saison', error: error.message });
  }
};

exports.deleteSeason = async (req, res) => {
  try {
    await seasonService.deleteSeason(req.params.id);
    res.status(200).json({ message: 'Saison supprimée' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la saison', error: error.message });
  }
};