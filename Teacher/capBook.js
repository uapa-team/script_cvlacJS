// const capBookExample = new CapBook({capBook: `Tipo: Otro capítulo de libro publicado JUAN CARLOS VELEZ DIAZ, "Calculo de la función de autocorrelación y el espectro energético de la envolvente compleja de una señal BPSK a la salida de un dispositivo no lineal con característica cuadrática" Proccedings Mpei . En: Rusia  ISBN: 5704609902  ed: Moscow Power Institute Tu Mpei , v. , p.80 - 82  N/A ,2003`});

const {getSubstring} = require('../Utils');

// module.exports =
class CapBook {
    constructor(options) {
        this.capBook = options.capBook;
    }

    /**
     * Get ALL capBook's info
     * @returns {Object} Object
     */
    get info() {
        return {
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
     * @returns {String} CapBook's title
     */
    get title() {
        return this.capBook.split('"')[1];
    }

     /**
     * Get year
     * @returns {String} CapBook's year
     */
    get year() {
        return this.capBook.split(',').slice(-1)[0];
    }

    /**
     * Get country
     * @returns {String} CapBook's country
     */
    get country() {
        return getSubstring(this.capBook, 'En:', 'ISBN');
    }

    /**
     * Get isbn
     * @returns {String} CapBook's isbn
     */
    get isbn() {
        return getSubstring(this.capBook, 'ISBN:', 'ed:');
    }

    /**
     * Get editorial
     * @returns {String} CapBook's editorial
     */
    get editorial() {
        return getSubstring(this.capBook, 'ed:', -1).split(',')[0];
    }

    /**
     * Get pages
     * @returns {String} CapBook's pages
     */
    get pages() {
        return getSubstring(this.capBook, 'p.', -1).split(',')[0];
    }


}


const capBookExample = new CapBook({
    capBook: `Tipo: Otro capítulo de libro publicado
JUAN CARLOS VELEZ DIAZ, Tipo: Otro capítulo de libro publicado
MARIA GABRIELA CALLE, Tipo: Otro capítulo de libro publicado
GEOVANNI BERDUGO, "Testbed for evaluating Wireless Sensor Networks with non-line of sight links" 2012 International Symposium On Wireless Communication Systems (Iswcs) Proceedings . En: Francia  ISBN: 978-1-4673-0762-8  ed: IEEE Publications , v. , p.136 - 140  1 ,2012`
}).editorial;

console.log(capBookExample)

