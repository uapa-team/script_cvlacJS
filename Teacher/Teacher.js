const puppeteer = require('puppeteer');
const Article = require('./Article');


// const teacherExample = new Teacher('79523926');

// module.exports =
class Teacher {
    constructor(options) {
        this.dni = options.dni;
    }

    /**
     * Get ALL teacher's info
     * @returns {Object} Cvelac teacher link
     */
    get info() {
        return (async () => {
            return {
                articles: await this.articles,
            };
        })();
    }

    /**
     * Get articles
     * @returns {Promise<Array<Object>>} Object
     */
    get articles() {
        const {dni, cvelacLink} = this;

        return (async () => {

            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(await cvelacLink);

            let articles = await page.$$eval("a[name='articulos'] + table tr:nth-child(odd) td blockquote", elements => {
                return elements.map((articleElement, i) => articleElement.innerText);
            });

            // articles = articles.map((article) => new Article({article: article}).info);

            await browser.close();
            return articles
        })();
    }


    /**
     * Get articles
     * @returns {Promise<Array<Object>>} Object
     */
    get cvelacLink() {
        const {dni} = this;
        return (async () => {
            const minCienciasUrl = 'https://sba.minciencias.gov.co/tomcat/Buscador_HojasDeVida/busqueda?q=' + dni;

            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(minCienciasUrl);

            const cvelacLink = await page.$eval('#link_res_0', element => element.getAttribute('href'));

            await browser.close();
            return cvelacLink


        })();
    }


}

const teacherExample = new Teacher({dni: '79523926'}).info;
// console.log(teacherExample.then(r => console.log(r.articles)));
