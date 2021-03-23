//Libraries
const fs = require('fs');
const puppeteer = require('puppeteer');


const Teacher = require('./Teacher/Teacher');
const inputFilePath = '/home/jacobo/Proyects/UAPA/script_cvlacJS/src/assets/input.txt';

fs.readFile(inputFilePath, 'utf8', async (err, data) => {
    if (err) throw err;
    // Get dnis divided by \n
    const dnis = data.split('\n');
    // const teachersInfo = await Promise.all(dnis.map(dni => {
    //
    //
    // })).then(teachers => {
    //
    //     return teachers.map(teacher => teacher);
    // });


    puppeteer.launch().then(async browser => {

        const promises = [];
        for (let i = 0; i < dnis.length; i++) {
            promises.push(browser.newPage().then(async page => {
                return await new Teacher(dnis[i]).info(page);
            }))
        }
        const teachersInfo = await Promise.all(promises).then(teachers => {
            return teachers.map(teacher => teacher);
        });
        browser.close();

            console.log(teachersInfo, dnis)

    });




    // const cvlacUrls = await Promise.all(dnis.map((dni) => getTeacherLink(dni)));
});




