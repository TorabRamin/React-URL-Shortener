const router         = require('express').Router();
const {Direction}    = require('../utils/db'); 
const {check}        = require('express-validator');
const rejectInvalid  = require('../middlewares/reject_invalid');
const _p             = require('../utils/promise_errors');

const entryValidator = [check('url').isURL()]
router.post('/api/v1/redirects',entryValidator,rejectInvalid,async (req,res,next)=>{
    let user_id = req.user.id;
    let destination = req.body.url;
    let timestamp = Date.now()/1000;
    // Creating a base32 Number : 1,2,3,4,5,6,7,8,9,0,a,b,c.......
    let hash = parseInt(`${user_id}${timestamp}`).toString(32);
    let [cretErr,created] = await _p(Direction.create({
        user_id,destination,hash
    }));
    if(cretErr && !created){
        next(cretErr);
    }
    else{
        res.json({
            message:"Direction creted Successfully",
            hash
        })
    }
})

router.get('/api/v1/redirects', async(req,res)=>{
    let [dberr,myDirections] = await _p(Direction.findAll({
        where:{
            user_id:req.user.id
        }
    }));
    if(dberr) return next(dberr);
    return res.json(myDirections.map(d=>{
        return {
            id:d.id,
            destination:d.destination,
            hash:d.hash,
            created_at:d.createdAt
        }
    }));
});



module.exports = router;