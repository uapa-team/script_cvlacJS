// const eventExample = new Event({event: `Tipo: Otro capítulo de libro publicado JUAN CARLOS VELEZ DIAZ, "Calculo de la función de autocorrelación y el espectro energético de la envolvente compleja de una señal BPSK a la salida de un dispositivo no lineal con característica cuadrática" Proccedings Mpei . En: Rusia  ISBN: 5704609902  ed: Moscow Power Institute Tu Mpei , v. , p.80 - 82  N/A ,2003`});

const {getSubstring} = require('../Utils');

// module.exports =
class Event {
    constructor(options) {
        this.dni = options.dni;
        this.event = options.event;
    }

    /**
     * Get ALL event's info
     * @returns {Object} Object
     */
    get info() {
        return {
            dni: this.dni,
            // title: this.title,
            // year: this.year,
            // source: this.source,
            // authors: this.authors,
            // country: this.country,
            name: this.name,
            type: this.type,
            // //TODO: Refactor scope with a properly name xD Idk the exact traslation of "ambito"
            scope: this.scope,
            initialDate: this.initialDate,
            finalDate: this.finalDate,
            // city: this.city,
            // place: this.place,
        }
    }

    /**
     * Get name
     * @returns {String} Event's name
     */
    get name() {
        return getSubstring(this.event, 'Nombre del evento:', 'Tipo de evento');
    }

    /**
     * Get type
     * @returns {String} Event's type
     */
    get type() {
        return getSubstring(this.event, 'Tipo de evento:', 'Ámbito');
    }

    /**
     * Get scope
     * @returns {String} Event's scope
     */
    get scope() {
        return getSubstring(this.event, 'Ámbito:', 'Realizado el');
    }

    /**
     * Get initialDate
     * @returns {String} Event's initialDate
     */
    get initialDate() {
        return getSubstring(this.event, 'Realizado el:', ',');
    }

    /**
     * Get finalDate
     * @returns {String} Event's finalDate
     */
    // get finalDate() {
    //     return getSubstring(this.event, 'Realizado el:', ',');
    // }

}


const eventExample = new Event({
    dni: '79523926',
    event: `25 Nombre del evento: Encuentro Internacional de e-ciencia y educación apoyadas por redes de tecnologia avanzada  Tipo de evento: Encuentro  Ámbito: Internacional  Realizado el:2008-01-01 00:00:00.0,    en BOGOTÁ, D.C.   - Colciencias  `
}).info;

// console.log(eventExample)

