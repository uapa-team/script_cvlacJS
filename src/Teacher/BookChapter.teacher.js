const {getSubstring} = require('../Utils');

module.exports =
class BookChapter {
    constructor(properties) {
        this._dni = properties.dni;
        this._queryText = properties.queryText;
    }

    /**
     * Get ALL capBook's info
     * @returns {Object} Object
     */
    get info() {
        return {
            dni: this._dni,
            title: this.title,
            year: this.year,
            authors: this.authors,
            country: this.country,
            isbn: this.isbn,
            editorial: this.editorial,
            pages: this.pages,
        }
    }

    /**
     * Get authors
     * @returns {Array} Array of capBook's authors
     */
    get authors() {
        const authors = this._queryText.split(',').filter(element => element.includes('Tipo:'))
        return authors.map(element => getSubstring(element, 'Tipo: Otro capítulo de libro publicado', -1));
    }

    /**
     * Get title
     * @returns {String} BookChapter's title
     */
    get title() {
        return this._queryText.split('"')[1];
    }

     /**
     * Get year
     * @returns {String} BookChapter's year
     */
    get year() {
        return this._queryText.split(',').slice(-1)[0];
    }

    /**
     * Get country
     * @returns {String} BookChapter's country
     */
    get country() {
        return getSubstring(this._queryText, 'En:', 'ISBN');
    }

    /**
     * Get isbn
     * @returns {String} BookChapter's isbn
     */
    get isbn() {
        return getSubstring(this._queryText, 'ISBN:', 'ed:');
    }

    /**
     * Get editorial
     * @returns {String} BookChapter's editorial
     */
    get editorial() {
        return getSubstring(this._queryText, 'ed:', ',');
    }

    /**
     * Get pages
     * @returns {String} BookChapter's pages
     */
    get pages() {
        return getSubstring(this._queryText, 'p.', ',');
    }


}

//
// const capBookExample = new BookChapter({
//     dni: '79523926',
//     capBook: `Tipo: Otro capítulo de libro publicado
// JUAN CARLOS VELEZ DIAZ, Tipo: Otro capítulo de libro publicado
// MARIA GABRIELA CALLE, Tipo: Otro capítulo de libro publicado
// GEOVANNI BERDUGO, "Testbed for evaluating Wireless Sensor Networks with non-line of sight links" 2012 International Symposium On Wireless Communication Systems (Iswcs) Proceedings . En: Francia  ISBN: 978-1-4673-0762-8  ed: IEEE Publications , v. , p.136 - 140  1 ,2012`
// }).info;
//
// console.log(capBookExample)

