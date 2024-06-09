const authService = require('../services/authService');
const authController = require('../controllers/authController');
const { createRequest, createResponse } = require('node-mocks-http');

describe('Authentication API', () => {
  it('should login a user successfully', async () => {
    const req = createRequest({ body: { username: 'testuser', password: 'testpassword' } });
    const res = createResponse();

    // Créer un espion pour authService.login
    const spyLogin = spyOn(authService, 'login').and.returnValue('mocked-token');

    await authController.login(req, res);

    // Vérifier que l'espion a été appelé avec les bons arguments
    expect(spyLogin).toHaveBeenCalledWith('testuser', 'testpassword');
    
    // Vérifier le résultat de la réponse
    expect(JSON.parse(res._getData())).toEqual({ token: 'mocked-token' });
  });

  it('should handle invalid credentials during login', async () => {
    const req = createRequest({ body: { username: 'invaliduser', password: 'invalidpassword' } });
    const res = createResponse();

    // Créer un espion pour authService.login qui lance une erreur
    const spyLogin = spyOn(authService, 'login').and.throwError(new Error('Invalid credentials'));

    await authController.login(req, res);

    // Vérifier que l'espion a été appelé avec les bons arguments
    expect(spyLogin).toHaveBeenCalledWith('invaliduser', 'invalidpassword');
    
    // Vérifier le résultat de la réponse
    expect(res._getStatusCode()).toEqual(401);
    expect(JSON.parse(res._getData())).toEqual({ error: 'Invalid credentials' });
  });

  it('should register a user successfully', async () => {
    const req = createRequest({ body: { username: 'newuser', password: 'newpassword' } });
    const res = createResponse();

    // Créer un espion pour authService.register
    const spyRegister = spyOn(authService, 'register').and.returnValue('mocked-token');

    await authController.register(req, res);

    // Vérifier que l'espion a été appelé avec les bons arguments
    expect(spyRegister).toHaveBeenCalledWith('newuser', 'newpassword');
    
    // Vérifier le résultat de la réponse
    expect(JSON.parse(res._getData()).token).toEqual('mocked-token');
  });

  it('should handle registration failure', async () => {
    const req = createRequest({ body: { username: 'existinguser', password: 'existingpassword' } });
    const res = createResponse();

    // Créer un espion pour authService.register qui lance une erreur
    const spyRegister = spyOn(authService, 'register').and.throwError({ "error": 'Username already in use' });

    await authController.register(req, res);

    // Vérifier que l'espion a été appelé avec les bons arguments
    expect(spyRegister).toHaveBeenCalledWith('existinguser', 'existingpassword');
    
    // Vérifier le résultat de la réponse
    expect(res._getStatusCode()).toEqual(400);
  });
});
