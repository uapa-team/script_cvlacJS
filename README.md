# CvLac Script

Un lindo script hecho en Javascript para obtener información de profesores de la página
web https://scienti.minciencias.gov.co/cvlac

## Instalación

Primero clona el repositorio localmente:

```bash
git clone https://github.com/uapa-team/script_cvlacJS.git
cd script_cvlacJS/
```

Luego instala los paquetes necesarios:
> **_NOTE:_** Este proyecto se hizo con la versión [13 de node](https://nodejs.org/es/). Sin embargo, la versión a priori no debería ser problema, pues no se utilizaron paquetes de la última vanguardia.

```bash
npm install
```

Y finalmente corre el script:

```bash
node src/index.js
```

## Obteniendo información

* Lista los números de identificación de quienes deseas obtener la información en [este archivo](./src/assets/input.txt)
  como en el archivo [ejemplo](./src/assets/input.txt).
* Modifica en el archivo [principal](./src/index.js) las siguientes lineas de código para obtener lo deseado (lineas 37 - 41). En el siguiente
  caso se obtendra TODA la información de cada profesor:

    ```javascript
    const teachersInfo = await Promise.all(promises).then(teachers => {
        return teachers.map(teacher => teacher);
    }).catch(error => console.log(error));
    ```
    
    según la propiedad que se necesite el script cambia

    Propiedad                        | Modificación
    ------------------               | -------------
    Artículos                        | teacher.articles
    Capítulos de libro               | teacher.bookChapters
    Distinciones                     | teacher.awards
    Eventos                          | teacher.events
    Idioma                           | teacher.languages
    Libros                           | teacher.books
    Redes                            | teacher.networks
    Software                         | teacher.softwares
    Formación Académica              | teacher.titles
    Jurados en comite de evaluación  | teacher.judges
    Proyectos                        | teacher.projects
    Par evaluador                    | teacher.couplesEvaluators

    Ejemplo para obtener solo los artíclos de cada profesor:
  
    ```javascript
    const teachersInfo = await Promise.all(promises).then(teachers => {
        return teachers.map(teacher => teacher.articles);
    }).catch(error => console.log(error));
    ```

* En la carpeta [dist](./dist) quedarán alojados los resultados de la consulta.