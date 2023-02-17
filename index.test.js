const { sequelize } = require('./db');
const { Band, Musician, Song } = require('./index');

describe('Band, Musician, and Song Models', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    test('can create a Band', async () => {
        const band = await Band.create({ name: 'The Beatles', genre: 'Rock' });
        const band_1 = await Band.create({ name: 'The Prodigy', genre: 'Metal' });

        expect(band.name).toEqual('The Beatles');
        expect(band.genre).toEqual('Rock');

        expect(band_1.name).toEqual('The Prodigy');
        expect(band_1.genre).toEqual('Metal');
    });

    test('can create a Musician', async () => {
        const musician = await Musician.create({ name: 'Jimi Hendrix', instrument: 'Guitar' });

        expect(musician.name).toEqual('Jimi Hendrix');
        expect(musician.instrument).toEqual('Guitar');
    });

    test('adding multiple Musicians to a band', async () => {
        const bands = await Band.findAll();

        for (const band of bands) {
        await Musician.create({ name: 'John Lennon', instrument: 'Guitar'});
        await Musician.create({ name: 'Paul McCartney', instrument: 'Bass'});
        await Musician.create({ name: 'George Harrison', instrument: 'Guitar'});
        await Musician.create({ name: 'Ringo Starr', instrument: 'Drums'});

        const musicians = await band.getMusicians();
        expect(musicians.map((musician) => musician.name)).toContain('John Lennon');
        expect(musicians.map((musician) => musician.instrument)).toContain('Bass');
        }
    });

    test('can create a Song', async () => {
        const song = await Song.create({ title: 'Bohemian Rhapsody', year: 1975 });
        const song_1 = await Song.create({ title: 'The Nights', year: 2013 });

        expect(song.title).toEqual('Bohemian Rhapsody');
        expect(song.year).toEqual(1975);

        expect(song_1.title).toEqual('The Nights');
        expect(song_1.year).toEqual(2013);
    });

    describe('retrieving songs and musicians for a band', () => {
        beforeEach(async () => {
            const band = await Band.create({ name: 'Test Band', genre: 'Test Genre' });
            const musician = await Musician.create({ name: 'Test Musician' });
            const song = await Song.create({ title: 'Test Song' });
            await band.addMusician(musician);
            await band.addSong(song);
        });

        test('can retrieve all songs for a band', async () => {
            const band = await Band.findOne({ where: { name: 'Test Band', genre: 'Test Genre' } });
            const songs = await band.getSongs();
            expect(songs).toHaveLength(1);
            expect(songs[0].title).toBe('Test Song');
        });

        test('can retrieve all musicians for a band', async () => {
            const band = await Band.findOne({ where: { name: 'Test Band' } });
            const musicians = await band.getMusicians();
            expect(musicians).toHaveLength(1);
            expect(musicians[0].name).toBe('Test Musician');
        });
    });
    
    describe('Eager Loading', () => {
        beforeEach(async () => {
            const band = await Band.create({ name: 'Test Band', genre: 'Test Genre' });
            const musician = await Musician.create({ name: 'Test Musician' });
            const song = await Song.create({ title: 'Test Song' });
            await band.addMusician(musician);
            await band.addSong(song);
        });

        test('can retrieve all songs and musicians for a band using eager loading', async () => {
          const findBand = await Band.findAll({
            where: { name: 'Test Band', genre: 'Test Genre' },
            include: [
              {model: Musician, as: 'Musicians'},
              {model: Song, as: 'Songs'}
            ]
          });

          const musicians = findBand[0].Musicians;
          const songs = findBand[0].Songs;
          
          expect(musicians[0].name).toBe('Test Musician');
          expect(songs[0].title).toBe('Test Song');
        });
    });
})