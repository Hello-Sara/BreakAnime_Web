
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddlewares'); 

const router = express.Router();

/**
 * @api {get} /users Request all users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {Object[]} users List of users.
 * @apiSuccess {Number} users.id User's unique ID.
 * @apiSuccess {String} users.name User's name.
 */
router.get('/users', authMiddleware.isAdmin, async (req, res) => {
    try {
        const users = await userController.getAll();
        res.status(200).json(users);
        return;
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs.', error: error.message});
        return;
    }  
});


/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 */
router.get('/user/:id', authMiddleware.isAdmin, async (req, res) => { 
    try {
        const user = await userController.getOneById(req.params.id, res);
        res.status(200).json(user);
        return;
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'utilisateur.', error: error.message });
        return;
    }

});

/**
 * @api {put} /user/:id Modify user information
 * @apiName PutUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 */
router.put('/user/:id', authMiddleware.isAdminOrIdRelatedToUser, async (req, res) => {
    try {
        const updatedUser = await userController.updateUser(req.params.id, req.body, res);
        res.status(200).json(updatedUser);
        return;
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'utilisateur.', error: error.message });
        return;
    }
});

/**
 * @api {delete} /user/:id Delete user information
 * @apiName DeleteUser
 * @apiGroup User
 * @apiParam {Number} id Users unique ID.
 */
router.delete('/user/:id', authMiddleware.isAdminOrIdRelatedToUser, async (req, res) => { 
    try {
        await userController.deleteUser(req.params.id, res);
        res.status(204).end();
        return;
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'utilisateur.', error: error.message });
        return;
    }
});

module.exports = router;