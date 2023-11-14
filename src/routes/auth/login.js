const { Router } = require('express');
const loginService = require('../../services/login');

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginService.loginUser(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    return res.json({ user }).status(200);

  } catch (error) {
    console.log("is it running?", error);
    next(error);
  }
});

module.exports = router;
