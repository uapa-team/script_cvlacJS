//Libraries
const fs = require('fs');
const path = require('path')
const filePath = path.join(__dirname, '/assets/input.txt');
const ObjectsToCsv = require('objects-to-csv');
const puppeteer = require('puppeteer');
const Teacher = require('./Teacher/Teacher');

fs.readFile(filePath, 'utf8', async (err, data) => {
    if (err) throw err;
    // Get dnis divided by \n
    const dnis = data.split('\n');


    const teachers = await puppeteer.launch({headless: true}).then(async browser => {

        //For each teacher and to work in parallel a new page is made.
        let linkPromises = [];
        let page = await browser.newPage();

        for (let i = 0; i < dnis.length; i++) {
            //Get cvLac Link
            const minCienciasUrl = 'https://sba.minciencias.gov.co/tomcat/Buscador_HojasDeVida/busqueda?q=' + dnis[i];
            await page.goto(minCienciasUrl);
            linkPromises.push(await page.$eval('#link_res_0', element => element.getAttribute('href')));
        }

        const teachersLinks = await Promise.all(linkPromises);

        //For each teacher and to work in parallel a new page is made.
        let teacherPromises = []
        for (let i = 0; i < dnis.length; i++) {
            let pageInstance = await browser.newPage();
            teacherPromises.push(new Teacher({dni: dnis[i], cvlacLink: teachersLinks[i]}).info(pageInstance))
        }

        const teachersInfo = await Promise.all(teacherPromises).then(teachers => {
            //Here is where u get what u want. Example to get articles:
            //return teachers.map(teacher => teacher.articles);
            return teachers.map(teacher => teacher.titles);
        }).catch(error => console.log(error));

        await browser.close();

        return teachersInfo;
    });


    //Make Json file
    fs.writeFile('./dist/teachers.json', JSON.stringify(teachers), () => {
        if (err) throw err;
        console.log('Json file was created successfully :)');
    });


    // Make cvs File
    fs.unlink('./dist/teachers.csv', (err) => {
        if (err) {
            // console.error(err)
        }
    });

    for (let i = 0; i < teachers.length; i++) {
        await new ObjectsToCsv(teachers[i]).toDisk('./dist/teachers.csv', {append: true});
    }

    console.log('Cvs file was created successfully :)');

});





