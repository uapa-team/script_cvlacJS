const {getSubstring} = require('../Utils');

module.exports =
class Event {
    constructor(options) {
        this._dni = options.dni;
        this._queryText = options.queryText;
    }

    /**
     * Get ALL event's info
     * @returns {Object} Object
     */
    get info() {
        return {
            dni: this._dni,
            // title: this.title,
            // year: this.year,
            // source: this. source,
            // authors: this.authors,
            // country: this.country,
            name: this.name,
            type: this.type,
            // //TODO: Refactor scope with a properly name Idk the exact traslation of "ambito"
            scope: this.scope,
            initialDate: this.initialDate,
            // finalDate: this.finalDate,
            // city: this.city,
            // place: this.place,
        }
    }

    /**
     * Get name
     * @returns {String} Event's name
     */
    get name() {
        return getSubstring(this._queryText, 'Nombre del evento:', 'Tipo de evento');
    }

    /**
     * Get type
     * @returns {String} Event's type
     */
    get type() {
        return getSubstring(this._queryText, 'Tipo de evento:', 'Ámbito');
    }

    /**
     * Get scope
     * @returns {String} Event's scope
     */
    get scope() {
        return getSubstring(this._queryText, 'Ámbito:', 'Realizado el');
    }

    /**
     * Get initialDate
     * @returns {String} Event's initialDate
     */
    get initialDate() {
        return getSubstring(this._queryText, 'Realizado el:', ',');
    }

    /**
     * Get finalDate
     * @returns {String} Event's finalDate
     */
    // get finalDate() {
    //     return getSubstring(this.event, 'Realizado el:', ',');
    // }

}


// const eventExample = new Event({
//     dni: '79523926',
//     event: `25 Nombre del evento: Encuentro Internacional de e-ciencia y educación apoyadas por redes de tecnologia avanzada  Tipo de evento: Encuentro  Ámbito: Internacional  Realizado el:2008-01-01 00:00:00.0,    en BOGOTÁ, D.C.   - Colciencias  `
// }).info;

// console.log(eventExample)

