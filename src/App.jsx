import React, { useState } from 'react';
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
  const [columnas, setColumnas] = useState([
    'id',
    'name',
    'job',
    'company',
    'location',
    'lastLogin',
    'favoriteColor',
  ]);
  const [datosTabla, setDatosTabla] = useState([
    ["1", "Lorelei Blackstone", "Data Coordiator", "Witting, Kutch and Greenfelder", "Kazakhstan", "6/3/2020", "Red"],
    ["2", "Lorelei Blackstone", "Data Coordiator", "Witting, Kutch and Greenfelder", "Kazakhstan", "6/3/2020", "Red"],
    ["3", "Lorelei Blackstone", "Data Coordiator", "Witting, Kutch and Greenfelder", "Kazakhstan", "6/3/2020", "Red"],
    ["4", "Lorelei Blackstone", "Data Coordiator", "Witting, Kutch and Greenfelder", "Kazakhstan", "6/3/2020", "Red"],
    ["5", "Lorelei Blackstone", "Data Coordiator", "Witting, Kutch and Greenfelder", "Kazakhstan", "6/3/2020", "Red"],
    ["6", "Lorelei Blackstone", "Data Coordiator", "Witting, Kutch and Greenfelder", "Kazakhstan", "6/3/2020", "Red"],
    ["7", "Lorelei Blackstone", "Data Coordiator", "Witting, Kutch and Greenfelder", "Kazakhstan", "6/3/2020", "Red"],
    ["8", "Lorelei Blackstone", "Data Coordiator", "Witting, Kutch and Greenfelder", "Kazakhstan", "6/3/2020", "Red"],
    ["9", "Lorelei Blackstone", "Data Coordiator", "Witting, Kutch and Greenfelder", "Kazakhstan", "6/3/2020", "Red"],
    ["10", "Lorelei Blackstone", "Data Coordiator", "Witting, Kutch and Greenfelder", "Kazakhstan", "6/3/2020", "Red"]
  ]);

  const [tabla1, setTabla1] = useState(
    <Tabla
      matriz={datosTabla}
      columnas={columnas}
    />
  );

  const manejarArchivoSeleccionado = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const archivoCsv = new ArchivoCsv(file);
      const { columnNames, rows } = await archivoCsv.procesarArchivo();
      setColumnas(columnNames);
      setDatosTabla(rows);
      setTabla1(<Tabla matriz={rows} columnas={columnNames} reglas={[1, 1, 1]} />);
      document.getElementById("modal1").close();
    }
  };

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
          <input
            type="file"
            className="file-input file-input-sm w-full"
            accept=".csv"
            onChange={manejarArchivoSeleccionado}
          />
        </div>
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
        </div>
      </Hero>
    </div>
  );
}

export default App;
