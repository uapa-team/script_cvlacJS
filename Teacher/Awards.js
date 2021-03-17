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
        return this.award.split(',')[0];
    }

    /**
     * Get institution
     * @returns {String} Award's institution
     */
    get institution() {

        const mainQuery = getSubstring(this.award, ',', '-');
        //NOTE: This conditional is to handle when there is a result with award type
        return mainQuery.includes(',') ? mainQuery.split(',')[1] : mainQuery;
    }

    /**
     * Get period
     * @returns {String} Award's period
     */
    get period() {
        return getSubstring(this.award, '- de', -1);
    }


}


const awardExample = new Award({
    dni: '79523926',
    award: `Beca ICETEX para estudios en la Union Sovietica,Icetex - Instituto Colombiano De Crédito Educativo - de 1989`
}).info;

console.log(awardExample)

