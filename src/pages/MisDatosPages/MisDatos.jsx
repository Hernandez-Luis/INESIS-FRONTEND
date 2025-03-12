import React, { useState } from 'react'
import NavInesis from '../../components/NavInesis/NavInesis'
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido'
import "../../styles/TarjetaEstilo/TarjetaEstilo.css"
import FooterInesis from '../../components/FooterInesis/FooterInesis'
import RadioSelect from '../../components/RadioSelect/RadioSelect'
import SeleccionarCombo from '../../components/ComboSeleccionar/SeleccionarCombo'

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
      <div className='d-flex flex-column min-vh-100 mt-5'>
        <div className='flex-grow-1'>
          <form action="">
            <div className=' row mw-100'>
              <div className='col tarjeta-border ms-5 d-flex justify-content-start me-3' style={{ background: 'var(--color-morado2)', color: 'white' }}>
                <div className='row'>
                  <p className='fs-2' style={{ color: 'white', fontWeight: 'bolder' }}>Información general</p>
                  <div className='d-flex align-items-center'>
                    <label className='fs-5 me-3' style={{ fontWeight: 'bold' }}>Nombre:</label>
                    {/* <input className='form-control' type="text" /> */}
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
                    <label className='fs-5 me-3' style={{ fontWeight: 'bold' }}>Estado civil:</label>
                    <RadioSelect options={['Soltero', 'Casado']} onChange={handleSelectionEstadoCivil} />
                  </div>

                  <div className='mt-4'>
                    <label className='fs-5' style={{ fontWeight: 'bold' }}>¿Tienes los recursos económicos necesarios para tus actividades académicas?</label>
                    <RadioSelect gris={false} options={['Si', 'No']} onChange={handleSelectionRecursos} />
                  </div>
                </div>
              </div>
              <div className='col tarjeta-border d-flex justify-content-start ms-3'>
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
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <FooterInesis></FooterInesis>
      </div>
    </div>
  )
}
