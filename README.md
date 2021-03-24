# CvLac Script

Un lindo script hecho en Javascript para obtener información de profesores de la página web https://scienti.minciencias.gov.co/cvlac/Login/pre_s_login.do


## Instalación

Primero clona el repositorio localmente:

```bash
git clone https://github.com/uapa-team/script_cvlacJS.git
cd script_cvlacJS/
```

Luego instala los paquetes necesarios:
> **_NOTE:_** Este proyecto se hizo con la versión [13 de node](https://nodejs.org/es/). La versión a priori no debe ser problema, pues no se utilizaron paquetes de la última vanguardia.

```bash
npm install
```

Y finalmente corre el script:

```bash
node src/index.js
```

## Obteniendo información

* Lista los números de identificación de quienes deseas obtener la información en [este archivo](./src/assets/input.txt) como en el archivo [ejemplo](./src/assets/input.txt)
* Modifica en el archivo [principal](./src/index.js) las siguientes lineas de código para otener lo que deseas, en este caso se obtendra TODA la información de cada profesor:

```javascript
const teachersInfo = await Promise.all(promises).then(teachers => {
    return teachers.map(teacher => teacher);
}).catch(error => console.log(error));
```

Aunque se puede obtener solamente una propiedad, un ejemplo para obtener los articulos de cada profesor, sería: 

```javascript
const teachersInfo = await Promise.all(promises).then(teachers => {
    return teachers.map(teacher => teacher.articles);
}).catch(error => console.log(error));
```

* En la carpeta dist/ quedaran alojados los resultados de tu consulta.