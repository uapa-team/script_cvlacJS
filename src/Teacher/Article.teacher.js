const {getSubstring} = require('../Utils');

module.exports =
class Article {
    constructor(options) {
        this._dni = options.dni;
        this._queryText = options.queryText;
    }

    /**
     * Get ALL article's info
     * @returns {Object} Object
     */
    get info() {
        return {
            dni: this._dni,
            title: this.title,
            year: this.year,
            editorial: this.editorial,
            authors: this.authors,
            country: this.country,
            magazine: this.magazine,
            issn: this.issn,
            vol: this.vol,
            pages: this.pages,
        }
    }

    /**
     * Get authors
     * @returns {Array} Array of article's authors
     */
    get authors() {
        return this._queryText.split('"')[0].split(',').filter((nameStr) => {
            //NOTE: I'd like to use .map but sometimes the split array returns a void string as normal array element
            const name = nameStr.trim();
            return nameStr.trim();
        });
    }

    /**
     * Get title
     * @returns {String} Article's title
     */
    get title() {
        return this._queryText.split('"')[1].split(',')[0]
    }

    /**
     * Get country
     * @returns {String} Article's country
     */
    get country() {
        return getSubstring(this._queryText, 'En:', '\n');
    }

    /**
     * Get issn
     * @returns {String} Article's issn
     */
    get issn() {
        return getSubstring(this._queryText, 'ISSN:', 'ed:');
    }


    /**
     * Get magazine
     * @returns {String} Article's magazine
     */
    get magazine() {
        return getSubstring(this._queryText, this.country, 'ISSN:');
    }

    /**
     * Get editorial
     * @returns {String} Article's editorial
     */
    get editorial() {
        //TODO: fix this return cuz in some cases there is not 'v.' ... :(
        return getSubstring(this._queryText, 'ed:', 'v.');
    }

    /**
     * Get pages
     * @returns {String} Article's pages
     */
    get pages() {
        return getSubstring(this._queryText, 'p.', -1).split(",")[0];
    }

    /**
     * Get year
     * @returns {String} Article's year
     */
    get year() {
        return getSubstring(this._queryText, this.pages, 'DOI:').replace(/,/g, '');
    }

    /**
     * Get doi
     * @returns {String} Article's doi
     */
    get doi() {
        return getSubstring(this._queryText, 'DOI:', -1);
    }

    /**
     * Get vol
     * @returns {String} Article's vol
     */
    get vol() {
        return getSubstring(this._queryText, 'v.', 'p.');
    }

}

//
// const articleExample = new Article({
//     dni: '79523926',
//     article: `JUAN CARLOS VELEZ DIAZ, WENDY PAOLA NAVARRO ARIZA, MARIA GABRIELA CALLE TORRES, "A Novel Multivariable Algorithm for Detecting and Tracing Metal Mobile Objects Employing a Simple RFID Setup" . En: Reino Unido
// International Journal of Distributed Sensor Networks  ISSN: 1550-1329  ed: Sage Publications (International)
// v.2015 fasc. p.1 - 10 ,2015,  DOI: 10.1155/2015/409617`
// }).info;

// console.log(articleExample)

