import React, { useState } from 'react';
import Swal from 'sweetalert2';
import MigasRecorrido from '../../../components/MigasDePan/MigasRecorrido';
import RadioSelect from '../../../components/RadioSelect/RadioSelect';
import SeleccionarCombo from '../../../components/ComboSeleccionar/SeleccionarCombo';
import { CheckBox } from '../../../components/CheckBox/CheckBox'
import ValidationError from './ValidacionFamilia';


const MiFamiliaForm = () => {
    const [documentosHermanos, setDocumentosHermanos] = useState([]);

    //documento de hermanos dependientes
    const handleFileUpload = (files) => {
        const documentos = Array.from(files);
        setDocumentosHermanos(documentos); // Este estado debe estar declarado
    };

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleCheckboxChange = (id) => {
        setSelectedOptions((prevOptions) => {
            if (prevOptions.includes(id)) {
                return prevOptions.filter((option) => option !== id);
            } else {
                return [...prevOptions, id];
            }
        });
    };
    const [vivienda, setVivienda] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [contacto, setContacto] = useState('');
    const [servicioVivienda, setServicioVivienda] = useState('');
    const [casaFamilia, setCasaFamilia] = useState('');
    const [accesoInternet, setAccesoIntenet] = useState('');
    const [formData, setFormData] = useState('');
    const [numHermanos, setNumHermanos] = useState('');
    const [hermanosEstudian, setHermanosEstudian] = useState('');
    const [dejanEstudio, setDejanEstudio] = useState('');
    const [tienenLic, setTienenLic] = useState('');
    const [selectedValues, setSelectedValues] = useState({});

    const [contactoError, setContactoError] = useState('');


    const [numDependientes, setNumDependientes] = useState('');
    const [dependientes, setDependientes] = useState([]);
    const [radioValues, setRadioValues] = useState({});

    const handleSelection = (label, value) => {
        setSelectedValues((prev) => ({
            ...prev,
            [label]: value
        }));
    };

    const handleAccesoInternet = (value) => {
        setRadioValues(prev => ({
            ...prev,
            accesoInternet: value
        }));
    };

    const handleSelectionCoincideDomicilio = (value) => {
        setRadioValues(prev => ({
            ...prev,
            coincideDomicilio: value
        }));
    };

    // Función para manejar el cambio en el input de personas dependientes
    const handleNumDependientesChange = (e) => {
        const cantidad = parseInt(e.target.value, 10);
        setNumDependientes(cantidad);
        const nuevosDependientes = Array.from({ length: cantidad }, (_, index) => ({
            id: index,
            nombre: "",
            edad: "",
            parentesco: "",
            gradoEstudios: "",
            institucion: "",
        }));

        setDependientes(nuevosDependientes);
    };

    // Función para manejar el cambio en los campos de cada dependiente
    const handleDependienteChange = (index, field, value) => {
        const nuevosDependientes = [...dependientes];
        nuevosDependientes[index][field] = value;
        setDependientes(nuevosDependientes);
    };

    const handleCasaFamilia = (option) => {
        setCasaFamilia(option);
        console.log(option);
    };

    const handleServicioVivienda = (option) => {
        setServicioVivienda(option); // Actualizar el estado en el componente padre
        console.log(option);
    };


    // Datos de los selects organizados en un array para evitar repeticiones
    const selectData = [
        { label: "Codigo Postal", options: [""] },
        { label: "Estado", options: ["Oaxaca", "Veracruz", "Chiapas"] },
        { label: "Municipio", options: ["Ixtlan", "Xiacui", "Tamazulapam Del Espiritu Santo Mixe"] },
        { label: "Colonia o barrio", options: ["Soledad", "Asuncion"] },
        { label: "Región", options: ["Yahuiche", "Tierra Caliente"] },
        { label: "Localidad", options: ["Capulalpam", "Guelatao"] },
        { label: "Distrito", options: ["Villa Alta", "Ixtlan de Juarez"] },
    ];
    const handleGuardarDatos = () => {
        // validacion si los campos están llenos, prueba 
        Swal.fire({
            icon: 'success',
            title: 'Datos guardados',
            text: 'La información de tu familia ha sido registrada correctamente.',
            confirmButtonText: "Aceptar",
            timer: 10000,
            timerProgressBar: true,
            didOpen: () => {
                const confirmButton = Swal.getConfirmButton();
                confirmButton.style.backgroundColor = "var(--color-verde)";
            },
        });
    };


    return (
        <div>
            <div className='d-flex flex-column min-vh-100 mt-3 mb-4 ms-4 me-4'>
                <form>
                    <div className='tarjeta-border p-4 mb-2'>
                        <div className='row'>
                            <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>Domicilio</p>
                            <div className='mt-2'>
                                <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>
                                    ¿El domicilio de tu tutor coincide con el que te encuentras actualmente?
                                </label>
                                <div className="ms-4">
                                    <RadioSelect
                                        name="coincideDomicilio"
                                        gris={true}
                                        options={['Si', 'No']}
                                        value={radioValues['coincideDomicilio'] || ''}
                                        onChange={handleSelectionCoincideDomicilio}
                                    />
                                </div>

                            </div>

                            {/* Contenedor para los selects */}
                            <div className='row mt-3'>
                                {selectData.map((item, index) => (
                                    <div key={index} className='col-md-3 col-sm-6 mt-2'>
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>{item.label}</label>
                                        <SeleccionarCombo
                                            options={item.options}
                                            value={selectedValues[item.label] || ''} // Valor controlado
                                            onChange={(value) => handleSelection(item.label, value)}
                                            placeholder="Selecciona una opción"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 mx-0">
                        {/* Tarjeta combinada para Contacto y Escolaridad */}
                        <div className="tarjeta-border p-4 mb-4">
                            <div className="row px-4">
                                {/* Columna 1: Contacto */}
                                <div className="col-md-4 d-flex flex-column">
                                    <p className="fs-2" style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                        Contacto
                                    </p>
                                    <div className="col-12 mb-3">
                                        <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            placeholder="Ingresa el número de teléfono"
                                            value={contacto}
                                            onChange={(e) => {
                                                const valor = e.target.value;
                                                const regex = /^[0-9]{0,10}$/;
                                                if (regex.test(valor)) {
                                                    setContacto(valor);
                                                    setContactoError(valor.length < 10 ? 'El número debe tener al menos 10 dígitos' : '');
                                                }
                                            }}
                                        />
                                        <ValidationError message={contactoError} />
                                    </div>
                                </div>


                                {/* Columna 2: Escolaridad */}
                                <div className="col-md-8 d-flex flex-column">
                                    <p className="fs-2" style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                        Escolaridad
                                    </p>
                                    <div className="row">
                                        {/* Escolaridad del padre */}
                                        <div className="col-6 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                Escolaridad del padre
                                            </label>
                                            <SeleccionarCombo
                                                options={['Primaria', 'Secundaria', 'Bachillerato', 'Universidad']}
                                                value={selectedValues['escolaridadPadre'] || ''}
                                                onChange={(value) => handleSelection('escolaridadPadre', value)}
                                                placeholder="Selecciona una opción"
                                            />
                                        </div>

                                        {/* Escolaridad de la madre */}
                                        <div className="col-6">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                Escolaridad de la madre
                                            </label>
                                            <SeleccionarCombo
                                                options={['Primaria', 'Secundaria', 'Bachillerato', 'Universidad']}
                                                value={selectedValues['escolaridadMadre'] || ''}
                                                onChange={(value) => handleSelection('escolaridadMadre', value)}
                                                placeholder="Selecciona una opción"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-12 tarjeta-border d-flex flex-column p-4 mb-4">
                            <p className='fs-2 px-4' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                Vivienda
                            </p>
                            {/* Fila para los campos de escolaridad */}
                            <div className="row px-4 ">
                                {/* Escolaridad de padre */}
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        La casa donde tu familia es:
                                    </label>
                                    <SeleccionarCombo
                                        options={['Propia', 'Renta', 'Alquilada']}
                                        value={selectedValues['casaPropiedad'] || ''}
                                        onChange={(value) => handleSelection('casaPropiedad', value)}
                                        placeholder="Selecciona una opción"
                                    />
                                </div>

                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        Tipo de vivienda
                                    </label>
                                    <SeleccionarCombo
                                        options={['Casa sola', 'Condominio', 'Otra']}
                                        value={selectedValues['tipoVivienda'] || ''}
                                        onChange={(value) => handleSelection('tipoVivienda', value)}
                                        placeholder="Selecciona una opción"
                                    />
                                </div>

                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        Material de construcción
                                    </label>
                                    <SeleccionarCombo
                                        options={['Mampostería', 'Madera', 'Lámina', 'Concreto', 'Otros']}
                                        value={selectedValues['materialConstruccion'] || ''}
                                        onChange={(value) => handleSelection('materialConstruccion', value)}
                                        placeholder="Selecciona una opción"
                                    />
                                </div>

                                <div className="col-12 col-md-3 mb-3 ">
                                    <label className="fs-5 mb-2" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Con qué servicios cuenta la vivienda?
                                    </label>
                                    <div className="row">

                                        {/* Primera columna */}
                                        <div className="col-md-4">
                                            <CheckBox opcion="Agua" id='agua' onChange={handleCheckboxChange}></CheckBox>
                                            <CheckBox opcion="luz" id='luz' onChange={handleCheckboxChange}></CheckBox>
                                        </div>
                                        {/* Segunda columna */}
                                        <div className="col-md-4">
                                            <CheckBox opcion="Drenaje" id='drenaje' onChange={handleCheckboxChange}></CheckBox>
                                            <CheckBox opcion="Telefono" id='telefono' onChange={handleCheckboxChange}></CheckBox>
                                        </div>
                                        <div className="col-md-4">
                                            <CheckBox opcion="Otro" id='espacioTrabajos' onChange={handleCheckboxChange}></CheckBox>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row gap-3 px-4'>
                                <div className="col-12 col-md-12">
                                    <label className="fs-5 mb-3 d-block" style={{ color: 'var(--color-morado3)' }}>
                                        ¿En la casa donde vive tu familia hay?
                                    </label>
                                    <div className="row">
                                        {/* Primera columna */}
                                        <div className="col-md-3">
                                            <CheckBox opcion="Agua Caliente" id='aguaCaliente' onChange={handleCheckboxChange}></CheckBox>
                                            <CheckBox opcion="Refrigerador" id='refrigerador' onChange={handleCheckboxChange}></CheckBox>
                                            <CheckBox opcion="Estufa de gas" id='estufaDeGas' onChange={handleCheckboxChange}></CheckBox>
                                        </div>

                                        {/* Segunda columna */}
                                        <div className="col-md-3">
                                            <CheckBox opcion="Aire acondicionado" id='aireAcondicionado' onChange={handleCheckboxChange}></CheckBox>
                                            <CheckBox opcion="Automóvil propio" id='automovilPropio' onChange={handleCheckboxChange}></CheckBox>
                                            <CheckBox opcion="Televisor" id='televisor' onChange={handleCheckboxChange}></CheckBox>
                                        </div>

                                        {/* Tercera columna */}
                                        <div className="col-md-4">
                                            <CheckBox opcion="Horno de microondas" id='hornoMicroondas' onChange={handleCheckboxChange}></CheckBox>
                                            <CheckBox opcion="Espacio privado para estudiar" id='espacioTrabajos' onChange={handleCheckboxChange}></CheckBox>
                                            <CheckBox opcion="Lavadora de ropa" id='lavadoraDeRopa' onChange={handleCheckboxChange}></CheckBox>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-12 tarjeta-border d-flex flex-column p-4 mb-4 ">
                            <p className='fs-2 px-4' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                Información complementaria
                            </p>
                            {/* Fila para los campos de escolaridad */}
                            <div className="row gab-3 px-4">
                                {/* Escolaridad de padre */}
                                <div className="col-md-4 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Cuántas personas habitan en la vivienda?
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        value={vivienda}
                                        onChange={(e) => {
                                            const valor = e.target.value;
                                            const regex = /^[0-9]{0,2}$/; // Permite 0 a 2 dígitos numéricos

                                            if (regex.test(valor)) {
                                                setVivienda(valor);
                                            }
                                        }}
                                    />

                                </div>
                                <div className="col-12 col-md-8 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        Medios para estudiar en casa (marca tantas opciones como sea necesario):
                                    </label>
                                    <div className='row'>
                                        <div className="col-md-4">
                                            <CheckBox opcion="Computadora" id='computadora' onChange={handleCheckboxChange} />
                                            <CheckBox opcion="Impresora" id='impresora' onChange={handleCheckboxChange} />
                                            <CheckBox opcion="Librero" id='librero' onChange={handleCheckboxChange} />
                                            <CheckBox opcion="Escritorio/ mesa de trabajo" id='escritorio' onChange={handleCheckboxChange} />
                                        </div>
                                        <div className="col-md-4">
                                            <CheckBox opcion="Libros especializados" id='librosEspecializados' onChange={handleCheckboxChange} />
                                            <CheckBox opcion="Diccionarios" id='diccionarios' onChange={handleCheckboxChange} />
                                            <CheckBox opcion="Calculadora" id='calculadora' onChange={handleCheckboxChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-3 mb-3 px-4">
                                <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                    ¿Cuenta con acceso a internet?
                                </label>
                                <div className="ms-4">
                                    <RadioSelect
                                        name="accesoInternet"
                                        gris={true}
                                        options={['Si', 'No']}
                                        value={radioValues['accesoInternet'] || ''}
                                        onChange={handleAccesoInternet}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="col-12 col-md-12 tarjeta-border d-flex flex-column p-4 mb-4">
                            <p className='fs-2 px-4' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                Hermanos
                            </p>
                            <div className="row px-4">
                                {/* ¿Cuántos hermanos tienes? */}
                                <div className="col-10 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Cuántos hermanos tienes?
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        value={numHermanos}
                                        onChange={(e) => {
                                            const valor = e.target.value;
                                            const regex = /^[0-9]{0,2}$/;
                                            if (regex.test(valor)) setNumHermanos(valor);
                                        }}
                                    />
                                </div>

                                {/* ¿Cuántos están estudiando? */}
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Cuántos están estudiando?
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        value={hermanosEstudian}
                                        onChange={(e) => {
                                            const valor = e.target.value;
                                            const regex = /^[0-9]{0,2}$/;
                                            if (regex.test(valor)) setHermanosEstudian(valor);
                                        }}
                                    />
                                </div>

                                {/* ¿Cuántos dejaron de estudiar? */}
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Cuántos dejaron de estudiar?
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder=""
                                        value={dejanEstudio}
                                        onChange={(e) => {
                                            const valor = e.target.value;
                                            const regex = /^[0-9]{0,2}$/;
                                            if (regex.test(valor)) setDejanEstudio(valor);
                                        }}
                                    />
                                </div>

                                {/* ¿Cuántos tienen licenciatura? */}
                                <div className="col-12 col-md-3 mb-3">
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        ¿Cuántos tienen licenciatura?
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder=""
                                        value={tienenLic}
                                        onChange={(e) => {
                                            const valor = e.target.value;
                                            const regex = /^[0-9]{0,2}$/;
                                            if (regex.test(valor)) setTienenLic(valor);
                                        }}
                                    />
                                </div>



                            </div>
                        </div>


                        <div className="container">
                            <div className="col-12 col-md-12 tarjeta-border d-flex flex-column p-4 mb-4">
                                <p className="fs-2 px-4" style={{ color: "var(--color-morado2)", fontWeight: "bolder" }}>
                                    Personas dependientes
                                </p>
                                <div className="col-12 col-md-8 mb-3 px-4">
                                    <label className="fs-5" style={{ color: "var(--color-morado3)" }}>
                                        Además de ti y tus padres, ¿Cuántas personas dependen económicamente de tu ingreso familiar?
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control col-md-4 mt-2"
                                        placeholder="Ingrese el numero de hermanos dependientes economicamente"
                                        value={numDependientes}
                                        onChange={handleNumDependientesChange}
                                        min="10"
                                    />
                                </div>
                                {/* Renderizar dinámicamente los formularios según el número de dependienÑtes */}
                                {dependientes.map((dep, index) => (
                                    <div key={dep.id} className="col-12 col-md-12 tarjeta-border d-flex flex-column p-4 mb-2">

                                        <div className="row px-4">
                                            <div className="col-12 col-md-3 mb-3">
                                                <label className="fs-5" style={{ color: "var(--color-morado3)" }}>Nombre completo:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={dep.nombre}
                                                    onChange={(e) => handleDependienteChange(index, "nombre", e.target.value)}
                                                />
                                            </div>

                                            <div className="col-12 col-md-2 mb-3">
                                                <label className="fs-5" style={{ color: "var(--color-morado3)" }}>Edad:</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={dep.edad}
                                                    onChange={(e) => handleDependienteChange(index, "edad", e.target.value)}
                                                />
                                            </div>

                                            <div className="col-12 col-md-2 mb-3">
                                                <label className="fs-5" style={{ color: "var(--color-morado3)" }}>Parentesco:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={dep.parentesco}
                                                    onChange={(e) => handleDependienteChange(index, "parentesco", e.target.value)}
                                                />
                                            </div>
                                            <div className="col-12 col-md-2 mb-3">
                                                <label className="fs-5" style={{ color: "var(--color-morado3)" }}>Tipo de comprobante</label>
                                                <SeleccionarCombo
                                                    options={['CURP', 'Acta de nacimiento', 'Credencial de estudio', 'INE', 'Otros']}
                                                    value={selectedValues['Acta de nacimiento'] || ''}
                                                    onChange={(value) => handleSelection('Acta de nacimiento', value)}
                                                    placeholder="Selecciona una opción"
                                                />
                                            </div>

                                            <div className="col-12 col-md-3 mb-3">
                                                <label className="fs-5" style={{ color: "var(--color-morado3)" }}>
                                                    Agregar comprobante
                                                </label>                                                
                                                <div className="d-flex justify-content-center">
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        multiple
                                                        style={{ maxWidth: '400px' }}
                                                        onChange={(e) => handleFileUpload(e.target.files)}
                                                    />
                                                </div>
                                            </div>
                                            {/*<div className="col-12 col-md-2 mb-3">
                                                <label className="fs-5" style={{ color: "var(--color-morado3)" }}>Grado de estudios:</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={dep.gradoEstudios}
                                                    onChange={(e) => handleDependienteChange(index, "gradoEstudios", e.target.value)}
                                                />
                                            </div>

                                            <div className="col-12 col-md-3 mb-3">
                                                <label className="fs-5" style={{ color: "var(--color-morado3)" }}>Nombre de su institución:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={dep.institucion}
                                                    onChange={(e) => handleDependienteChange(index, "institucion", e.target.value)}
                                                />
                                            </div>*/}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-4 mb-4">
                                <button
                                    className="btn btn-primary px-4 py-2"
                                    style={{
                                        backgroundColor: 'var(--color-morado3)',
                                        border: 'none',
                                        fontSize: '1.2rem',
                                        borderRadius: '8px',
                                    }}
                                    onClick={handleGuardarDatos}
                                >
                                    Guardar información
                                </button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    );
};
export default MiFamiliaForm;
