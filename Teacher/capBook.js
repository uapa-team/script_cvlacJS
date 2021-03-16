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
            // authors: this.authors,
        }
    }

    /**
     * Get authors
     * @returns {Array} Array of capBook's authors
     */
    get authors() {
        return this.capBook.split('"')[0].split(',').filter((nameStr) => {
            const name = nameStr.trim();
            return name !== '';
        });
    }

    /**
     * Get title
     * @returns {String} Article's title
     */
    get title() {
        return this.capBook.split('"')[1];
    }


}


const capBookExample = new CapBook({
    capBook: `Tipo: Otro capítulo de libro publicado
JUAN CARLOS VELEZ DIAZ, "Calculo de la función de autocorrelación y el espectro energético de la envolvente compleja de una señal BPSK a la salida de un dispositivo no lineal con característica cuadrática" Proccedings Mpei . En: Rusia  ISBN: 5704609902  ed: Moscow Power Institute Tu Mpei , v. , p.80 - 82  N/A ,2003`
}).title;

console.log(capBookExample)

