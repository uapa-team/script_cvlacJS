const {getSubstring, getLastSubstring} = require('../Utils');

module.exports =
class Award {
    constructor(options) {
        this._queryText = options.queryText;
        this._dni = options.dni;
    }

    /**
     * Get ALL award's info
     * @returns {Object} Object
     */
    get info() {
        return {
            dni: this._dni,
            name: this.name,
            institution: this.institution,
            period: this.period,
            source: 'CvLac'
        }
    }

    /**
     * Get name
     * @returns {String} Award's name
     */
    get name() {
        return this._queryText.split(',')[0];
    }

    /**
     * Get institution
     * @returns {String} Award's institution
     */
    get institution() {

        const mainString = getSubstring(this._queryText, ',', '-');
        //NOTE: This conditional is to handle when there is a result with award type
        return mainString.includes(',') ? mainString.split(',')[1] : mainString;
    }

    /**
     * Get period
     * @returns {String} Award's period
     */
    get period() {
        return getLastSubstring(this._queryText, '-', -1);
    }


}
//
//
// const awardExample = new Award({
//     dni: '79523926',
//     award: `Mención Honorifica,UNIVERSIDAD AUTONOMA DE MÉXICO DISTRITO FEDERAL - de 2005`
// }).info;

// console.log(awardExample)

