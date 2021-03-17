// const eventExample = new Event({capBook: `Tipo: Otro capítulo de libro publicado JUAN CARLOS VELEZ DIAZ, "Calculo de la función de autocorrelación y el espectro energético de la envolvente compleja de una señal BPSK a la salida de un dispositivo no lineal con característica cuadrática" Proccedings Mpei . En: Rusia  ISBN: 5704609902  ed: Moscow Power Institute Tu Mpei , v. , p.80 - 82  N/A ,2003`});

const {getSubstring} = require('../Utils');

// module.exports =
class Event {
    constructor(options) {
        this.dni = options.dni;
        this.capBook = options.capBook;
    }

    /**
     * Get ALL capBook's info
     * @returns {Object} Object
     */
    get info() {
        return {
            dni: this.dni,
            title: this.title,
            year: this.year,
            authors: this.authors,
            country: this.country,
            isbn: this.isbn,
            editorial: this.editorial,
            pages: this.pages,
        }
    }

    /**
     * Get authors
     * @returns {Array} Array of capBook's authors
     */
    get authors() {
        const authors = this.capBook.split(',').filter( element => element.includes('Tipo:'))
        return authors.map(element => getSubstring(element, 'Tipo: Otro capítulo de libro publicado', -1));
    }

    /**
     * Get title
     * @returns {String} Event's title
     */
    get title() {
        return this.capBook.split('"')[1];
    }

     /**
     * Get year
     * @returns {String} Event's year
     */
    get year() {
        return this.capBook.split(',').slice(-1)[0];
    }

    /**
     * Get country
     * @returns {String} Event's country
     */
    get country() {
        return getSubstring(this.capBook, 'En:', 'ISBN');
    }

    /**
     * Get isbn
     * @returns {String} Event's isbn
     */
    get isbn() {
        return getSubstring(this.capBook, 'ISBN:', 'ed:');
    }

    /**
     * Get editorial
     * @returns {String} Event's editorial
     */
    get editorial() {
        return getSubstring(this.capBook, 'ed:', ',');
    }

    /**
     * Get pages
     * @returns {String} Event's pages
     */
    get pages() {
        return getSubstring(this.capBook, 'p.', ',');
    }


}


const eventExample = new Event({
    dni: '79523926',
    capBook: `Tipo: Otro capítulo de libro publicado
JUAN CARLOS VELEZ DIAZ, Tipo: Otro capítulo de libro publicado
MARIA GABRIELA CALLE, Tipo: Otro capítulo de libro publicado
GEOVANNI BERDUGO, "Testbed for evaluating Wireless Sensor Networks with non-line of sight links" 2012 International Symposium On Wireless Communication Systems (Iswcs) Proceedings . En: Francia  ISBN: 978-1-4673-0762-8  ed: IEEE Publications , v. , p.136 - 140  1 ,2012`
}).info;

console.log(eventExample)

