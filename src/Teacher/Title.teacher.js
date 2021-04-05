const {getSubstring} = require('../Utils');

module.exports =
class Title {
    constructor(options) {
        this._dni = options.dni;
        this._queryText = options.queryText;
    }

    /**
     * Get ALL software's info
     * @returns {Object} Object
     */
    get info() {
        return {
            dni: this._dni,
            name: this.name,
            institution: this.institution,
            period: this.period,
            level: this.level,
        }
    }

    /**
     * Get name
     * @returns {String} Title's name
     */
    get name() {
        return this._queryText.split('\n')[1];
    }

    /**
     * Get institution
     * @returns {String} Title's institution
     */
    get institution() {
        return getSubstring(this._queryText.split('\n')[0], ' ', -1);

    }

    /**
     * Get period
     * @returns {String} Title's period
     */
    get period() {
        return this._queryText.split('\n')[2];
    }

    /**
     * Get level
     * @returns {String} Title's level
     */
    get level() {
        return this._queryText.split('\n')[1].split(' ')[0];
    }


}

// const titleExample = new Title({
//     dni: '79523926',
//     queryText: `Doctorado Universidad De Kassel
// Doctorado en Ingeniería
// Enerode1999 - de 2005
// Über die Adsorption und Reduktion von Stickstoffmonoxid an Aktivkohle`
// }).info;
//
// console.log(titleExample)

