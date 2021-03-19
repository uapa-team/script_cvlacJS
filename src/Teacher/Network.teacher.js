const {getSubstring} = require('../Utils');

module.exports =
class Network {
    constructor(options) {
        this._dni = options.dni;
        this._queryText = options.queryText;
    }

    /**
     * Get ALL network's info
     * @returns {Object} Object
     */
    get info() {
        return {
            dni: this._dni,
            type: this.type,
            initialDate: this.initialDate,
            place: this.place,
        }
    }

    /**
     * Get type
     * @returns {String} Network's type
     */
    get type() {
        return getSubstring(this._queryText, 'Tipo de red', ',');
    }

    /**
     * Get initialDate
     * @returns {String} Network's initialDate
     */
    get initialDate() {
        return getSubstring(this._queryText, 'Creada el:', ',');
    }

    /**
     * Get place
     * @returns {String} Network's place
     */
    get place() {
        return getSubstring(this._queryText, 'en ', 'con');
    }


}

// const networkExample = new Network({
//     dni: '79523926',
//     queryText: `Nombre de la red Global Network on Environmental Science and Technology  Tipo de redReal,  Creada el:2011-07-15 00:00:00.0,    en Atenas   con participantes `
// }).info;
//
// console.log(networkExample)

