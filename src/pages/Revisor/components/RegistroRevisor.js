import React, { useState, useEffect, forwardRef } from 'react';
import '../../Alumno/components/AdministrarAlumnos.css';
import '../components/AgregarRevisor.css'
import revisorService from '../../../services/RevisorService';
import { useNavigate } from 'react-router-dom';
import ModalCambiarContraseña from '../../../components/CambiarContraseña/ModalCambiarContraseña';
import Swal from 'sweetalert2';
import UsuarioService from '../../../services/UsuarioService';

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
    const [showModalCambiar, setShowModalCambiar] = useState(false);
    const [evitarNavegacion, setEvitarNavegacion] = useState(false);
    const navigate = useNavigate();

    const esEdicion = !!props.revisor;

    // Cargar datos para edición
    useEffect(() => {
        const cargarDatosRevisor = async () => {
            if (esEdicion) {
                try {
                    const usuario = await UsuarioService.getByRevisorId(props.revisor.id);
                    const revisorEditar = {
                        nombre: props.revisor.nombre || '',
                        apellidoPaterno: props.revisor.apellidoPaterno || '',
                        apellidoMaterno: props.revisor.apellidoMaterno || '',
                        curp: props.revisor.curp || '',
                        correo: props.revisor.correo || '',
                        telefono: props.revisor.telefono || '',
                        departamento: props.revisor.departamento || '',
                        matricula: props.revisor.matricula || '',
                        usuario: usuario?.usuario || '',
                        contrasena: usuario?.contrasenia || ''
                    };
                    setFormValues(revisorEditar);
                } catch (error) {
                    console.error("Error al cargar usuario del revisor:", error);
                }
            }
        };
        cargarDatosRevisor();
    }, [esEdicion, props.revisor]);

    // Validar campos
    const validateField = (name, value) => {
        let error = '';
        const requiredFields = ['nombre', 'apellidoPaterno', 'curp', 'correo', 'telefono', 'matricula', 'departamento'];

        if (requiredFields.includes(name)) {
            if (typeof value === 'string') {
                if (!value.trim()) {
                    error = 'Este campo es obligatorio';
                }
            } else if (value === null || value === undefined || value === '') {
                error = 'Este campo es obligatorio';
            }
        }

        switch (name) {
            case 'nombre':
            case 'apellidoPaterno':
                if (typeof value === 'string' && value.length > 30) error = 'Máximo 30 caracteres';
                break;
            case 'curp': {
                const curpRegex = /^[A-Z][AEIOU][A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9]\d$/;
                if (!curpRegex.test(value?.toUpperCase())) error = 'Formato CURP inválido';
                break;
            }
            case 'correo':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Correo electrónico inválido';
                break;
            case 'telefono':
                if (!/^\d{10}$/.test(value)) error = 'Debe contener 10 dígitos';
                break;
            case 'matricula':
                if (!/^\d{10}$/.test(value)) error = 'La matrícula debe contener exactamente 10 dígitos numéricos';
                break;
        }

        setErrors(prev => ({ ...prev, [name]: error }));
        return error;
    };

    const validateAllFields = () => {
        const newErrors = {};
        Object.entries(formValues).forEach(([key, value]) => {
            const error = validateField(key, value);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Actualizar form y validar campo
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => {
            const updatedForm = { ...prev, [name]: value };

            // Generar usuario automáticamente si cambia nombre o apellido paterno
            if (name === 'nombre' || name === 'apellidoPaterno') {
                const primerNombre = updatedForm.nombre.trim().toLowerCase().split(' ')[0] || '';
                const primerApellido = updatedForm.apellidoPaterno.trim().toLowerCase().split(' ')[0] || '';
                if (primerNombre && primerApellido) {
                    updatedForm.usuario = `revisor@${primerNombre}${primerApellido}`;
                }
            }
            return updatedForm;
        });
        validateField(name, value);
    };

    // Actualizar contraseña solo si cambia matrícula en nuevo registro
    useEffect(() => {
        if (formValues.matricula && !esEdicion) {
            setFormValues(prev => ({
                ...prev,
                contrasena: prev.matricula
            }));
        }
    }, [formValues.matricula, esEdicion]);

    // Actualizar contraseña solo desde modal
    const actualizarContraseña = (nuevaContrasena) => {
        setFormValues(prev => ({
            ...prev,
            contrasena: nuevaContrasena
        }));
    };

    // Mostrar alertas con Swal
    const mostrarAlerta = (config) => {
        Swal.fire({
            ...config,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: true,
            confirmButtonText: 'OK',
            didOpen: () => {
                const confirmButton = Swal.getConfirmButton();
                confirmButton.style.backgroundColor = '#28a745';
                confirmButton.style.color = 'white';
            },
        });
    };

    // Enviar formulario (crear o actualizar revisor)
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

        if (!esEdicion) {
            try {
                const existe = await revisorService.checkIfExists(
                    formValues.curp,
                    formValues.matricula,
                    formValues.correo
                );
                if (existe) {
                    mostrarAlerta({
                        icon: 'info',
                        title: '¡Atención!',
                        text: 'Ya existe un revisor con la misma CURP, matrícula o correo.'
                    });
                    return;
                }
            } catch (error) {
                mostrarAlerta({
                    icon: 'error',
                    title: 'Error al verificar duplicados',
                    text: 'Ocurrió un problema al verificar los datos.'
                });
                return;
            }
        }

        try {
            const payload = {
                nombre: formValues.nombre.trim(),
                apellidoPaterno: formValues.apellidoPaterno.trim(),
                apellidoMaterno: formValues.apellidoMaterno.trim(),
                curp: formValues.curp.trim().toUpperCase(),
                correo: formValues.correo.trim(),
                telefono: formValues.telefono.trim(),
                departamento: formValues.departamento.trim(),
                matricula: formValues.matricula.trim(),
                usuario: formValues.usuario,
                contrasenia: formValues.contrasena,
                estatus: 1,
                idCatRol: 3
            };

            let response;
            if (esEdicion) {
                response = await revisorService.update(props.revisor.id, payload);
            } else {
                response = await revisorService.create(payload);
            }

            if ([200, 201, 204].includes(response.status)) {
                mostrarAlerta({
                    icon: 'success',
                    title: esEdicion ? 'Revisor actualizado' : 'Registro exitoso',
                    text: esEdicion
                        ? 'Los datos del revisor fueron actualizados correctamente.'
                        : 'Revisor registrado correctamente.'
                });
                setFormValues(initialForm);
                navigate('/AdministrarRevisor');
            } else {
                throw new Error('Error al guardar el revisor');
            }
        } catch (err) {
            console.error(err);
            mostrarAlerta({
                icon: 'error',
                title: 'Error al guardar',
                text: err.message || 'No se pudo completar la operación.'
            });
        }
    };

    return (
        <div className="mb-5">
            <h2 className="size-font-title cardMenu-title m-5 text-center">
                {esEdicion ? 'Editar Revisor' : 'Agregar Revisor'}
            </h2>
            <form className="agregar-alumno-container m-5" onSubmit={handleSubmit}>

                {/* Datos Personales */}
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
                                    className={`formulario-entrada ${errors.apellidoPaterno ? 'is-invalid' : ''} dobleColumnaInput`}
                                    placeholder="Ingrese el apellido paterno"
                                    value={formValues.apellidoPaterno}
                                    onChange={handleChange}
                                    maxLength={30}
                                />
                                {errors.apellidoPaterno && <div className="invalid-feedback">{errors.apellidoPaterno}</div>}
                            </div>
                        </div>

                        <div className="col-md-6 dobleColumna">
                            <div>
                                <label className="formulario-etiqueta">Apellido Materno</label>
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

                {/* Datos Laborales */}
                <section className="formulario-seccion formulario-seccion--datos-academicos mb-2">
                    <h2 className="texto-morado2 mb-4">Datos laborales</h2>
                    <div className="row g-4">

                        <div className="col-md-6">
                            <label className="formulario-etiqueta">
                                Departamento <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                name="departamento"
                                className={`formulario-entrada ${errors.departamento ? 'is-invalid' : ''}`}
                                placeholder="Ingrese el departamento"
                                maxLength={30}
                                value={formValues.departamento}
                                onChange={handleChange}
                            />
                            {errors.departamento && <div className="invalid-feedback">{errors.departamento}</div>}
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
                                maxLength={10}
                                value={formValues.matricula}
                                onChange={handleChange}
                            />
                            {errors.matricula && <div className="invalid-feedback">{errors.matricula}</div>}
                        </div>

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
                            {esEdicion ? (
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
                                {esEdicion ? 'Editar Revisor' : 'Agregar Revisor'}
                            </button>
                        </div>
                    </div>
                </section>
            </form>
            
            <ModalCambiarContraseña
                show={showModalCambiar}
                handleClose={() => setShowModalCambiar(false)}
                requireCurrentPassword={false}
                usuario={formValues.usuario}
                onContraseñaActualizada={actualizarContraseña}
            />
        </div>
    );
});

export default RegistroRevisor;
