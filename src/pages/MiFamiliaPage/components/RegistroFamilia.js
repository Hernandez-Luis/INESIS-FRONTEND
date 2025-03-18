import React, { useState } from "react";
import RadioSelect from '../../../components/RadioSelect/RadioSelect';
import SeleccionarCombo from '../../../components/ComboSeleccionar/SeleccionarCombo';
import CheckboxGroup from "../../../components/CheckBoxGroup/CheckboxGroup";

const RegistroFamilia = () => {
    const [vivienda, setVivienda] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [contacto, setContacto] = useState('');
    const [casaFamilia, setCasaFamilia] = useState('');
    const [accesoInternet, setAccesoIntenet] = useState('');
    const [formData, setFormData] = useState('');

    const [selectedOptions, setSelectedOptions] = useState({
        serviciosVivienda: [],
        equiposCasa: [],
        mediosEstudio: []
    });

    const handleCheckboxChange = (groupName, option, checked) => {
        setSelectedOptions((prevOptions) => {
            const updatedOptions = { ...prevOptions };
            if (checked) {
                updatedOptions[groupName] = [...updatedOptions[groupName], option];
            } else {
                updatedOptions[groupName] = updatedOptions[groupName].filter(
                    (item) => item !== option
                );
            }
            return updatedOptions;
        });
    };

    // Datos de los servicios y equipos
    const serviciosViviendaOptions = [
        "Agua", "Luz", "Drenaje", "Telefono", "Otro"
    ];

    const equiposCasaOptions = [
        "Agua Caliente", "Refrigerador", "Estufa de gas", "TV por cable",
        "Lavadora de ropa", "Aire acondicionado", "Automóvil propio", "Televisor",
        "Equipo de sonido/Grabadora", "Horno de microondas", "Videocasetera o DVD", "Espacio privado para estudiar"
    ];

    const mediosEstudioOptions = [
        "Computadora", "Impresora", "Librero","Escritorio/ mesa de trabajo", "Libros especializados",
        "Diccionarios","Enciclopedias","Calculadora"
    ];
    const handleSelectionCoincideDomicilio = (option) => setVivienda(option);
    const handleAccesoInternet = (option) => setAccesoIntenet(option);

    const handleSelection = (option) => setSelectedOption(option);

    // Datos de los selects organizados en un array para evitar repeticiones
    const selectData = [
        { label: "Estado", options: ["Oaxaca", "Veracruz", "Chiapas"] },
        { label: "Región", options: ["Yahuiche", "Tierra Caliente"] },
        { label: "Localidad", options: ["Capulalpam", "Guelatao"] },
        { label: "Distrito", options: ["Villa Alta", "Ixtlan de Juarez"] },
        { label: "Municipio", options: ["Ixtlan", "Xiacui", "Tamazulapam Del Espiritu Santo Mixe"] },
        { label: "Colonia o barrio", options: ["Soledad", "Asuncion"] },
    ];
    return (
        <div>

            <div className='d-flex flex-column min-vh-100 mt-5 mb-4'>
                <div className='flex-grow-1'>
                    <form>
                        <div className='ms-2 me-4 row mw-100 mb-4'>
                            <div className='col tarjeta-border d-flex justify-content-start ms-3 p-4'>
                                <div className='row'>
                                    <div className='mt-2'>
                                        <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>
                                            ¿El domicilio de tu tutor coincide con el que te encuentras actualmente?
                                        </label>
                                        <div className="ms-4">
                                            <RadioSelect gris={true} options={['Si', 'No']} onChange={handleSelectionCoincideDomicilio} />
                                        </div>
                                    </div>

                                    {/* Contenedor para los selects */}
                                    <div className='row mt-3'>
                                        {selectData.map((item, index) => (
                                            <div key={index} className='col-md-4 col-sm-6 mt-2'>
                                                <label className='fs-5' style={{ color: 'var(--color-morado3)' }}>{item.label}</label>
                                                <SeleccionarCombo
                                                    options={item.options}
                                                    onChange={handleSelection}
                                                    placeholder="Selecciona una opción"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4 mx-0">
                                {/* Tarjeta para Contacto */}
                                <div className="col-12 col-md-4 tarjeta-border d-flex flex-column p-4 mb-4">
                                    <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                        Contacto
                                    </p>
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        Telefono
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Ingresa el número de teléfono"
                                        value={contacto}
                                        onChange={(e) => setContacto(e.target.value)}
                                    />
                                </div>

                                {/* Tarjeta para Grados de Escolaridad */}
                                <div className="col-12 col-md-8 tarjeta-border d-flex flex-column p-4 mb-4">
                                    <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                        Escolaridad
                                    </p>
                                    {/* Fila para los campos de escolaridad */}
                                    <div className="row">
                                        {/* Escolaridad de padre */}
                                        <div className="col-12 col-md-6 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                Escolaridad de padre
                                            </label>
                                            <SeleccionarCombo
                                                options={['Primaria', 'Secundaria', 'Bachillerato', 'Universidad']}
                                                onChange={handleSelection}
                                                placeholder="Selecciona una opción"
                                            />
                                        </div>

                                        {/* Escolaridad de madre */}
                                        <div className="col-12 col-md-6 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                Escolaridad de la madre
                                            </label>
                                            <SeleccionarCombo
                                                options={['Primaria', 'Secundaria', 'Bachillerato', 'Universidad']}
                                                onChange={handleSelection}
                                                placeholder="Selecciona una opción"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-12 tarjeta-border d-flex flex-column p-4 mb-4">
                                    <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                        Vivienda
                                    </p>
                                    {/* Fila para los campos de escolaridad */}
                                    <div className="row">
                                        {/* Escolaridad de padre */}
                                        <div className="col-12 col-md-3 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                La cada donde tu Familia es:
                                            </label>
                                            <SeleccionarCombo
                                                options={['Propia', 'Renta', 'Alquilada']}
                                                onChange={handleSelection}
                                                placeholder="Selecciona una opción"
                                            />
                                        </div>

                                        {/* Escolaridad de madre */}
                                        <div className="col-12 col-md-3 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                Tipo vivienda
                                            </label>
                                            <SeleccionarCombo
                                                options={['Casa sola', 'Condominio', 'Otra']}
                                                onChange={handleSelection}
                                                placeholder="Selecciona una opción"
                                            />
                                        </div>
                                        <div className="col-12 col-md-3 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                Material de construción
                                            </label>
                                            <SeleccionarCombo
                                                options={['Mamposteria', 'Madera', 'Lamina', 'Concreto', 'Otros']}
                                                onChange={handleSelection}
                                                placeholder="Selecciona una opción"
                                            />
                                        </div>
                                        <div className="col-12 col-md-3 mb-3">
                                            <label className="fs-5 mb-2" style={{ color: 'var(--color-morado3)' }}>
                                                ¿Con qué servicios cuenta la vivienda?
                                            </label>
                                            <div className="row">
                                                <CheckboxGroup
                                                    options={serviciosViviendaOptions}
                                                    name="serviciosVivienda"
                                                    selectedOptions={selectedOptions.serviciosVivienda}
                                                    onChange={handleCheckboxChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row gap-3'>
                                        <div className="col-12 col-md-12">
                                            <label className="fs-5 mb-3 d-block" style={{ color: 'var(--color-morado3)' }}>
                                                ¿En la casa donde vive tu familia hay?
                                            </label>

                                            <div className="row">
                                                {/* Primera columna */}
                                                <div className="col-md-8">
                                                    <CheckboxGroup
                                                        options={equiposCasaOptions}
                                                        name="equiposCasa"
                                                        selectedOptions={selectedOptions.equiposCasa}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-12 tarjeta-border d-flex flex-column p-4 mb-4">
                                    <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                        Información complementaria
                                    </p>
                                    {/* Fila para los campos de escolaridad */}
                                    <div className="row gab-3">
                                        {/* Escolaridad de padre */}
                                        <div className="col-md-4 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                ¿Cuántas personas habitan en la vivienda?
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder=""
                                                value={vivienda}
                                                onChange={(e) => setVivienda(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-12 col-md-8 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                Medios para estudiar en casa (marca tantas opciones como sea necesario):
                                            </label>
                                            <div className='row'>
                                            <CheckboxGroup
                                                options={mediosEstudioOptions}
                                                name="mediosEstudio"
                                                selectedOptions={selectedOptions.mediosEstudio}
                                                onChange={handleCheckboxChange}
                                            />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-3 mb-3">
                                        <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                            ¿Cuenta con acceso a internet?
                                        </label>
                                        <div className="ms-4">
                                            <RadioSelect gris={true} options={['Si', 'No']} onChange={handleAccesoInternet} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-12 tarjeta-border d-flex flex-column p-4 mb-4">
                                    <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                        Hermanos
                                    </p>
                                    <div className="row">
                                        {/* Escolaridad de padre */}
                                        <div className="col-12 col-md-3 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                ¿Cuántos hermanos tienes?
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder=""
                                                value={contacto}
                                                onChange={(e) => setContacto(e.target.value)}
                                            />
                                        </div>

                                        {/* Escolaridad de madre */}
                                        <div className="col-12 col-md-3 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                ¿Cuántos están estudiando?                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder=""
                                                value={contacto}
                                                onChange={(e) => setContacto(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-12 col-md-3 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                ¿Cuántos dejaron de estudiar?                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder=""
                                                value={contacto}
                                                onChange={(e) => setContacto(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-12 col-md-3 mb-3">
                                            <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                ¿Cuántos tienen licenciatura?                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder=""
                                                value={contacto}
                                                onChange={(e) => setContacto(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <hr style={{ borderTop: '2px solid #ccc', margin: '10px 0' }} />
                                    <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>
                                        Personas dependientes
                                    </p>
                                    <div className="col-12 col-md-8 mb-3">
                                        <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                            Además de ti y tus padres, ¿Cuántas personas dependen económicamente de tu ingreso familiar ?
                                        </label>
                                        <div className="col-md-4 mt-2"
                                        >
                                            <input
                                                type="number"
                                                className="form-control col-md-4"
                                                placeholder=""
                                                value={formData}
                                                onChange={(e) => setFormData(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                        Personas que dependen económicamente:
                                    </label>
                                    <div className="col-md-4 mt-2 mb-4"
                                    >
                                        <input
                                            type="number"
                                            className="form-control col-md-4"
                                            placeholder=""
                                            value={formData}
                                            onChange={(e) => setFormData(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12 col-md-12 tarjeta-border d-flex flex-column p-4 mb-4">
                                        <div className="row">
                                            {/* Escolaridad de padre */}
                                            <div className="col-12 col-md-3 mb-3">
                                                <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                    Nombre completo:
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder=""
                                                    value={formData}
                                                    onChange={(e) => setFormData(e.target.value)}
                                                />
                                            </div>

                                            {/* Escolaridad de madre */}
                                            <div className="col-12 col-md-2 mb-3">
                                                <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                    Edad:
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder=""
                                                    value={formData}
                                                    onChange={(e) => setFormData(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-12 col-md-2 mb-3">
                                                <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                    Parentesco:
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder=""
                                                    value={formData}
                                                    onChange={(e) => setFormData(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-12 col-md-2 mb-3">
                                                <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                    Grado de estudios:
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder=""
                                                    value={formData}
                                                    onChange={(e) => setFormData(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-12 col-md-3 mb-3">
                                                <label className="fs-5" style={{ color: 'var(--color-morado3)' }}>
                                                    Nombre de su institución:
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder=""
                                                    value={formData}
                                                    onChange={(e) => setFormData(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistroFamilia;
