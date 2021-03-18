const puppeteer = require('puppeteer');
const Article = require('./Article.teacher');


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
        const {dni, cvelacLink, articles} = this;

        return (async () => {
            const browser = await puppeteer.launch({headless: true});
            const page = await browser.newPage();
            await page.goto(await cvelacLink(page, dni));

            const info = {
                articles: await articles(page, dni),
            };

            await browser.close();

            return info;
        })();
    }

    /**
     * Get articles
     * @param page {Page} The browser page
     * @param dni {String} Teacher's dni number
     * @returns {Promise<Array<String>>} Object
     */
    //TODO: Find a way to get properties by this.property instead of passing it. Only happens with async functions :(
    async articles(page, dni) {
        let articles = await page.$$eval("a[name='articulos'] + table tr:nth-child(odd) td blockquote", elements => {
            return elements.map((articleElement, i) => articleElement.innerText);
        });

        // console.log(articles)
        articles = articles.map((article) => new Article({dni: dni, article: article}).info);

        return articles
    }


    /**
     * Get Teahcer's cvlac link from minciencias website
     * @param page {Page} The browser page
     * @param dni {String} Teacher's dni number
     * @returns {Promise<string>} Object
     */
    //TODO: Find a way to get properties by this.property instead of passing it. Only happens with async functions :(
    async cvelacLink(page, dni) {
        const minCienciasUrl = 'https://sba.minciencias.gov.co/tomcat/Buscador_HojasDeVida/busqueda?q=' + dni;
        await page.goto(minCienciasUrl);
        return await page.$eval('#link_res_0', element => element.getAttribute('href'));
    }


}

const teacherExample = new Teacher({dni: '79523926'}).info;
// console.log(teacherExample.then(r => console.log(r.articles)));
