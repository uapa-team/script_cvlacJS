const Article = require('./Article.teacher');
const BookChapter = require('./BookChapter.teacher');
const Award = require("./Award.teacher");
const Event = require("./Event.teacher");
const Book = require("./Book.teacher");
const Network = require("./Network.teacher");
const Sofware = require("./Software.teacher");
const Title = require("./Title.teacher");
const Judge = require("./Judge.teacher");
const Project = require("./Project.teacher");
const CoupleEvaluator = require("./CoupleEvaluator.teacher");

//TODO: Refactor docs in each method

module.exports =
    class Teacher {
        constructor(properties) {
            this._dni = properties.dni;
        }

        /**
         * Get ALL teacher's info
         * @returns {Object} Cvelac teacher info
         */
        async info(page) {
            // page.on('console', consoleObj => console.log(consoleObj.text()));
            await page.goto(await this.cvelacLink(page), {waitUntil: 'networkidle2'});


            const info = await Promise.all([
                this.articles(page),
                this.bookChapters(page),
                this.awards(page),
                this.events(page),
                this.languages(page),
                this.books(page),
                this.networks(page),
                this.softwares(page),
                this.titles(page),
                this.judges(page),
                this.projects(page),
                this.couplesEvaluators(page),
            ]).then(values => {
                return {
                    articles: values[0],
                    bookChapters: values[1],
                    awards: values[2],
                    events: values[3],
                    languages: values[4],
                    books: values[5],
                    networks: values[6],
                    softwares: values[7],
                    titles: values[8],
                    judges: values[9],
                    projects: values[10],
                    couplesEvaluators: values[11],
                };
            });

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
            return bookChapters.map(bookChapterText => new BookChapter({
                dni: this._dni,
                queryText: bookChapterText
            }).info);
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
                        source: 'CvLac',
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
         * Get networks
         * @param page {Page} The browser page is working with
         * @returns {Promise<Array<Object>>} Object
         */
        async networks(page) {

            let networks = await page.$$eval("a[name='re_co'] + table tr:not(:first-child) td blockquote", networksElements => {
                return networksElements.map((networkElement, i) => networkElement.innerText);
            });

            return networks.map(networkText => new Network({dni: this._dni, queryText: networkText}).info);

        }

        /**
         * Get softwares
         * @param page {Page} The browser page is working with
         * @returns {Promise<Array<Object>>} Object
         */
        async softwares(page) {

            let softwares = await page.$$eval("a[name='software'] + table tr:nth-child(odd) td blockquote", softwaresElements => {
                return softwaresElements.map((sofwaresElement, i) => sofwaresElement.innerText);
            });

            return softwares.map(softwareText => new Sofware({dni: this._dni, queryText: softwareText}).info);

        }

        /**
         * Get titles
         * @param page {Page} The browser page is working with
         * @returns {Promise<Array<Object>>} Object
         */
        async titles(page) {

            let titles = await page.$$eval("a[name='formacion_acad'] + table tr:not(:first-child) td:nth-child(2)", titlesElements => {
                return titlesElements.map((titlesElement, i) => titlesElement.innerText);
            });

            return titles.map(titleText => new Title({dni: this._dni, queryText: titleText}).info);

        }

        /**
         * Get judges
         * @param page {Page} The browser page is working with
         * @returns {Promise<Array<Object>>} Object
         */
        async judges(page) {

            let judges = await page.$$eval("a[name='jurado'] + table tr:nth-child(odd) td blockquote", judgesElements => {
                return judgesElements.map((judgesElement, i) => judgesElement.innerText);
            });

            return judges.map(judgeText => new Judge({dni: this._dni, queryText: judgeText}).info);

        }

        /**
         * Get projects
         * @param page {Page} The browser page is working with
         * @returns {Promise<Array<Object>>} Object
         */
        async projects(page) {

            const projects = await page.evaluate(title => {

                const projects = title.closest('tbody').querySelectorAll('tr:not(:first-child)');
                return [...projects].map(project => project.innerText);

                //Had to use this xPath query cuz there is not attribute to difference the languages table
            }, (await page.$x("//h3[contains(., 'Proyectos')]"))[0]);

            return projects.map(projectText => new Project({dni: this._dni, queryText: projectText}).info);

        }

        /**
         * Get CouplesEvaluators
         * @param page {Page} The browser page is working with
         * @returns {Promise<Array<Object>>} Object
         */
        async couplesEvaluators(page) {

            let couplesEvaluators = await page.$$eval("a[name='par'] + table tr:not(:first-child) td blockquote", couplesEvaluatorsElements => {
                return couplesEvaluatorsElements.map((couplesEvaluatorsElement, i) => couplesEvaluatorsElement.innerText);
            });

            return couplesEvaluators.map(coupleEvaluatorText => new CoupleEvaluator({
                dni: this._dni,
                queryText: coupleEvaluatorText
            }).info);

        }

        /**
         * Get Teahcer's cvlac link from minciencias website
         * @param page {Page} The browser page is working with
         * @returns {Promise<string>} Object
         */
        async cvelacLink(page) {
            const minCienciasUrl = 'https://sba.minciencias.gov.co/tomcat/Buscador_HojasDeVida/busqueda?q=' + this._dni;
            await page.goto(minCienciasUrl);

            try {
              return await page.$eval('#link_res_0', element => element.getAttribute('href'));
            } catch (error) {
                console.error(error);
            }

        }

    }

// const teacherExample = new Teacher({dni: '52176853'});
//
// teacherExample.info().then(res => console.log(res));
