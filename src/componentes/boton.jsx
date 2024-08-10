import React, { useState } from "react";

function Boton({ onClick, texto, className, logo, onDragEnter }) {
    const [logoBoton, setLogo] = useState(logo);
    const [textoBoton, setTexto] = useState(texto);

    return (
        <button
            className={"btn btn-primary " + className}
            onClick={onClick}
            onDragEnter={onDragEnter}
        >
            {logo ?
                (
                    <>
                        {logoBoton}
                        {textoBoton}
                    </>
                ) :
                (textoBoton)
            }
        </button>
    )
}

export default Boton;