import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Tabla from './componentes/tabla';
import Tarjeta from './componentes/tarjeta';
import Hero from './componentes/hero';
import Boton from './componentes/boton';
import Modal from './componentes/modal';
import ThemeController from './componentes/theme_controller';
import ArchivoCsv from './utils/archivoCsv';

function App() {

  const [columnas1, setColumnas1] = useState([]);
  const [datosTabla1, setDatosTabla1] = useState([[]]);
  const [tabla1, setTabla1] = useState();
  const [error1, setError1] = useState('');

  const [columnas2, setColumnas2] = useState([]);
  const [datosTabla2, setDatosTabla2] = useState([]);
  const [tabla2, setTabla2] = useState();
  const [error2, setError2] = useState('');

  const [columnas3, setColumnas3] = useState([]);
  const [datosTabla3, setDatosTabla3] = useState([]);
  const [tabla3, setTabla3] = useState();
  const [error3, setError3] = useState('');

  const [columnas4, setColumnas4] = useState([]);
  const [datosTabla4, setDatosTabla4] = useState([]);
  const [tabla4, setTabla4] = useState();
  const [error4, setError4] = useState('');

  const [idFilaSeleccionada, setIdFilaSeleccionada] = useState('');
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [tablaClickeada, setTablaClickeada] = useState(0);

  const manejarArchivoSeleccionado = async (event, tipo) => {
    const file = event.target.files[0];
    if (file) {
      const nombreArchivo = file.name.toLowerCase();
      let archivoValido = false;

      switch (tipo) {
        case 1:
          archivoValido = nombreArchivo === 'equipos.csv';
          break;
        case 2:
          archivoValido = nombreArchivo === 'miembros.csv';
          break;
        case 3:
          archivoValido = nombreArchivo === 'productos.csv';
          break;
        case 4:
          archivoValido = nombreArchivo === 'clientes.csv';
          break;
        default:
          archivoValido = false;
      }

      if (archivoValido) {
        setError1('');
        const archivoCsv = new ArchivoCsv(file);
        const { columnNames, rows } = await archivoCsv.procesarArchivo();

        switch (tipo) {
          case 1:
            setColumnas1(columnNames);
            setDatosTabla1(rows);
            setTabla1(<Tabla matriz={rows} columnas={columnNames} reglas={[1, 1, 1]} handleOnClick={manejarClickFila} />);
            break;
          case 2:
            setColumnas2(columnNames);
            setDatosTabla2(rows);
            setTabla2(<Tabla matriz={rows} columnas={columnNames} reglas={[1, 1, 1, 1]} />);
            break;
          case 3:
            setColumnas3(columnNames);
            setDatosTabla3(rows);
            setTabla3(<Tabla matriz={rows} columnas={columnNames} reglas={[1, 1, 1, 1]} />);
            break;
          case 4:
            setColumnas4(columnNames);
            setDatosTabla4(rows);
            setTabla4(<Tabla matriz={rows} columnas={columnNames} reglas={[1, 1, 1, 1, 1]} handleOnClick={manejarClickCliente} />);
            break;
          default:
            break;
        }
      } else {
        // Mostrar mensaje de error si el archivo no es válido
        switch (tipo) {
          case 1:
            setError1('Solo se permite el archivo equipos.csv');
            break;
          case 2:
            setError2('Solo se permite el archivo miembros.csv');
            break;
          case 3:
            setError3('Solo se permite el archivo productos.csv');
            break;
          case 4:
            setError4('Solo se permite el archivo clientes.csv');
            break;
          default:
            break;
        }
      }
    }
  };

  const manejarClickFila = (id) => {
    setIdFilaSeleccionada(id);
    setTablaClickeada(1);
    document.getElementById("modal2").showModal();
  };

  const manejarClickCliente = (id) => {
    setIdFilaSeleccionada(id);
    setTablaClickeada(2);
    document.getElementById("modal3").showModal();
  };

  useEffect(() => {
    switch (tablaClickeada) {
      case 1:
        setDatosFiltrados(datosTabla2.filter(fila => fila[3] === idFilaSeleccionada));
        break;
      case 2:
        setDatosFiltrados(datosTabla3.filter(fila => fila[5] === idFilaSeleccionada));
        break;
      default:
        break;
    }
  }, [idFilaSeleccionada]);


  return (
    <div className="App relative">
      <div
        className="absolute inset-0 bg-transparent pointer-events-auto"
        onDragEnter={() => {
          document.getElementById("modal1").showModal()
        }}
      />

      <Modal id="modal1">
        <div>
          <h3 className="font-bold text-lg mb-4">Sube un archivo CSV</h3>
          <h4 className="text-sm mb-4">Informacion sobre Equipos</h4>
          <input
            type="file"
            className="file-input file-input-sm w-full file-input-bordered"
            accept=".csv"
            onChange={(e) => manejarArchivoSeleccionado(e, 1)}
          />
          {error1 && <p className="text-red-500">{error1}</p>}
          <div className='border my-4' />

          <h4 className="text-sm mb-4">Informacion sobre Miembros</h4>
          <input
            type="file"
            className="file-input file-input-sm w-full file-input-bordered"
            accept=".csv"
            onChange={(e) => manejarArchivoSeleccionado(e, 2)}
          />
          {error2 && <p className="text-red-500">{error2}</p>}
          <div className='border my-4' />

          <h4 className="text-sm mb-4">Informacion sobre Productos</h4>
          <input
            type="file"
            className="file-input file-input-sm w-full file-input-bordered"
            accept=".csv"
            onChange={(e) => manejarArchivoSeleccionado(e, 3)}
          />
          {error3 && <p className="text-red-500">{error3}</p>}
          <div className='border my-4' />

          <h4 className="text-sm mb-4">Informacion sobre Clientes</h4>
          <input
            type="file"
            className="file-input file-input-sm w-full file-input-bordered"
            accept=".csv"
            onChange={(e) => manejarArchivoSeleccionado(e, 4)}
          />
          {error4 && <p className="text-red-500">{error4}</p>}
        </div>
      </Modal>

      <Modal id="modal2">
        <h3 className="font-bold text-lg mb-4">Detalles de la Fila Seleccionada</h3>
        <div role="tablist" className="tabs tabs-lifted grid-cols-2">
          <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Miembros asociados" defaultChecked
            onClick={() => setDatosFiltrados(datosTabla2.filter(fila => fila[3] === idFilaSeleccionada))}
          />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">

            <Tabla matriz={datosFiltrados} columnas={columnas2} reglas={[1, 1, 1]} />

          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Productos asociados"
            onClick={() => {
              setDatosFiltrados(datosTabla3.filter(fila => fila[4] === idFilaSeleccionada));
            }
            }
          />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6"><Tabla matriz={datosFiltrados} columnas={columnas3} reglas={[1, 1, 1, 1]} /></div>
        </div>

      </Modal>

      <Modal id="modal3">
        <h3 className="font-bold text-lg mb-4">Detalles de la Fila Seleccionada</h3>
        <Tabla matriz={datosFiltrados} columnas={columnas4} reglas={[1, 1, 1, 1, 1]} />
      </Modal>

      <Hero>
        <div className="grid grid-flow-row gap-4 w-full">
          <div className="navbar bg-base-100 ">
            <div className="flex-1">
              <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex gap-4">
              <ThemeController />
              <Boton
                texto="Carga tus datos"
                className="btn-secondary btn-sm"
                logo={<svg className='text-lg' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path fill="none" strokeDasharray={14} strokeDashoffset={14} d="M6 19h12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="14;0"></animate></path><path fill="currentColor" d="M12 15 h2 v-6 h2.5 L12 4.5M12 15 h-2 v-6 h-2.5 L12 4.5"><animate attributeName="d" calcMode="linear" dur="1.5s" keyTimes="0;0.7;1" repeatCount="indefinite" values="M12 15 h2 v-6 h2.5 L12 4.5M12 15 h-2 v-6 h-2.5 L12 4.5;M12 15 h2 v-3 h2.5 L12 7.5M12 15 h-2 v-3 h-2.5 L12 7.5;M12 15 h2 v-6 h2.5 L12 4.5M12 15 h-2 v-6 h-2.5 L12 4.5"></animate></path></g></svg>}
                onClick={() => {
                  document.getElementById("modal1").showModal()
                }}
                onDragEnter={() => {
                  document.getElementById("modal1").showModal()
                }}

              />

            </div>
          </div>

          <Tarjeta
            className="w-full"
            titulo="Equipos"
            cuerpo={tabla1}
          />

          <Tarjeta
            className="w-full"
            titulo="Productos"
            cuerpo={tabla3}
          />

          <Tarjeta
            className="w-full"
            titulo="Clientes"
            cuerpo={tabla4}
          />



        </div>
      </Hero>
    </div>
  );
}

export default App;
