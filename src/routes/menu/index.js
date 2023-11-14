const { Router } = require('express');
const MenuService = require("../../services/menu");

const router = Router();

router.get('/:id', async(req,res,next)=>{
    try {
        var id = req.params.id;
        const menu = await MenuService.menuList(id);

        return res.json({menu}).status(200);
    }
    catch(error){
        next(error);
    }
})

module.exports = router;