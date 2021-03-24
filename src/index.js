//Libraries
const fs = require('fs');
const ObjectsToCsv = require('objects-to-csv');
const puppeteer = require('puppeteer');


const Teacher = require('./Teacher/Teacher');
const inputFilePath = '/home/jacobo/Proyects/UAPA/script_cvlacJS/src/assets/example.txt';

fs.readFile(inputFilePath, 'utf8', async (err, data) => {
    if (err) throw err;
    // Get dnis divided by \n
    const dnis = data.split('\n');

    const teachers = await puppeteer.launch().then(async browser => {

        //For each teacher and to work in parallel an new page is made.
        const promises = dnis.map(async dni => {
            return await browser.newPage().then(async pageInstance => {
                return await new Teacher(dni).info(pageInstance);
            })
        })

        const teachersInfo = await Promise.all(promises).then(teachers => {
            //Here is where u get what u want. Example for get articles:
            //return teachers.map(teacher => teacher.articles);
            return teachers.map(teacher => teacher);
        }).catch(error => console.log(error));

        await browser.close();

        return teachersInfo;
    });


    //Make Json file
    fs.writeFile('./dist/teachers.json', JSON.stringify(teachers), () => {
        if (err) throw err;
        console.log('Json file was created successfully :)');
    });


    //Make cvs File
    await new ObjectsToCsv(teachers).toDisk('./dist/teachers.csv').then(value => {
        console.log('Cvs file was created successfully :)');

    }).catch(error => console.log(error));


});






