const {getSubstring} = require('../Utils');

module.exports =
class CoupleEvaluator {
    constructor(options) {
        this._dni = options.dni;
        this._queryText = options.queryText;
    }

    /**
     * Get ALL CoupleEvaluatorTeacher's info
     * @returns {Object} Object
     */
    get info() {
        return {
            dni: this._dni,
            scope: this.scope,
            type: this.type,
            year: this.year,
        }
    }


    /**
     * Get scope
     * @returns {String} CoupleEvaluatorTeacher's scope
     */
    get scope() {
        return getSubstring(this._queryText, 'Ámbito:', 'Par evaluador de');
    }

    /**
     * Get type
     * @returns {String} CoupleEvaluatorTeacher's type
     */
    get type() {
        return getSubstring(this._queryText, 'Par evaluador de:', 'Institución:');
    }

     /**
     * Get year
     * @returns {String} CoupleEvaluatorTeacher's year
     */
    get year() {
        return this._queryText.split(',').slice(-2)[0].trim();
    }
}

//
// const proyectExample = new CoupleEvaluatorTeacher({
//     dni: '79523926',
//     queryText: `Ámbito: Internacional  Par evaluador de: Proyecto  Institución: Departamento Administrativo de Ciencia, Tecnología e Innovación - Colciencias,  2008,  Septiembre  `
// }).info;
//
// console.log(proyectExample)

