const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song} = require('./Song')

Band.hasMany(Musician);
Musician.belongsTo(Band);
Band.hasMany(Song);
Song.belongsTo(Band);

module.exports = {
    Band,
    Musician,
    Song
};
