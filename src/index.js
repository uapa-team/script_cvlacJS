//Libraries
const fs = require('fs');


const Teacher = require('./Teacher/Teacher');
const inputFilePath = './assets/input.txt';

fs.readFile(inputFilePath, 'utf8', async (err, data) =>  {
  if (err) throw err;
  // Get dnis divided by \n
  const dnis = data.split('\n');
  // const teachersInfo = await Promise.all(dnis.map(dni => new Teacher(dni)));
  // await Promise.all(dnis.map(dni => new Teacher(dni).articles))
  // const cvlacUrls = await Promise.all(dnis.map((dni) => getTeacherLink(dni)));
});




