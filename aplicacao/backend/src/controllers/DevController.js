//Somente nos controllers de API por boas praticas os metodos INDEX,SHOW,STORE,UPDATE,DELETE
const axios = require('axios');
const Dev = require('../models/Dev');
module.exports ={
   async index(req, res){
        const { user } = req.headers;
        const loggedDev = await Dev.findById(user);// instancia do usuário logado no banco de dados
       
        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },//ne == not equal 
                { _id: { $nin : loggedDev.likes } },// nin == not in
                { _id: { $nin : loggedDev.dislike } },// nin == not in
            ],
        })

        return res.json(users);
    },
   async store(req,res){
        const { username } = req.body; // recebe o nome do usuário passado via post
        
        const userExists = await Dev.findOne({ user: username});// encontra um usuário pra saber se é o mesmo do banco
        if(userExists){
            return res.json(userExists);// retorna o usuário existente no banco
        }

        //Inicio Criação de usuário
        const response = await axios.get(`https://api.github.com/users/${username}`);// passando o usuário que o corpo captura para o axios
        const {name, bio, avatar_url: avatar} = response.data;//response.data traz os dados que estão no response // o que vem no json é avatar_url, como esá fazendo um shotname muda o nome para avatar para ser chamada nas próximas funções
       
        const dev = await Dev.create({
           name,
           user : username,
           bio,
           avatar//shotname da response.data
       }) 
       return res.json(dev);// retornando só o que está consumindo no retorno da variavel dev// já cria o usuário no banco
    }
};