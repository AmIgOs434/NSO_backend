const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const Skladi = sequelize.define('Skladi', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    Name: {type: DataTypes.STRING},
    Nmae1: {type: DataTypes.STRING},
    nachalo: {type: DataTypes.STRING},
    konets: {type: DataTypes.STRING},
    ploshad: {type: DataTypes.STRING},
    photo:{type: DataTypes.STRING},
    oblast: {type: DataTypes.STRING},
    adres: {type: DataTypes.STRING},
    type:{type: DataTypes.STRING},
     m:{type: DataTypes.INTEGER},
          trans:{type: DataTypes.TEXT},

}
)

const Skladi_tseli = sequelize.define('Skladi_tseli', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    title: {type: DataTypes.STRING},

}
)


const Skladi_tsifri = sequelize.define('Skladi_tsifri', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    title: {type: DataTypes.STRING},
    desk: {type: DataTypes.STRING},

}
)

const Skladi_photo = sequelize.define('Skladi_photo', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    photo: {type: DataTypes.STRING},

}
)

const Skladi_raboti = sequelize.define('Skladi_raboti', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    title: {type: DataTypes.STRING},

})
const Statya = sequelize.define('Statya', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    name: {type: DataTypes.STRING},
    photo: {type: DataTypes.STRING},
    ttle: {type: DataTypes.TEXT},
    name1: {type: DataTypes.TEXT},

})
const Statya_item = sequelize.define('Statya_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    name: {type: DataTypes.STRING},
    ttle: {type: DataTypes.STRING},
    desc: {type: DataTypes.STRING},
    back: {type: DataTypes.STRING},
  

}
)

Statya.hasMany(Statya_item, {as: 'Statya_item'});
Statya_item.belongsTo(Statya)

Skladi.hasMany(Skladi_tseli, {as: 'Skladi_tseli'});
Skladi_tseli.belongsTo(Skladi)

Skladi.hasMany(Skladi_tsifri, {as: 'Skladi_tsifri'});
Skladi_tsifri.belongsTo(Skladi)

Skladi.hasMany(Skladi_photo, {as: 'Skladi_photo'});
Skladi_photo.belongsTo(Skladi)

Skladi.hasMany(Skladi_raboti, {as: 'Skladi_raboti'});
Skladi_raboti.belongsTo(Skladi)




module.exports = {
    Statya,
    Statya_item,
    Skladi,
    Skladi_tseli,
    Skladi_tsifri,
    Skladi_photo,
    Skladi_raboti
}
