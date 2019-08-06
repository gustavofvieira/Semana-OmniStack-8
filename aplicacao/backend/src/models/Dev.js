const {Schema, model} = require('mongoose');
const DevSchema = new Schema({
    name: {
        type: String,
        required:true,
      },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },

    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',//referencia de dev o id dos likes
    }],
    dislike: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',//referencia de dev o id dos likes
    }],

},{
    timestamps: true, // cria uma coluna de createdAt e updateAt
});

module.exports = model('Dev', DevSchema);//exporta o model o nome do model como primeiro parametro e o schema como segundo parametro