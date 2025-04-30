import React, { useEffect, useState } from 'react'
import NavInesis from '../../components/NavInesis/NavInesis'
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido'
import "../../styles/TarjetaEstilo/TarjetaEstilo.css"
import FooterInesis from '../../components/FooterInesis/FooterInesis'
import RadioSelect from '../../components/RadioSelect/RadioSelect'
import SeleccionarCombo from '../../components/ComboSeleccionar/SeleccionarCombo'
import { CheckBox } from '../../components/CheckBox/CheckBox'
import '../../styles/MisDatos/MisDatos.css'
import CatMedioTransporteService from '../../services/CatMedioTransporteService'
import { data } from 'react-router-dom'

export const MisDatos = ({onAdd}) => {

  const links = [
    { url: '/PrincipalAdmin', label: 'Inicio' },
    { url: '/PrincipalAdmin', label: 'Solicitud' },
    { url: '/PrincipalAdmin', label: 'Inicio' }
  ];

  const [medios, setMedios] = useState([]);
  const [mediosSeleccionados, setMediosSeleccionados] = useState([])
  const [estadoCivil, setEstadoCivil] = useState(null);
  const [recursos, setRecursos] = useState(null);
  const [vivienda, setVivienda] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    obtenerListaMedioTransporte();
  }, []);

  const obtenerListaMedioTransporte = async () => {
    try {
      let listaMedios = await CatMedioTransporteService.getAll();
      setMedios(listaMedios)
      console.log(listaMedios)
    } catch (error) {
      console.log("Error al obtener la lista de CatMediosTransporte: ", error)
    }
  }

  // Funcion para manejar los cambios y guardarlos en la tabla GastosIngresos
  const manejarCambioCheckbox = (id) => {
    setMediosSeleccionados((prev) => 
      prev.includes(id)
        ? prev.filter((item) => item !== id) // Desmarcar
        : [...prev, id] // Marcar
    );
    console.log(mediosSeleccionados)
  };

  const formularioInicialGastosIngresos = {
    gastoMensual: "",
    dependeEconomicamente: "",
    //Si depende
    personaDepende: "", 
    trabajoTipo: "",
    ocupacion: "",
    otro: "",

    solicitaBeca: ""
  }

  const formularioInicialTrabajo = {
     //No depende
     nombreTrabajo: "",
     ingresoMensual: "",
     telefonoTrabajo: "",
     domicilioTrabajo: ""
  }

  const [dataGastosIngresos,setDataGastosIngresos] = useState(formularioInicialGastosIngresos)
  const [dataTrabajo,setDataTrabajo] = useState(formularioInicialTrabajo)

  const cambiosGastosIngresos = (e) => {
    const { name, value } = e.target;
    
    // Debug: verifica que los valores se están capturando
    console.log(`Campo cambiado: ${name}, Valor: ${value}`);
    
    setDataGastosIngresos(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Debug: verifica el estado después del cambio
    console.log("Estado actualizado:", {...dataGastosIngresos, [name]: value});
    console.log("Datos JSON: ", dataGastosIngresos)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("datosGastosIngresos: ", dataGastosIngresos)

    const coleccionValores = {}

    coleccionValores.data = this.formularioInicialGastosIngresos;
    console.log("coleccion", coleccionValores)
    
    console.log("Datos guardar: ", dataGastosIngresos)
    try {
      
      const nuevosErrores = onAdd(dataGastosIngresos)

      if(nuevosErrores && nuevosErrores.length > 0){
        //Mostrar la lista de errores
        console.log("Aqui se mostraran los errores")
        return
      }

      setDataGastosIngresos({})
      //Borrar la lista de errores
    } catch (error) {
      
    }
  }


  return (
    <div>
      <NavInesis></NavInesis>
      <MigasRecorrido items={links}></MigasRecorrido>
      <div className='d-flex flex-column min-vh-100'>
        <div className='flex-grow-1 mt-5 mx-5 px-5'>
          <form onSubmit={handleSubmit}>
            <div className='row mx-5 mt-4  mw-100'>
              {/* INICIO MODULO INFORMACION GENERAL */}
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
                        name="semestres"
                        options={['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto', 'Septimo', 'Octavo', 'Noveno', 'Decimo']} // Opciones disponibles
                         // Función para manejar la selección
                        placeholder="Selecciona una opción" // Placeholder

                      />
                    </div>
                  </div>
                  <div className='mt-4 d-flex align-items-center'>
                    <label className='fs-5 me-3' style={{ fontWeight: 'bold' }}>Sexo:</label>
                    <div>
                      <SeleccionarCombo
                        name="sexo"
                        options={['Hombre', 'Mujer']} // Opciones disponibles
                        // Función para manejar la selección
                        placeholder="Selecciona una opción" // Placeholder
                      />
                    </div>
                  </div>
                  <div className='mt-4 d-flex align-items-center'>
                    <label className='fs-5 me-3' style={{ fontWeight: 'bold' }}>Estado civil:</label>
                    <RadioSelect 
                      options={['Soltero', 'Casado']} 
                      // onChange={} 
                      name="estadoCivil"
                    />
                  </div>

                  <div className='mt-4'>
                    <label className='fs-5' style={{ fontWeight: 'bold' }}>¿Tienes los recursos económicos necesarios para tus actividades académicas?</label>
                    <RadioSelect gris={false} options={['Si', 'No']}  />
                  </div>
                </div>
              </div>
              {/* FIN MODULO INFORMACION GENERAl */}

              {/* INICIO MODULO DOMICILIO */}
              <div className='col tarjeta-border d-flex justify-content-start ms-3 px-5'>

                <div className='row'>
                  <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>Domicilio</p>
                  <div className='mt-2'>
                    <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Marque la opción que mejor describa tu situación de vivienda:</label>
                    <RadioSelect gris={true} options={['Rento cuarto', 'Rento casa', 'Vivo con familiares']} />
                  </div>
                  <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Indica tu dirección actual:</label>
                  <div className='row'>
                    <div className='col-6 mt-2'>
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Estado</label>
                      <div>
                        <SeleccionarCombo
                          name="estado"
                          options={['Oaxaca', 'Veracruz', 'Chiapas']} // Opciones disponibles
                           // Función para manejar la selección
                          placeholder="Selecciona una opción" // Placeholder
                        />
                      </div>
                    </div>
                    <div className='col-6 mt-2'>
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Municipio</label>
                      <div>
                        <SeleccionarCombo
                          name="municipio"
                          options={['Ixtlan', 'Xiacui']} // Opciones disponibles
                           // Función para manejar la selección
                          placeholder="Selecciona una opción" // Placeholder
                        />
                      </div>
                    </div>
                    <div className='col-6 mt-2'>
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Localidad</label>
                      <div>
                        <SeleccionarCombo
                          options={['Capulalpam', 'Guelatao']} // Opciones disponibles
                          // Función para manejar la selección
                          placeholder="Selecciona una opción" // Placeholder
                        />
                      </div>
                    </div>
                    <div className='col-6 mt-2'>
                      <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>Colonia</label>
                      <div>
                        <SeleccionarCombo
                          name="colonia"
                          options={['Soledad', 'Asuncion']} // Opciones disponibles
                          // Función para manejar la selección
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
                    <input className='form-control w-25' type="number" name="gastoMensual" onChange={cambiosGastosIngresos}  value={dataGastosIngresos.gastoMensual}/>
                  </div>
                  <div className='col d-flex flex-column align-items-center text-center'>
                    <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>
                      ¿Dependes económicamente?
                    </p>
                    <RadioSelect 
                      gris={true} 
                      options={['Si', 'No']} 
                      onChange={(val) => setDataGastosIngresos({...dataGastosIngresos,dependesEconomicamente: val})} 
                      name="dependesEconomicamente"
                    />
                  </div>
                </div>


                {recursos === 'Si' && (
                  <div className="row mt-3">
                    <div class="line mx-auto mt-5 mb-4"></div>
                    <div className="col-12">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Nombre de la persona de la cuál dependes económicamente:</p>
                      <input className='form-control w-25' type="text" name='personaDepende' onChange={cambiosGastosIngresos}  value={dataGastosIngresos.personaDepende}/>
                    </div>
                    <div className="col-3">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>El trabajo de quien dependes es:</p>
                      <RadioSelect 
                        gris={true} 
                        options={['Temporal', 'Permanente']}
                        onChange={(val) => setDataGastosIngresos({...dataGastosIngresos,trabajoTipo:val})}
                        name="trabajoTipo"
                        />
                    </div>
                    <div className="col-3">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Indica su ocupación:</p>
                      <SeleccionarCombo
                        name="ocupacion"
                        options={['Jornalero', 'Chambeador']} // Opciones disponibles
                        // onChange={(value) => selecComboGastosIngresos("ocupacion",value)} // Función para manejar la selección
                        placeholder="Selecciona una opción" // Placeholder
                      />
                    </div>
                    <div className="col-5">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Otro:</p>
                      <input className='form-control w-50' name='otro' type="text" onChange={cambiosGastosIngresos}  value={dataGastosIngresos.otro}/>
                    </div>
                    <div class="line mx-auto mt-5 mb-4"></div>
                  </div>
                )}

                {recursos === 'No' && (
                  <div className="row mt-3">
                    <div class="line mx-auto mt-5 mb-4"></div>
                    <div className="col-4">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Nombre del lugar donde trabajas</p>
                      <input className='form-control w-50' type="text" value={dataTrabajo.nombreTrabajo}/>
                    </div>
                    <div className="col-4">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Menciona el ingreso mensual que recibes</p>
                      <input className='form-control w-50' type="text" value={dataTrabajo.ingresoMensual}/>
                    </div>
                    <div className="col-4">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Telefono celular del lugar donde trabajas</p>
                      <input className='form-control w-50' type="text" value={dataTrabajo.telefonoTrabajo}/>
                    </div>
                    <div className="col-12">
                      <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>Ingresa el domicilio de donde trabajas</p>
                      <input className='form-control w-50' type="text" value={dataTrabajo.domicilioTrabajo} />
                    </div>
                    <div class="line mx-auto mt-5 mb-4"></div>
                  </div>
                )}



                <div className="row">
                  <p className='fs-5' style={{ color: 'var(--color-morado3)' }}>¿Solicitas beca alimentaria?</p>
                  <RadioSelect gris={true} options={['Si', 'No']}  />
                </div>
              </div>
            </div>
            {/* FIN MODULO GASTOS E INGRESOS  */}


            <div className="row mx-5 mt-4 mb-5">
              {/* MODULO TRANSPORTE */}
              <div className="col tarjeta-border me-4 p-5">
                <p className='fs-2 ' style={{ color: 'var(--color-morado2)', fontWeight: 'bold' }}>Transporte</p>
                <label className='fs-5 mb-3' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Llevas automóvil o motocicleta cotidianamente a la universidad?</label>
                <RadioSelect gris={true} options={['Si', 'No']} />
                <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">Selecciona tu tipo de vehículo:</label>
                <div className='w-25'>
                  <SeleccionarCombo
                    options={['Terrestre', 'Aereo', 'Acuatico']} // Opciones disponibles
                    // Función para manejar la selección
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
                  {medios.map((medio) => (
                    <CheckBox
                      key={medio.id}
                      id={medio.id}
                      opcion={medio.nombreMedio} // O la propiedad correcta que contenga el nombre
                      onChange={manejarCambioCheckbox}
                    />
                  ))}
                </div>
              </div>
              {/* FIN MODULO TRANSPORTE */}

              {/* INFORMACION COMPLEMENTARIA */}
              <div className="col tarjeta-border p-5">
                <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bold' }}>Información complementaria</p>
                <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Eres hijo o nieto de comunero de Ixtlán de Juárez?</label>
                <RadioSelect gris={true} options={['Si', 'No']}/>
                <br />
                <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Utilizas teléfono celular en la universidad?</label>
                <RadioSelect gris={true} options={['Si', 'No']} />
                <br />
                <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">¿Tienes computadora personal y/o portátil?</label>
                <RadioSelect gris={true} options={['Si', 'No']}/>
                <br />
                <label className='fs-5 mb-3 mt-2' style={{ color: 'var(--color-morado3)' }} htmlFor="">Además del idioma español, ¿qué otro idioma, lenguaje o dialecto hablas?</label>
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
