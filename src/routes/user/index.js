const { Router } = require('express');
const userService = require("../../services/user");
const isAuthenticated = require("../../middlewares/isAuthenticated");

const router = Router();

// create new user
router.post('/', isAuthenticated, async (req, res, next) =>{
    
    const name = req.body.displayName;
    const email = req.body.email;
    const password = req.body.password;
    const organization = req.body.organization;

    const emailExists = await userService.ifEmailExists(email);
    try {
        if (emailExists?.USER_NAME === email) {
            return res.json({ message: 'Email/Username Already Exists!' }).status(200);
        }
    else {
            const getUserid = await userService.getLastUserId();
            const userId = Number(getUserid.replace(/[^0-9]/g, '')) + 1;
            const createuser = await userService.createUser(userId, name, email, password, organization);

            return res.json({message: 'User Created Successfully!'}).status(200);
        }
    }
    catch(error){
        next(error);
    }
})

// select organization and location on creating new user
router.get('/org', async(req,res,next)=>{
    try {
        const org_list = await userService.orgList();
        return res.json({org_list}).status(200);
    }
    catch(error){
        next(error);
    }
})

module.exports = router;