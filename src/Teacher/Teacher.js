const puppeteer = require('puppeteer');
const Article = require('./Article.teacher');
const BookChapter = require('./BookChapter.teacher');
const Award = require("./Award.teacher");
const Event = require("./Event.teacher");
const Book = require("./Book.teacher");

//TODO: Refactor docs in each method

// module.exports =
class Teacher {
    constructor(properties) {
        this._dni = properties.dni;
    }

    /**
     * Get ALL teacher's info
     * @returns {Object} Cvelac teacher info
     */
    async info() {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        page.on('console', consoleObj => console.log(consoleObj.text()));
        await page.goto(await this.cvelacLink(page), {waitUntil: 'networkidle2'});


        const info = await Promise.all([
            this.articles(page),
            this.bookChapters(page),
            this.awards(page),
            this.events(page),
            this.languages(page),
            this.books(page),
        ]).then(values => {
            return {
                articles: values[0],
                bookChapters: values[1],
                awards: values[2],
                events: values[3],
                languages: values[4],
                books: values[5],
            };
        });

        await browser.close();

        return info;
    }

    /**
     * Get articles
     * @param page {Page} The browser page is working with
     * @returns {Promise<Array<String>>} Object
     */
    async articles(page) {
        const articles = await page.$$eval("a[name='articulos'] + table tr:nth-child(odd) td blockquote", articlesElements => {
            return articlesElements.map((articleElement, i) => articleElement.innerText);
        });

        return articles.map(articleText => new Article({dni: this._dni, queryText: articleText}).info);
    }

    /**
     * Get books chapters
     * @param page {Page} The browser page is working with
     * @returns {Promise<Array<Object>>} Object
     */
    async bookChapters(page) {
        let bookChapters = await page.$$eval("a[name='capitulos'] + table tr:not(:first-child) td blockquote", bookChaptersElements => {
            return bookChaptersElements.map((bookChapterElement, i) => bookChapterElement.innerText);
        });
        return bookChapters.map(bookChapterText => new BookChapter({dni: this._dni, queryText: bookChapterText}).info);
    }

    /**
     * Get awards
     * @param page {Page} The browser page is working with
     * @returns {Promise<Array<Object>>} Object
     */
    async awards(page) {

        const awards = await page.evaluate(title => {

            const awards = title.closest('tbody').querySelectorAll('tr:not(:first-child)');
            return [...awards].map(award => award.innerText);

            //Had to use this xPath query cuz there is not attribute to difference the languages table
        }, (await page.$x("//h3[contains(., 'Reconocimientos')]"))[0]);

        return awards.map(awardText => new Award({dni: this._dni, queryText: awardText}).info);

    }

    /**
     * Get events
     * @param page {Page} The browser page is working with
     * @returns {Promise<Array<Object>>} Object
     */
    async events(page) {

        let events = await page.$$eval("a[name='evento'] + table tr:not(:first-child) > td > table > tbody tr:first-child td", eventsElements => {
            return eventsElements.map((bookChapterElement, i) => bookChapterElement.innerText);
        });
        return events.map(eventText => new Event({dni: this._dni, queryText: eventText}).info);

    }

    /**
     * Get languages
     * @param page {Page} The browser page is working with
     * @returns {Promise<Array<Object>>} Object
     */
    async languages(page) {

        return await page.evaluate(title => {
            const rows = title.closest('tbody').querySelectorAll('tr:nth-child(n+3)');

            let languages = [];
            rows.forEach(row => {
                row = [...row.cells].map(title => title.innerText.trim());
                languages.push({
                    dni: this._dni,
                    language: row[0],
                    speaks: row[1],
                    writes: row[2],
                    reads: row[3],
                    understands: row[4],
                });
            });

            return languages;
            //Had to use this xPath query cuz there is not attribute to difference the languages table
        }, (await page.$x("//h3[contains(., 'Idioma')]"))[0]);

    }

    /**
     * Get books
     * @param page {Page} The browser page is working with
     * @returns {Promise<Array<Object>>} Object
     */
    async books(page) {

        let books = await page.$$eval("a[name='libros'] + table tr:nth-child(odd) td blockquote", booksElements => {
            return booksElements.map((bookElement, i) => bookElement.innerText);
        });
        return books.map(bookText => new Book({dni: this._dni, queryText: bookText}).info);

    }


    /**
     * Get Teahcer's cvlac link from minciencias website
     * @param page {Page} The browser page is working with
     * @returns {Promise<string>} Object
     */
    async cvelacLink(page) {
        const minCienciasUrl = 'https://sba.minciencias.gov.co/tomcat/Buscador_HojasDeVida/busqueda?q=' + this._dni;
        await page.goto(minCienciasUrl);
        return await page.$eval('#link_res_0', element => element.getAttribute('href'));
    }


}

const teacherExample = new Teacher({dni: '91489688'});

teacherExample.info().then(res => console.log(res))