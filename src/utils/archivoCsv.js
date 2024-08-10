// ArchivoCsv.js
import Papa from 'papaparse';

class ArchivoCsv {
    constructor(file) {
        this.file = file;
    }

    #preprocesarCSV(contenido) {
        // Remover comillas alrededor de los campos y dentro de los campos
        let contenidoPreprocesado = contenido.replace(/"(.*?)"/g, '$1');
        contenidoPreprocesado = contenidoPreprocesado.replace(/""/g, '"'); // Manejar comillas dobles dentro de campos

        // Remover caracteres especiales no deseados, como `¤`
        contenidoPreprocesado = contenidoPreprocesado.replace(/¤/g, 'ñ');

        // Retornar el contenido preprocesado
        return contenidoPreprocesado;
    }

    #leerCSV(contenido) {
        return new Promise((resolve, reject) => {
            Papa.parse(contenido, {
                header: true,
                skipEmptyLines: true,
                delimiter: ',',
                quoteChar: '"',
                escapeChar: '"',
                encoding: 'UTF-8',
                complete: (results) => {
                    resolve(results.data);
                },
                error: (error) => {
                    reject(error);
                },
            });
        });
    }

    async procesarArchivo() {
        try {
            const contenido = await this.file.text(); // Leer el archivo como texto
            const contenidoPreprocesado = this.#preprocesarCSV(contenido); // Preprocesar el contenido del CSV
            const data = await this.#leerCSV(contenidoPreprocesado); // Leer el CSV preprocesado

            if (data.length > 0) {
                // Obtener nombres de columnas de la primera fila
                const columnNames = Object.keys(data[0]);
                // Obtener datos como array bidimensional
                const rows = data.map(row => columnNames.map(name => row[name]));
                return { columnNames, rows };
            }
        } catch (error) {
            console.error('Error al procesar el archivo CSV:', error);
        }
    }
}

export default ArchivoCsv;
