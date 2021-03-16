// const awardExample = new Award({
//     dni: 79523926,
//     award: `Diploma de Honor 1-er puesto en la conferencia de Ingeniería Radioelectrónica, Electrónica y Eléctrica,Moscow Power Institute - de 2002`
// });

const {getSubstring} = require('../Utils');

// module.exports =
class Award {
    constructor(options) {
        this.award = options.award;
        this.dni = options.dni;
    }

    /**
     * Get ALL award's info
     * @returns {Object} Object
     */
    get info() {
        return {
            dni: this.dni,
            name: this.name,
            authors: this.authors,
        }
    }

    /**
     * Get name
     * @returns {String} Award's name
     */
    get name() {
        return this.award.split(',')[0];
    }

    /**
     * Get institution
     * @returns {String} Award's institution
     */
    get institution() {
        return this.award.split(',')[1];
    }



}


const awardExample = new Award({
    dni: 79523926,
    award: `Diploma de Honor 1-er puesto en la conferencia de Ingeniería Radioelectrónica, Electrónica y Eléctrica,Moscow Power Institute - de 2002`
}).institution;

console.log(awardExample)

