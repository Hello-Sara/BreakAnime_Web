
const User = require('../models/userModel');

exports.getAll = async (req, res) => {
    const users = await User.findAll();
    return users;
}

exports.getOneById = async (id, res) => {  
    const user = await User.findByPk(id);
    if(!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    return user;
}

// Méthode pour mettre à jour un utilisateur existant
 exports.updateUser = async(id, body, res) => {
    const user = await User.findByPk(id);
    if(!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    const updatedUser = await user.update(body);
    return updatedUser;
}

// Méthode pour supprimer un utilisateur
exports.deleteUser = async(id, res) => {
    // Code pour supprimer un utilisateur de la base de données
    const user = await User.findByPk(id);
    if(user) {
        await user.destroy();
    } else if(!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
}