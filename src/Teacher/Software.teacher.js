const {getSubstring} = require('../Utils');

module.exports =
class Software {
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
            creators: this.creators,
            country: this.country,
            // TODO: Refactor scope with a properly name Idk the exact traslation of "ambito"
            language: this.language,
            scope: this.scope,
        }
    }

    /**
     * Get creators
     * @returns {Array<string>} Software's creators
     */
    get creators() {
        return getSubstring(this._queryText, '', 'Nombre').split(',').filter((nameStr) => {
            //NOTE: I'd like to use .map but sometimes the split array returns a void string as normal array element
            return nameStr.trim();
        });
    }

    /**
     * Get country
     * @returns {String} Software's country
     */
    get country() {
        return getSubstring(this._queryText, 'En:', ',');
    }

    /**
     * Get language
     * @returns {String} Software's language
     */
    get language() {
        return getSubstring(this._queryText, 'plataforma:', ',');
    }

    /**
     * Get scope
     * @returns {String} Software's scope
     */
    get scope() {
        return getSubstring(this._queryText, 'ambiente:', ',');
    }


}

// const softwareExample = new Software({
//     dni: '79523926',
//     queryText: `SONIA LUCIA RINCON PRAT, ALEXANDER GOMEZ, RotaryK, Nombre comercial: , contrato/registro: , . En: Colombia,  ,2003,  .plataforma: DOS/C++,  .ambiente: ,Palabras:Horno rotatorio,Areas:Ingeniería y Tecnología -- Ingeniería Mecánica -- Ingeniería Mecánica,`
// }).info;
//
// console.log(softwareExample)

