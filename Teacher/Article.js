// const articleExample = new Article({article: `FABIAN OMAR BETANCOURT QUIROGA, "Desarrollo de la Gestión Empresarial dentro de la Ingeniería de Petróleos" . En: Colombia 
// Revista de La Asociación Colombiana de Ingenieros de Petróleos  ISSN: 0  ed: 
// v. fasc. p. - ,1995,  DOI: `});

const {getSubstring} = require('../Utils');

// module.exports =
class Article {
    constructor(options) {
        this.article = options.article;
    }

    /**
     * Get ALL article's info
     * @returns {Object} Object
     */
    get info() {
        return {
            authors: this.authors,
            title: this.title,
            country: this.country,
            issn: this.issn,
            magazine: this.magazine,
            editorial: this.editorial,
            pages: this.pages,
        }
    }

    /**
     * Get authors
     * @returns {Array} Array of article's authors
     */
    get authors() {
        return this.article.split('"')[0].split(',').filter((nameStr) => {
            const name = nameStr.trim();
            return name !== '';
        });
    }

    /**
     * Get title
     * @returns {String} Article's title
     */
    get title() {
        return this.article.split('"')[1].split(',')[0]
    }

    /**
     * Get country
     * @returns {String} Article's country
     */
    get country() {
        return getSubstring(this.article, 'En:', '\n');
    }

    /**
     * Get issn
     * @returns {String} Article's issn
     */
    get issn() {
        return getSubstring(this.article, 'ISSN:', 'ed:');
    }


    /**
     * Get magazine
     * @returns {String} Article's magazine
     */
    get magazine() {
        return getSubstring(this.article, this.country, 'ISSN:');
    }

    /**
     * Get editorial
     * @returns {String} Article's editorial
     */
    get editorial() {
        return getSubstring(this.article, 'ed:', 'p.');
    }

    /**
     * Get pages
     * @returns {String} Article's pages
     */
    get pages() {
        return getSubstring(this.article, 'p.', '-');
    }

    /**
     * Get year
     * @returns {String} Article's year
     */
    get year() {
        return getSubstring(this.article, 'ed:', 'p.');
    }

}


const articleExample = new Article({
    article: `FABIAN OMAR BETANCOURT QUIROGA, "Desarrollo de la Gestión Empresarial dentro de la Ingeniería de Petróleos" . En: Colombia 
Revista de La Asociación Colombiana de Ingenieros de Petróleos  ISSN: 0  ed: 
v. fasc. p. - ,1995,  DOI: `
}).info;

console.log(articleExample)

