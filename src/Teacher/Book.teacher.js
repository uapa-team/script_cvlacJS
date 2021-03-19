const {getSubstring, getLastSubstring} = require('../Utils');

module.exports =
class Book {
    constructor(options) {
        this._queryText = options.queryText;
        this._dni = options.dni;
    }

    /**
     * Get ALL book's info
     * @returns {Object} Object
     */
    get info() {
        return {
            dni: this._dni,
            name: this.authors,
            country: this.country,
            editorial: this.editorial,
            isbn: this.isbn,
        }
    }

    /**
     * Get authors
     * @returns {Array<string>} Book's authors
     */
    get authors() {
        return this._queryText.split('"')[0].split(',').filter((nameStr) => {
            //NOTE: I'd like to use .map but sometimes the split array returns a void string as normal array element
            return nameStr.trim();
        });
    }

    /**
     * Get country
     * @returns {String} Book's country
     */
    get country() {
        return getSubstring(this._queryText, 'En:', 'ed:').split(' ').shift(0);
    }

     /**
     * Get editorial
     * @returns {String} Book's editorial
     */
    get editorial() {
        return getLastSubstring(this._queryText, 'ed:', 'ISBN:');
    }

    /**
     * Get isbn
     * @returns {String} Book's isbn
     */
    get isbn() {
        return getLastSubstring(this._queryText, 'ISBN:', 'v.');
    }

}
//
// const bookExample = new Book({
//     dni: '79523926',
//     queryText: `JUAN MIGUEL MANTILLA GONZALEZ, C GALEANO, DIEGO ALEXANDER GARZON ALVARADO, "Aplicaciones De Elementos Finitos" En: Colombia 2012.  ed:Editorial Universidad Nacional De Colombia  ISBN: 978-958-719-982-6  v. pags. `
// }).info;
//
// console.log(bookExample)

