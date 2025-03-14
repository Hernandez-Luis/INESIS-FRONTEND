import React, { useState } from 'react'
import NavInesis from '../../components/NavInesis/NavInesis'
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido'
import "../../styles/TarjetaEstilo/TarjetaEstilo.css"
import FooterInesis from '../../components/FooterInesis/FooterInesis'
import RadioSelect from '../../components/RadioSelect/RadioSelect'
import SeleccionarCombo from '../../components/ComboSeleccionar/SeleccionarCombo'
import { CheckBox } from '../../components/CheckBox/CheckBox'
import '../../styles/MisDatos/MisDatos.css'

export const MisDatos = () => {

  const links = [
    { url: '/PrincipalAdmin', label: 'Inicio' },
    { url: '/PrincipalAdmin', label: 'Solicitud' },
    { url: '/PrincipalAdmin', label: 'Inicio' }
  ];

  const [estadoCivil, setEstadoCivil] = useState(null);
  const [recursos, setRecursos] = useState(null);
  const [vivienda, setVivienda] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  // Función para manejar la selección
  const handleSelectionEstadoCivil = (option) => {
    setEstadoCivil(option); // Actualizar el estado en el componente padre
    console.log('Estado civil:', option); // Mostrar en consola
  };

  const handleSelectionRecursos = (option) => {
    setRecursos(option); // Actualizar el estado en el componente padre
    console.log('Recursos:', option); // Mostrar en consola
  };

  const handleSelectionVivienda = (option) => {
    setVivienda(option); // Actualizar el estado en el componente padre
    console.log('Vivienda:', option); // Mostrar en consola
  };

  // Función para manejar la selección
  const handleSelection = (option) => {
    setSelectedOption(option); // Actualizar el estado en el componente padre
    console.log('Opción seleccionada:', option); // Mostrar en consola
  };


  return (
    <div>
      <NavInesis></NavInesis>
      <MigasRecorrido items={links}></MigasRecorrido>
      <div className='d-flex flex-column min-vh-100 mt-5 mx-5 px-5'>
        <div className='flex-grow-1'>
          <form action="">
            <div className='row mx-5 mt-4  mw-100'>
              {/* INICIO MODULO INFORMACION GENERA */}
              <div className='col tarjeta-border px-5 d-flex justify-content-start me-3' style={{ background: 'var(--color-morado2)', color: 'white' }}>
                <div className='row'>
                  <p className='fs-2' style={{ color: 'white', fontWeight: 'bolder' }}>Información general</p>
                  <div className='d-flex align-items-center'>
                    <label className='fs-5 me-3' style={{ fontWeight: 'bold' }}>Nombre:</label>
                    <label>Luis Alberto Hernandez Ramirez</label>
                  </div>
                  <div className='mt-4 d-flex align-items-center'>
                    <label className='fs-5 me-3' style={{ fontWeight: 'bold' }}>Carrera:</label>

                    <label>Licenciatura en Informatica</label>
                  </div>
                  <div className='mt-4 d-flex align-items-center'>
                    <label className='fs-5 me-3' style={{ fontWeight: 'bold' }}>Semestre:</label>
                    <div>
                      <SeleccionarCombo
                        options={['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto', 'Septimo', 'Octavo', 'Noveno', 'Decimo']} // Opciones disponibles
                        onChange={handleSelection} // Función para manejar la selección
                        placeholder="Selecciona una opción" // Placeholder
                      />
                    </div>
                  </div>
                  <div className='mt-4 d-flex align-items-center'>
                    <label className='fs-5 me-3' style={{ fontWeight: 'bold' }}>Sexo:</label>
                    <div>
                      <SeleccionarCombo
                        options={['Hombre', 'Mujer']} // Opciones disponibles
                        onChange={handleSelection} // Función para manejar la selección
                        placeholder="Selecciona una opción" // Placeholder
                      />
                    </div>
                  </div>
                  <div className='mt-4 d-flex align-items-center'>
                    <label className='fs-5 me-3' style={{ fontWeight: 'bold' }}>Estado civil:</label>
                    <RadioSelect options={['Soltero', 'Casado']} onChange={handleSelectionEstadoCivil} />
                  </div>

                  <div className='mt-4'>
                    <label className='fs-5' style={{ fontWeight: 'bold' }}>¿Tienes los recursos económicos necesarios para tus actividades académicas?</label>
                    <RadioSelect gris={false} options={['Si', 'No']} onChange={handleSelectionRecursos} />
                  </div>
                </div>
              </div>
              {/* FIN MODULO INFORMACION GENERA */}

              {/* INICIO MODULO DOMICILIO */}
              <div className='col tarjeta-border d-flex justify-content-start ms-3 px-5'>
                <div className='row'>
                  <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>Domicilio</p>
                  <div className='mt-2'>
                    <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Marque la opción que mejor describa tu situación de vivienda:</label>
                    <RadioSelect gris={true} options={['Rento cuarto', 'Rento casa', 'Vivo con familiares']} onChange={handleSelectionVivienda} />
                  </div>
                  <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Indica tu dirección actual:</label>
                  <div className='row'>
                    <div className='col-6 mt-2'>
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Estado</label>
                      <div>
                        <SeleccionarCombo
                          options={['Oaxaca', 'Veracruz', 'Chiapas']} // Opciones disponibles
                          onChange={handleSelection} // Función para manejar la selección
                          placeholder="Selecciona una opción" // Placeholder
                        />
                      </div>
                    </div>
                    <div className='col-6 mt-2'>
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Municipio</label>
                      <div>
                        <SeleccionarCombo
                          options={['Ixtlan', 'Xiacui']} // Opciones disponibles
                          onChange={handleSelection} // Función para manejar la selección
                          placeholder="Selecciona una opción" // Placeholder
                        />
                      </div>
                    </div>
                    <div className='col-6 mt-2'>
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Localidad</label>
                      <div>
                        <SeleccionarCombo
                          options={['Capulalpam', 'Guelatao']} // Opciones disponibles
                          onChange={handleSelection} // Función para manejar la selección
                          placeholder="Selecciona una opción" // Placeholder
                        />
                      </div>
                    </div>
                    <div className='col-6 mt-2'>
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Colonia</label>
                      <div>
                        <SeleccionarCombo
                          options={['Soledad', 'Asuncion']} // Opciones disponibles
                          onChange={handleSelection} // Función para manejar la selección
                          placeholder="Selecciona una opción" // Placeholder
                        />
                      </div>
                    </div>
                    <div className='col-6 mt-2'>
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Calle</label>
                      <input className='form-control' type="text" />
                    </div>
                    <div className="col-3 mt-2">
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Numero</label>
                      <input className='form-control' type="text" />
                    </div>
                    <div className="col-3 mt-2">
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>C.P.</label>
                      <input className='form-control' type="text" />
                    </div>
                    <div className="col-12">
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Nombre de la casa de huéspedes o propietario</label>
                      <input className='form-control' type="text" />
                    </div>
                  </div>
                </div>
              </div>
              {/* FIN MODULO DOMICILIO */}
            </div>


            {/* MODULO GASTOS E INGRESOS  */}
            <div className='row mx-5 mt-4'>
              <div className='tarjeta-border p-5'>
                <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bold' }}>Gatos e ingresos</p>
                <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>¿A cuánto hacienden tus gastos mensuales de manutención?</p>
                <div className="row">
                  <div className="col">
                    <p style={{ color: 'var(--color-gris1)' }}>Lo que pagas de alimentación, transporte, vivienda, servicios médicos, libros y materiales escolares, entretenimiento, etc. (Por favor no incluyas los gastos en colegiatura e inscripciones de la universidad)</p>
                    <input className='form-control w-25' type="number" />
                  </div>
                  <div className='col d-flex flex-column align-items-center text-center'>
                    <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>
                      ¿Dependes económicamente?
                    </p>
                    <RadioSelect gris={true} options={['Si', 'No']} onChange={handleSelectionRecursos} />
                  </div>
                </div>
                <div class="line mx-auto mt-5 mb-4"></div>
                <div className="row">
                  <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Nombre de la persona de la cuál dependes económicamente:</p>
                  <input className='form-control w-25' type="text" />
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>El trabajo de quien dependes es:</p>
                    <RadioSelect gris={true} options={['Temporal', 'Permanente']} onChange={handleSelectionRecursos} />
                  </div>
                  <div className="col">
                    <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Indica su ocupación:</p>
                    <SeleccionarCombo
                      options={['Jornalero', 'Chambeador']} // Opciones disponibles
                      onChange={handleSelection} // Función para manejar la selección
                      placeholder="Selecciona una opción" // Placeholder
                    />
                  </div>
                  <div className="col">
                    <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Otro:</p>
                    <input className='form-control w-50' type="text" />
                  </div>
                </div>
                <div class="line mx-auto mt-5 mb-4"></div>
                <div className="row">
                  <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>¿Solicitas beca alimentaria?</p>
                  <RadioSelect gris={true} options={['Si', 'No']} onChange={handleSelectionRecursos} />
                </div>
              </div>
            </div>
            {/* FIN MODULO GASTOS E INGRESOS  */}


            <div className="row mx-5 mt-4 mb-5">
              {/* MODULO TRANSPORTE */}
              <div className="col tarjeta-border me-4 p-5">
                <p className='fs-2 ' style={{ color: 'var(--color-morado2)', fontWeight: 'bold' }}>Transporte</p>
                <label className='fs-5 mb-3' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Llevas automóvil o motocicleta cotidianamente a la universidad?</label>
                <RadioSelect gris={true} options={['Si', 'No']} onChange={handleSelectionRecursos} />
                <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">Selecciona tu tipo de vehículo:</label>
                <div className='w-25'>
                  <SeleccionarCombo
                    options={['Terrestre', 'Aereo', 'Acuatico']} // Opciones disponibles
                    onChange={handleSelection} // Función para manejar la selección
                    placeholder="Selecciona una opción" // Placeholder
                  />
                </div>
                <div className="row mt-4">
                  <div className="col">
                    <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">Marca</label>
                    <input className='form-control w-75' type="text" />
                  </div>
                  <div className="col">
                    <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">Modelo</label>
                    <input className='form-control w-75' type="text" />
                  </div>
                  <div className="col">
                    <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">Año</label>
                    <input className='form-control w-75' type="text" />
                  </div>
                </div>
                <div className="row mt-4">
                  <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Qué otros medios utilizas para trasladarte a la universidad?</label>
                  <div className="col">
                    <CheckBox opcion="Microbús" id='micro'></CheckBox>
                    <br />
                    <CheckBox opcion="Automóvil de amigos" id='autoamigos'></CheckBox>
                    <br />
                    <CheckBox opcion="Bicicleta" id='bicicleta'></CheckBox>
                  </div>
                  <div className="col">
                    <CheckBox opcion="Mototaxi" id='mototaxi'></CheckBox>
                    <br />
                    <CheckBox opcion="Caminando" id='caminando'></CheckBox>
                    <br />
                    <CheckBox opcion="Automovil familiar" id='autofamiliar'></CheckBox>
                  </div>
                  <div className="col">
                    <CheckBox opcion="Colectivo" id='colectivo'></CheckBox>
                    <br />
                    <CheckBox opcion="Taxi" id='taxi'></CheckBox>
                  </div>
                </div>
              </div>
              {/* FIN MODULO TRANSPORTE */}

              {/* INFORMACION COMPLEMENTARIA */}
              <div className="col tarjeta-border p-5">
                <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bold' }}>Información complementaria</p>
                <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Eres hijo o nieto de comunero de Ixtlán de Juárez?</label>
                <RadioSelect gris={true} options={['Si', 'No']} onChange={handleSelectionRecursos} />
                <br />
                <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Utilizas teléfono celular en la universidad?</label>
                <RadioSelect gris={true} options={['Si', 'No']} onChange={handleSelectionRecursos} />
                <br />
                <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Tienes computadora personal y/o portátil?</label>
                <RadioSelect gris={true} options={['Si', 'No']} onChange={handleSelectionRecursos} />
                <br />
                <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Tienes computadora personal y/o portátil?</label>
                <input className='form-control w-75' type="text" />
              </div>
              {/* FIN INFORMACION COMPLEMENTARIA */}
            </div>
            <div className='d-flex justify-content-center mb-5'>
              <button className='btn btn-midDatos'>Guardar</button>
            </div>
          </form>
        </div>
        <FooterInesis></FooterInesis>
      </div>
    </div>
  )
}
