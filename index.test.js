const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')

describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - Test creating a band
        const band = await Band.create({ name: 'The Beatles', genre: 'Rock' });
        const band_1 = await Band.create({ name: 'The Prodigy', genre: 'Metal'})

        expect(band.name).toEqual('The Beatles');
        expect(band.genre).toEqual('Rock');

        expect(band_1.name).toEqual('The Prodigy');
        expect(band_1.genre).toEqual('Metal');
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const musician = await Musician.create({ name: 'Jimi Hendrix', instrument: 'Guitar' });
    
        expect(musician.name).toEqual('Jimi Hendrix');
        expect(musician.instrument).toEqual('Guitar');
    })

    test('can create a Song', async () => {
        // TODO - test creating a song
        const song = await Song.create({ title: 'Bohemian Rhapsody', year: 1975 });
        const song_1 = await Song.create({ title: 'The Nights', year: 2013 });

        expect(song.title).toEqual('Bohemian Rhapsody');
        expect(song.year).toEqual(1975);

        expect(song_1.title).toEqual('The Nights');
        expect(song_1.year).toEqual(2013);
    })
})