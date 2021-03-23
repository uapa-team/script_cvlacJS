const {getSubstring} = require('../Utils');

module.exports =
    class Project {
        constructor(options) {
            this._dni = options.dni;
            this._queryText = options.queryText;
        }

        /**
         * Get ALL project's info
         * @returns {Object} Object
         */
        get info() {
            return {
                dni: this._dni,
                type: this.type,
                name: this.name,
                initialDate: this.initialDate,
                finalDate: this.finalDate,
            }
        }


        /**
         * Get type
         * @returns {String} Project's type
         */
        get type() {
            return getSubstring(this._queryText, 'Tipo de proyecto:', '\n');
        }

        /**
         * Get name
         * @returns {String} Project's name
         */
        get name() {
            return this._queryText.split('\n')[1];
        }

        /**
         * Get initialDate
         * @returns {String} Project's initialDate
         */
        get initialDate() {

            let end = '';
            if (this._queryText.includes('Fin proyectado:')) {
                end = 'Fin proyectado:';
            } else if (this._queryText.includes('Fin:')) {
                end = 'Fin:';
            }else{
                end = '\n' ;
            }

            return getSubstring(this._queryText, 'Inicio:', end);
        }

        /**
         * Get finalDate
         * @returns {String} Project's finalDate
         */
        get finalDate() {

            return this._queryText.includes('Fin:') ? getSubstring(this._queryText, 'Fin:', 'Duración') : '';
        }
    }

// //
// const proyectExample = new Project({
//     dni: '79523926',
//     queryText: `Tipo de proyecto: Investigación y desarrollo 
// Evaluation of the Influence of Coal Solvent Preswelling in Conversion Processes - Patrocinado por la Fundación Volkswagen
// Inicio: Enero  1996 Duración 
// Resumen
//
// Projecto de Investigación entre el Laboratorio de Combustibles de la Universidad Nacional de Colombia (Sede Bogotá) y el Instituto de Ingeniería Térmica de la Universidad de Kassel (Alemania)`
// }).info;
//
// console.log(proyectExample)

