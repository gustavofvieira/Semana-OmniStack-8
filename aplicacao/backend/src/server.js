const express = require('express');//referenciando o servidor express
const mongoose = require('mongoose');//importando o mongoose, um orm js para trabalhar com o mongodb // user omnistack
const routes = require('./routes');//referenciando o servidor express
const cors = require('cors');// referencia o cors para o react poder acessar.

const server = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-izsy3.mongodb.net/omnistack8?retryWrites=true&w=majority',{
    useNewUrlParser: true
});
server.use(cors());//para o react consumir
server.use(express.json());// para o express interpretar o json
server.use(routes);

server.listen(3333);//passando a porta e iniciando o servidor
