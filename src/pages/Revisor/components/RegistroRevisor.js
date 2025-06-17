import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import '../../Alumno/components/AdministrarAlumnos.css';
import '../components/AgregarRevisor.css'

import { useNavigate } from 'react-router-dom';
import ModalCambiarContraseña from '../../../components/CambiarContraseña/ModalCambiarContraseña';
import Swal from 'sweetalert2';

const RegistroRevisor = forwardRef((props, ref) => {

    const initialForm = {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        curp: '',
        correo: '',
        telefono: '',
        matricula: '',
        departamento: '',
        usuario: '',
        contrasena: ''
    };

    const [formValues, setFormValues] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [revisorId, setRevisorId] = useState(props.id || null);
    const [showModalCambiar, setShowModalCambiar] = useState(false);
    const esEdicion = !!props.revisor;
    const navigate = useNavigate();

    const validateAllFields = () => {
        const newErrors = {};
        Object.keys(formValues).forEach(key => {
            if (key !== 'grupo') { // Excluir campo no requerido
                const error = validateField(key, formValues[key]);
                if (error) newErrors[key] = error;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const mostrarAlerta = (config) => {
        Swal.fire({
            ...config,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: true,
            confirmButtonText: 'OK',
            didOpen: () => {
                const confirmButton = Swal.getConfirmButton();
                confirmButton.style.backgroundColor = '#28a745'; // Verde tipo Bootstrap
                confirmButton.style.color = 'white';
            },
        });
    };

    const validateField = (name, value) => {
        let error = '';
        const requiredFields = ['nombre', 'apellido', 'curp', 'correo', 'telefono', 'matricula', 'departamento'];

        // Validación de campos requeridos
        if (requiredFields.includes(name)) {
            if (typeof value === 'string') {
                if (!value.trim()) {
                    error = 'Este campo es obligatorio';
                }
            } else if (value === null || value === undefined || value === '') {
                error = 'Este campo es obligatorio';
            }
        }

        // Validaciones específicas
        switch (name) {
            case 'nombre':
            case 'apellido':
                if (typeof value === 'string' && value.length > 30)
                    error = 'Máximo 30 caracteres';
                break;

            case 'curp': {
                const curpRegex = /^[A-Z][AEIOU][A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9]\d$/;
                if (!curpRegex.test(value?.toUpperCase()))
                    error = 'Formato CURP inválido';
                break;
            }

            case 'correo':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    error = 'Correo electrónico inválido';
                break;

            case 'telefono':
                if (!/^\d{10}$/.test(value))
                    error = 'Debe contener 10 dígitos';
                break;

            case 'matricula':
                if (!/^\d{10}$/.test(value))
                    error = 'La matrícula debe contener exactamente 10 dígitos numéricos';
                break;
        }

        setErrors(prev => ({ ...prev, [name]: error }));
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        let processedValue = value;

        // Convertir a número los campos que lo requieren
        if (name === 'carrera' || name === 'semestre') {
            processedValue = value === '' ? '' : parseInt(value, 10);
        }

        setFormValues(prev => {
            let updatedForm = { ...prev, [name]: value };

            // Generar usuario automáticamente
            if (name === 'nombre' || name === 'apellidoPaterno') {
                const primerNombre = updatedForm.nombre.split(' ')[0] || '';
                const primerApellido = updatedForm.apellidoPaterno.split(' ')[0] || '';
                if (primerNombre && primerApellido) {
                    updatedForm.usuario = `${primerNombre.toLowerCase()}.${primerApellido.toLowerCase()}`;
                }
            }
            return updatedForm;
        });
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateAllFields()) {
            mostrarAlerta({
                icon: 'info',
                title: '¡Ups! Verifica los campos',
                text: 'Por favor verifica todos los campos'
            });
            return;
        }

    };



    return (
        <div className="mb-5" >
            <h2 className="size-font-title cardMenu-title m-5 text-center"> {props.revisor ? 'Editar Revisor' : 'Agregar Revisor'}</h2>


            <form className="agregar-alumno-container m-5" onSubmit={handleSubmit}>
                {/* Sección Datos Personales */}
                <section className="formulario-seccion formulario-seccion--datos-personales mb-2">
                    <h2 className="texto-morado2 mb-4">Datos personales</h2>
                    <div className="row g-4">
                        <div>
                            <label className="formulario-etiqueta">
                                Nombre(s) <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                className={`formulario-entrada ${errors.nombre ? 'is-invalid' : ''}`}
                                placeholder="Ingrese el nombre"
                                value={formValues.nombre}
                                onChange={handleChange}
                                maxLength={30}
                            />
                            {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                        </div>
                        <div className="col-md-6 dobleColumna">
                            <div>
                                <label className="formulario-etiqueta">
                                    Apellido Paterno <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="apellidoPaterno"
                                    className={`formulario-entrada ${errors.apellido ? 'is-invalid' : ''} dobleColumnaInput`}
                                    placeholder="Ingrese el apellido paterno"
                                    value={formValues.apellidoPaterno}
                                    onChange={handleChange}
                                    maxLength={30}
                                />
                                {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
                            </div>
                        </div>
                        <div className="col-md-6 dobleColumna">
                            <div>
                                <label className="formulario-etiqueta">
                                    Apellido Materno
                                </label>
                                <input
                                    type="text"
                                    name="apellidoMaterno"
                                    className={`formulario-entrada ${errors.apellido ? 'is-invalid' : ''}`}
                                    placeholder="Ingrese el apellido materno"
                                    value={formValues.apellidoMaterno}
                                    onChange={handleChange}
                                    maxLength={30}
                                />
                                {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
                            </div>
                        </div>

                        <div>
                            <label className="formulario-etiqueta">
                                CURP <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                name="curp"
                                className={`formulario-entrada ${errors.curp ? 'is-invalid' : ''}`}
                                placeholder="Ingrese la CURP"
                                value={formValues.curp}
                                onChange={handleChange}
                                maxLength={18}
                            />
                            {errors.curp && <div className="invalid-feedback">{errors.curp}</div>}
                        </div>

                        <div className="col-md-6">
                            <label className="formulario-etiqueta">
                                Correo electrónico <span className="text-danger">*</span>
                            </label>
                            <input
                                type="email"
                                name="correo"
                                className={`formulario-entrada ${errors.correo ? 'is-invalid' : ''}`}
                                placeholder="Ingrese el correo"
                                value={formValues.correo}
                                onChange={handleChange}
                            />
                            {errors.correo && <div className="invalid-feedback">{errors.correo}</div>}
                        </div>

                        <div className="col-md-6 dobleColumna">
                            <label className="formulario-etiqueta">
                                Teléfono <span className="text-danger">*</span>
                            </label>
                            <input
                                type="tel"
                                name="telefono"
                                className={`formulario-entrada ${errors.telefono ? 'is-invalid' : ''}`}
                                placeholder="Ingrese el teléfono"
                                value={formValues.telefono}
                                onChange={handleChange}
                                maxLength={10}
                            />
                            {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                        </div>
                    </div>
                </section>

                {/* Sección Datos Laborales */}
                <section className="formulario-seccion formulario-seccion--datos-academicos mb-2">
                    <h2 className="texto-morado2 mb-4">Datos laborales</h2>
                    <div className="row g-4">

                        <div className="col-md-6">
                            <label className="formulario-etiqueta">Departamento</label>
                            <input
                                type="text"
                                className="formulario-entrada"
                                placeholder="Ingrese su numero de empleado"
                                onChange={(e) => {
                                    const valor = e.target.value;
                                    const regex = /^[0-9]{0,2}$/; // Permite 0 a 2 dígitos numéricos
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="formulario-etiqueta">
                                Matrícula <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                name="matricula"
                                className={`formulario-entrada ${errors.matricula ? 'is-invalid' : ''}`}
                                placeholder="Ingrese la matrícula"
                                value={formValues.matricula}
                                maxLength={10}
                                onChange={handleChange}
                            />
                            {errors.matricula && <div className="invalid-feedback">{errors.matricula}</div>}
                        </div>
                        {/* Sección Datos de la Plataforma */}
                        <h2 className="texto-morado2">Datos de la plataforma</h2>
                        <p className="texto-pequeno">Estos datos se asignan automáticamente. </p>

                        <div className="col-md-6">
                            <label className="formulario-etiqueta">Usuario</label>
                            <input
                                type="text"
                                name="usuario"
                                className="formulario-entrada readonly-style2"
                                value={formValues.usuario}
                                readOnly
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="formulario-etiqueta">Contraseña</label>
                            {props.alumno ? (
                                <>
                                    <button
                                        type="button"
                                        className="btn-cambiar-pass w-100"
                                        onClick={() => setShowModalCambiar(true)}
                                    >
                                        <span className="btn-cambiar-pass-decor" />
                                        <span className="btn-cambiar-pass-content">
                                            <span className="btn-cambiar-pass-icon">
                                                <i className="bi bi-key"></i>
                                            </span>
                                            <span className="btn-cambiar-pass-text">Cambiar contraseña</span>
                                        </span>
                                    </button>
                                    <ModalCambiarContraseña
                                        show={showModalCambiar}
                                        handleClose={() => setShowModalCambiar(false)}
                                        requireCurrentPassword={false}
                                    />
                                </>
                            ) : (
                                <input
                                    type="text"
                                    name="contrasena"
                                    className="formulario-entrada readonly-style2"
                                    value={formValues.contrasena}
                                    readOnly
                                />
                            )}
                        </div>
                        <div className="d-flex justify-content-center gap-3">
                            <button type="submit" className="btn-agregar">
                                {props.alumno ? 'Editar Revisor' : 'Agregar Revisor'}
                            </button>
                        </div>
                    </div>
                </section>
            </form>
        </div>
    );
});

export default RegistroRevisor;
