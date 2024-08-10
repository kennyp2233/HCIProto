// ArchivoCsv.js
import Papa from 'papaparse';

class ArchivoCsv {
    constructor(file) {
        this.file = file;
    }

    #leerCSV() {
        return new Promise((resolve, reject) => {
            Papa.parse(this.file, {
                header: true, // Asumiendo que la primera fila tiene nombres de columnas
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
            const data = await this.#leerCSV();
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
