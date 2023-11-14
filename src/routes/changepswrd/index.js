const { Router } = require('express');
const passService = require("../../services/password");
const isAuthenticated = require("../../middlewares/isAuthenticated");

const router = Router();

router.put('/:id', isAuthenticated, async (req, res, next) => {
    const id = req?.params?.id;
    const password = req?.body?.password;

    try {
        const changePswrd = await passService.changePassword(id, password);
        return res.json({ changePswrd }).status(200);
    }
    catch(err){
        next(err);
    }
  
  });

module.exports = router;