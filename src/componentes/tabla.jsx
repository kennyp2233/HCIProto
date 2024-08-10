import React, { useEffect, useState } from "react";

function Tabla({ matriz, columnas, reglas = [], handleOnClick = () => { } }) {
    // Sincroniza el estado de filtros con el tamaño de columnas
    const [filtros, setFiltros] = useState(Array(columnas.length).fill(''));

    useEffect(() => {
        setFiltros(Array(columnas.length).fill(''));
    }, [columnas]);

    // Filtra los datos basándote en las reglas y filtros
    const datosFiltrados = matriz.filter((fila) => {
        return fila.every((valor, index) => {
            // Verifica si hay una regla para la columna y aplica el filtro si es necesario
            const filtro = filtros[index] ? filtros[index].toLowerCase() : '';
            const valorLower = valor ? valor.toString().toLowerCase() : '';
            return !reglas[index] || valorLower.includes(filtro);
        });
    });

    const manejarCambioFiltro = (index, valor) => {
        const nuevosFiltros = [...filtros];
        nuevosFiltros[index] = valor;
        setFiltros(nuevosFiltros);
    };

    return (
        <div className="overflow-x-auto">
            <table className="table table-xs">
                <thead>
                    <tr>
                        {columnas.map((columna, index) => (
                            // Solo mostrar columnas si hay una regla definida
                            reglas[index] !== undefined && (
                                <th key={index}>
                                    <div className="mb-2">{columna}</div>
                                    {reglas[index] && (
                                        <input
                                            type="text"
                                            className="input input-bordered placeholder-normal input-sm w-full max-w-xs"
                                            placeholder={`Filtrar ${columna}`}
                                            value={filtros[index]}
                                            onChange={(e) => manejarCambioFiltro(index, e.target.value)}
                                        />
                                    )}
                                </th>
                            )
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {datosFiltrados.map((fila, index) => (
                        <tr key={index} className="hover" onClick={() => handleOnClick(fila[0])}>
                            {fila.map((valor, index) => (
                                // Solo mostrar celdas si hay una regla definida
                                reglas[index] !== undefined && (
                                    <td key={index}>{valor}</td>
                                )
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Tabla;
