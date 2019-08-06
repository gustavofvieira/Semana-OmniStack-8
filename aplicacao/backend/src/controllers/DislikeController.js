const Dev = require('../models/Dev');
module.exports = {
   async store(req,res){
        console.log(req.params.devId);// user que está recebendo o like
        console.log(req.headers.user);// o header user que está dando o like 
        const { devId } = req.params;
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);//quem está recebendo o like
        
        if(!targetDev){
            return res.status(400).json({ error: "Dev not exists"});
        }

        loggedDev.dislike.push(targetDev._id);//se encontrou ele dá um push no array com o id no desenvolvedor dado like 
        await loggedDev.save(); // salva as informações
        return res.json(loggedDev);
    }
};