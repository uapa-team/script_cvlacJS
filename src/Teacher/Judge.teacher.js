const {getSubstring} = require('../Utils');

module.exports =
class Judge {
    constructor(options) {
        this._dni = options.dni;
        this._queryText = options.queryText;
    }

    /**
     * Get ALL judge's info
     * @returns {Object} Object
     */
    get info() {
        return {
            dni: this._dni,
            title: this.title,
            type: this.type,
            institution: this.institution,
            // year: this.year,
        }
    }

    /**
     * Get title
     * @returns {String} Judge's title
     */
    get title() {
        return getSubstring(this._queryText, 'Titulo:', 'Tipo');
    }

    /**
     * Get type
     * @returns {String} Judge's type
     */
    get type() {
        return getSubstring(this._queryText, 'Tipo de trabajo presentado:', 'en:');
    }

    /**
     * Get institution
     * @returns {String} Judge's institution
     */
    get institution() {
        return getSubstring(this._queryText, 'en:', 'programa académico');
    }

    /**
     * Get year
     * @returns {String} Judge's year
     */
    get year() {
        return getSubstring(this._queryText, 'en ', 'con');
    }


}

// const judgeExample = new Judge({
//     dni: '79523926',
//     queryText: `SONIA LUCIA RINCON PRAT, Titulo: Kinetik study and phenomenological modeling of a biomass particle during fast pyrolysis process Tipo de trabajo presentado: Proyecto de grado/Tesis en:  UNIVERSIDAD NACIONAL DE COLOMBIA SEDE MEDELLÍN  programa académico Doctorado en Ingeniería - Sistemas Energéticos  Nombre del orientado: Jorge Iván Montoya Arbeláez  
// Palabras:
// Pirólisis, Estudio cinético,
// Areas:
// Ingeniería y Tecnología -- Ingeniería Química -- Ingeniería de Procesos,`
// }).info;
//
// console.log(judgeExample)

