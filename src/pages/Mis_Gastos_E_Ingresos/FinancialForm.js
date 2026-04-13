import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RecibosDeLuz from '../../components/ReciboLuz/RecibosDeLuz';
import axiosInstance from '../../api/axiosConfig';
import Swal from "sweetalert2";
import CatParentescoService from '../../services/CatParentescoService';
import GastosIngresosService from '../../services/GastosIngresosService';
import { useNavigate } from "react-router-dom";
import AlumnoService from "../../services/AlumnoService";
import { soloLetras, soloLetrasYNumeros, validarNumero6Enteros2Decimales, validarNumericoDecimal } from "../../utils/Validaciones/Validaciones";
import { mostrarSpinner, ocultarSpinner } from "../../utils/spinerCarga/ModalSpiner";



const FinancialForm = () => {
    const [numPeople, setNumPeople] = useState(1);
    const [peopleData, setPeopleData] = useState([]);
    const [emptyFields, setEmptyFields] = useState([]);
    const [error, setError] = useState(""); // Para manejar el mensaje de error
    const [reciboFile, setReciboFile] = useState(null);
    const [observaciones, setObservaciones] = useState("");


    const [parentescos, setParentescos] = useState([]);
    const [ingresoTotal, setIngresoTotal] = useState(0);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [catParentesco, setParentesco] = useState([]);
    const [desigualdadMensaje, setDesigualdadMensaje] = useState("");
    const [fechaMensaje, setfechaMensaje] = useState("");

    const navigate = useNavigate(); //

    // Estado para almacenar los datos del alumno
    const [alumnoData, setAlumnoData] = useState(null);
    const [domicilioRecibo, setDomicilioRecibo] = useState("");

    const [periodoInicioMes, setPeriodoInicioMes] = useState("");
    const [periodoInicioAnio, setPeriodoInicioAnio] = useState("");

    const [periodoFinMes, setPeriodoFinMes] = useState("");
    const [periodoFinAnio, setPeriodoFinAnio] = useState("");

    const meses = [
        { value: "01", label: "Enero" },
        { value: "02", label: "Febrero" },
        { value: "03", label: "Marzo" },
        { value: "04", label: "Abril" },
        { value: "05", label: "Mayo" },
        { value: "06", label: "Junio" },
        { value: "07", label: "Julio" },
        { value: "08", label: "Agosto" },
        { value: "09", label: "Septiembre" },
        { value: "10", label: "Octubre" },
        { value: "11", label: "Noviembre" },
        { value: "12", label: "Diciembre" }
    ];

    const validarPeriodo = () => {
        const inicio = document.getElementById("periodoInicio")?.value;
        const fin = document.getElementById("periodoFin")?.value;

        if (inicio && fin) {
            const fechaInicio = new Date(inicio + "-01");
            const fechaFin = new Date(fin + "-01");

            if (fechaInicio >= fechaFin) {
                setfechaMensaje(prev => {
                    if (prev && !prev.includes("periodo")) return prev;
                    return "⚠️ El periodo de inicio debe ser menor al de fin.";
                });
            } else {
                if (fechaMensaje?.includes("periodo")) {
                    setfechaMensaje("");
                }
            }
        }
    };

    const handleChangePersona = (e, index, field) => {
        const newPeopleData = [...peopleData];
        if (!newPeopleData[index]) newPeopleData[index] = {};

        let value = e.target.value;

        // 🔥 SOLO para campos numéricos
        if (field === "gross" || field === "net") {
            // Aplicar tu validador centralizado
            e.target.value = value;
            validarNumero6Enteros2Decimales(e);
            value = e.target.value;
        }

        newPeopleData[index][field] = value;
        setPeopleData(newPeopleData);

        // 🔥 Mantienes tu lógica intacta
        if (field === "gross" || field === "net") {
            actualizarIngresoTotal(newPeopleData);
        }
    };

    const currentYear = new Date().getFullYear();

    const anios = [
        currentYear - 1,
        currentYear,
        currentYear + 1
    ];


    useEffect(() => {
    if (periodoInicioAnio && !anios.includes(Number(periodoInicioAnio))) {
        setPeriodoInicioAnio("");
    }

    if (periodoFinAnio && !anios.includes(Number(periodoFinAnio))) {
        setPeriodoFinAnio("");
    }
}, [anios]);

    const actualizarPeriodoInicio = (mes, anio) => {
        if (mes && anio) {
            document.getElementById("periodoInicio").value = `${anio}-${mes}`;
            validarPeriodo(); // 🔥
        }
    };

    const actualizarPeriodoFin = (mes, anio) => {
        if (mes && anio) {
            document.getElementById("periodoFin").value = `${anio}-${mes}`;
            validarPeriodo(); // 🔥
        }
    };



    useEffect(() => {
        obtenerParentesco();
    }, []);

    const cargarDatosAlumno = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            if (!usuario || !usuario.alumnoId) {
                console.error('No se encontró información del alumno en localStorage');
                return;
            }

            const response = await AlumnoService.getById(usuario.alumnoId);
            verificarFechas(response?.fechaRegistrada) ? setBtnDisabled(false) : setBtnDisabled(true);
            setAlumnoData(response);

            // Si existen datos de gastos e ingresos, precargarlos
            if (response.gastosIngresosFamiliares) {
                precargarDatosFormulario(response.gastosIngresosFamiliares);
            }

        } catch (error) {
            console.error('Error al cargar datos del alumno:', error);
        }
    };

    const verificarFechas = (fechaData) => {
        if (!fechaData.active) return false;
        const today = new Date();
        const fechaInicio = new Date(fechaData.fechaInicio);
        const fechaFin = new Date(fechaData.fechaFin);

        today.setHours(0, 0, 0, 0);
        fechaInicio.setHours(0, 0, 0, 0);
        fechaFin.setHours(0, 0, 0, 0);

        return today >= fechaInicio && today <= fechaFin;
    };

    // Función para precargar los datos del formulario
    const precargarDatosFormulario = (gastosIngresos) => {
        // Precargar número de personas que aportan
        if (gastosIngresos.nummeroPersonasAportan) {
            setNumPeople(gastosIngresos.nummeroPersonasAportan);

            // Precargar datos de las personas que aportan
            if (gastosIngresos.ingresosFamiliar && gastosIngresos.ingresosFamiliar.length > 0) {
                const peopleData = gastosIngresos.ingresosFamiliar.map(persona => ({
                    name: persona.nombrePersona || "",
                    relationship: persona.parentesco?.id || "",
                    company: persona.lugarTrabajo || "",
                    job: persona.puestoTrabajo || "",
                    gross: persona.ingresoBruto || 0,
                    net: persona.ingresoNeto || 0,
                }));
                setPeopleData(peopleData);
            }
        }

        // Precargar ingreso total y personas dependientes
        setIngresoTotal(gastosIngresos.ingresoTotal || 0);

        // Usar setTimeout para asegurarse de que los elementos DOM existen
        setTimeout(() => {
            // Precargar personas dependientes
            const personasDependen = document.getElementById("personasDependenIngreso");
            if (personasDependen) personasDependen.value = gastosIngresos.numeroPersonasDependen || 0;

            // Precargar gastos
            if (gastosIngresos.gastoFamiliarModel) {
                const gastos = gastosIngresos.gastoFamiliarModel;
                const campos = [
                    { id: "Alimentación", valor: gastos.gastoAlimentacion },
                    { id: "Renta", valor: gastos.gastoRenta },
                    { id: "Servicios", valor: gastos.gastoServicios },
                    { id: "Gastos escolares", valor: gastos.gastoEscolares },
                    { id: "Ropa", valor: gastos.gastoRopa },
                    { id: "Transporte", valor: gastos.gastoTransporte },
                    { id: "Otros", valor: gastos.gastoOtros },
                    { id: "totalGastos", valor: gastos.totalGastos }
                ];

                campos.forEach(campo => {
                    const elemento = document.getElementById(campo.id);
                    if (elemento) elemento.value = campo.valor || 0;
                });

                // Actualizar el total de gastos después de cargar los datos
                setTimeout(() => {
                    actualizarTotalGastos();
                }, 50);
            }

            // Precargar recibo de luz
            if (gastosIngresos.reciboLuzModel) {


                const recibo = gastosIngresos.reciboLuzModel;
                const campos = [
                    { id: "lightName", valor: recibo.titular },
                    { id: "periodoInicio", valor: recibo.periodoInicio },
                    { id: "periodoFin", valor: recibo.periodoFin },
                    { id: "ultimoPago", valor: recibo.ultimoPago },
                    { id: "promedioPago", valor: recibo.promedioPago }
                ];

                setDomicilioRecibo(recibo.domicilio || "");


                campos.forEach(campo => {
                    const elemento = document.getElementById(campo.id);
                    if (elemento) elemento.value = campo.valor || "";
                });

                // Establecer observaciones
                setObservaciones(recibo.observaciones || "");
                setDomicilioRecibo(recibo.domicilio || "");

            }



        }, 500); // Pequeño retraso para asegurar que los elementos existen
    };

    useEffect(() => {
        cargarDatosAlumno();
    }, []);

    const fieldNames = {
        lightName: "Nombre del titular del recibo de luz",
        periodoInicio: "Periodo de inicio",
        periodoFin: "Periodo de fin",
        ultimoPago: "Último pago",
        promedioPago: "Promedio de pago",

        'Alimentación': "Alimentación",
        'Renta': "Renta",
        'Servicios': "Servicios",
        'Gastos escolares': "Gastos escolares",
        'Ropa': "Ropa",
        'Transporte': "Transporte",
        'Otros': "Otros",
        'totalGastos': "Total de gastos",

        'ingresoTotal': "Ingreso total",
        'personasDependenIngreso': "Número de personas que dependen del ingreso"
    };


    const handleNumPeopleChange = (e) => {
        const value = e.target.value;
        if (/^[1-9]$|^1[0-9]$|^20$/.test(value)) {
            const newNumPeople = parseInt(value, 10);
            setNumPeople(newNumPeople);

            // Conservar los datos existentes si el nuevo número es mayor
            if (newNumPeople > peopleData.length) {
                const newPeopleData = [...peopleData];
                // Añadir nuevas personas con objetos vacíos
                for (let i = peopleData.length; i < newNumPeople; i++) {
                    newPeopleData.push({
                        name: "",
                        relationship: "",
                        company: "",
                        job: "",
                        gross: "",
                        net: ""
                    });
                }
                setPeopleData(newPeopleData);
            } else if (newNumPeople < peopleData.length) {
                // Si el nuevo número es menor, truncar el array
                setPeopleData(peopleData.slice(0, newNumPeople));
            }
        } else if (value === "") {
            setNumPeople("");
            setPeopleData([]);
        }
    };


    useEffect(() => {
        const fetchParentescos = async () => {
            try {
                const data = await CatParentescoService.getAll();
                setParentescos(data);
            } catch (error) {
                console.error("Error al cargar parentescos:", error);
            }
        };
        fetchParentescos();
    }, []);

    useEffect(() => {
        // Actualizar el total basado en los datos del estado en lugar del DOM
        let totalNeto = 0;
        let totalBruto = 0;

        for (let i = 0; i < peopleData.length; i++) {
            const neto = parseFloat(peopleData[i]?.net || "0");
            const bruto = parseFloat(peopleData[i]?.gross || "0");

            if (!isNaN(neto)) {
                totalNeto += neto;
            }
            if (!isNaN(bruto)) {
                totalBruto += bruto;
            }
        }

        setIngresoTotal(totalNeto);

        // Actualizar también el campo de total bruto
        setTimeout(() => {
            const inputBruto = document.getElementById("ingresoBrutoTotal");
            if (inputBruto) {
                inputBruto.value = totalBruto.toFixed(2);
            }
        }, 0);
    }, [peopleData, numPeople]);




    const validateForm = () => {

        const inicio = document.getElementById("periodoInicio")?.value;
        const fin = document.getElementById("periodoFin")?.value;

        if (inicio && fin) {
            const fechaInicio = new Date(inicio + "-01");
            const fechaFin = new Date(fin + "-01");

            if (fechaInicio >= fechaFin) {
                mostrarCuidado("El periodo de inicio debe ser menor al periodo de fin.");
                return;
            }
        }

        let isValid = true;
        const newEmptyFields = [];

        // Validación de campos de personas
        [...Array(numPeople)].forEach((_, index) => {
            const fields = [
                `person-${index}-nombrecompleto`,
                `person-${index}-parentesco`,
                `person-${index}-empresaolugardetrabajo`,
                `person-${index}-puestootipodetrabajo`,
                `person-${index}-imbbruto`,
                `person-${index}-imnneto`
            ];
            fields.forEach((fieldId) => {
                const value = document.getElementById(fieldId)?.value;
                if (!value || value.trim() === "") {
                    isValid = false;
                    newEmptyFields.push(fieldId);
                }
            });
        });

        // Recibo de luz
        ["lightName", "periodoInicio", "periodoFin", "ultimoPago", "promedioPago", "domicilioRecibo"].forEach((field) => {
            const input = document.getElementById(field);
            const value = input?.value;

            if (input?.type === "number") {
                if (value === "" || isNaN(parseFloat(value))) {
                    isValid = false;
                    newEmptyFields.push(field);
                }
            } else {
                if (!value || value.trim() === "") {
                    isValid = false;
                    newEmptyFields.push(field);
                }
            }
        });


        // Gastos
        const gastoFields = ['Alimentación', 'Renta', 'Servicios', 'Gastos escolares', 'Ropa', 'Transporte', 'Otros', 'totalGastos'];
        gastoFields.forEach((field) => {
            const value = document.getElementById(field)?.value;
            if (!value || value.trim() === "" || isNaN(value)) {
                isValid = false;
                newEmptyFields.push(field);
            }
        });

        // Ingresos mensuales: Validar "Ingreso total" y "¿Cuántas personas dependen?"
        const ingresosFields = ['ingresoTotal', 'personasDependenIngreso'];
        ingresosFields.forEach((field) => {
            const value = document.getElementById(field)?.value;
            if (!value || value.trim() === "") {
                isValid = false;
                newEmptyFields.push(field);
            }
        });

        setEmptyFields(newEmptyFields);


        if (!isValid) {
            mostrarModalCamposIncompletos(newEmptyFields);
        } else {
            setError("");
        }


        return isValid;

    };

    const obtenerParentesco = async () => {
        try {
            let catParentesco = await CatParentescoService.getAll();
            setParentesco(catParentesco)
        } catch (error) {
            console.error("Error al obtener la lista de CatParentesco: ", error)

        }
    }

    const convertirArchivoABase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };


    const mostrarModalCamposIncompletos = (camposFaltantes) => {
        const etiquetasPersonas = {
            nombrecompleto: "Nombre completo",
            parentesco: "Parentesco",
            empresaolugardetrabajo: "Lugar de trabajo",
            puestootipodetrabajo: "Puesto de trabajo",
            imbbruto: "Ingreso bruto",
            imnneto: "Ingreso neto"
        };

        const agrupados = {};
        const camposSimples = [];

        camposFaltantes.forEach((campo) => {
            const match = campo.match(/^person-(\d+)-(.+)$/);
            if (match) {
                const index = parseInt(match[1]) + 1;
                const tipo = match[2];
                const etiqueta = etiquetasPersonas[tipo];

                if (etiqueta) {
                    if (!agrupados[etiqueta]) agrupados[etiqueta] = [];
                    agrupados[etiqueta].push(index);
                } else {
                    camposSimples.push(campo);
                }
            } else {
                camposSimples.push(campo);
            }
        });

        let mensaje = "<ul style='text-align: left;'>";
        Object.entries(agrupados).forEach(([campo, indices]) => {
            mensaje += `<li><strong>${campo}</strong> de persona(s): ${indices.join(", ")}</li>`;
        });
        camposSimples.forEach((campo) => {
            mensaje += `<li><strong>${fieldNames[campo] || campo}</strong></li>`;
        });
        mensaje += "</ul>";

        Swal.fire({
            title: "Campos incompletos",
            html: `Por favor completa los siguientes campos obligatorios:${mensaje}`,
            icon: "warning",
            confirmButtonText: "Entendido",
            width: "600px"
        });
    };





    const handleSave = async () => {
        const isFormValid = validateForm();
        if (!isFormValid) return;
        // NUEVA VALIDACIÓN BLOQUEANTE
        if (!ingresosYGastosCoinciden()) {
            Swal.fire({
                title: "Ingresos y gastos no coinciden",
                text: "El total de gastos debe ser igual al ingreso total antes de guardar.",
                icon: "warning",
                confirmButtonText: "Entendido"
            });
            return; // BLOQUEA EL GUARDADO
        }

        try {
            mostrarSpinner();
            // Obtener datos de las personas que aportan
            const personasAportan = parseInt(document.getElementById("personasAportan")?.value || "0");
            const people = [...Array(numPeople)].map((_, index) => ({
                name: document.getElementById(`person-${index}-nombrecompleto`)?.value || "",
                relationship: document.getElementById(`person-${index}-parentesco`)?.value || "",
                company: document.getElementById(`person-${index}-empresaolugardetrabajo`)?.value || "",
                job: document.getElementById(`person-${index}-puestootipodetrabajo`)?.value || "",
                gross: parseFloat(document.getElementById(`person-${index}-imbbruto`)?.value || "0"),
                net: parseFloat(document.getElementById(`person-${index}-imnneto`)?.value || "0"),
            }));

            // Ingreso total y personas que dependen
            const ingresoBrutoTotal = parseFloat(document.getElementById("ingresoBrutoTotal")?.value || "0");
            const ingresoTotal = parseFloat(document.getElementById("ingresoTotal")?.value || "0");
            const personasDependen = parseInt(document.getElementById("personasDependenIngreso")?.value || "0");

            if (isNaN(ingresoTotal) || isNaN(personasDependen)) {
                alert("Revisa los campos numéricos. Hay valores inválidos.");
                return;
            }

            // Obtener gastos mensuales
            // Obtener gastos mensuales con nombres originales
            const gastosOriginales = ['Alimentación', 'Renta', 'Servicios', 'Gastos escolares', 'Ropa', 'Transporte', 'Otros'].reduce((acc, label) => {
                acc[label] = parseFloat(document.getElementById(label)?.value || "0");
                return acc;
            }, {});
            gastosOriginales.total = parseFloat(document.getElementById("totalGastos")?.value || "0");

            // Transformar nombres para el backend
            const gastos = {
                gastoAlimentacion: gastosOriginales["Alimentación"],
                gastoRenta: gastosOriginales["Renta"],
                gastoServicios: gastosOriginales["Servicios"],
                gastoEscolares: gastosOriginales["Gastos escolares"],
                gastoRopa: gastosOriginales["Ropa"],
                gastoTransporte: gastosOriginales["Transporte"],
                gastoOtros: gastosOriginales["Otros"],
                totalGastos: gastosOriginales.total
            };

            // Recibo de luz
            const reciboLuz = {
                titular: document.getElementById("lightName")?.value || "",
                periodoInicio: document.getElementById("periodoInicio")?.value || "",
                periodoFin: document.getElementById("periodoFin")?.value || "",
                domicilio: domicilioRecibo,

                ultimoPago: parseFloat(document.getElementById("ultimoPago")?.value || "0"),
                promedioPago: parseFloat(document.getElementById("promedioPago")?.value || "0"),

                observaciones: observaciones || "",
                //contenidoBase64: "",
                nombreOriginal: reciboFile?.name || "",
                nombreArchivo: "ReciboLuzAlumno"

            };

            // Convertir archivo a base64 si existe
            if (reciboFile) {
                const maxSizeInBytes = 10 * 1024 * 1024; // 10MB

                if (reciboFile.size > maxSizeInBytes) {
                    mostrarCuidado('El archivo del recibo de luz excede el tamaño máximo permitido de 10MB.');
                    return;
                }

                const base64Completo = await convertirArchivoABase64(reciboFile);
                reciboLuz.contenidoBase64 = base64Completo.split(",")[1]; // quitar metadata si aplica
            }


            // Armar payload
            const payload = {
                alumnoId: JSON.parse(localStorage.getItem('usuario')).alumnoId,
                personasAportan: personasAportan,
                personas: people,
                ingresoTotal,
                ingresoBrutoTotal,
                personasDependen,
                reciboLuz,
                gastos,
            };


            let response;

            if (alumnoData?.gastosIngresosFamiliares?.id) {
                // Actualizar datos existentes
                response = await GastosIngresosService.update(
                    alumnoData.gastosIngresosFamiliares.id,
                    payload
                );
                mostrarExito("Datos actualizados correctamente");
            } else {
                // Crear nuevos datos
                response = await GastosIngresosService.create(payload);
                mostrarExito("Datos guardados correctamente");
            }

        } catch (error) {
            const mensaje = error.message || error.toString();
            console.error("Error al guardar:", error);
            if (mensaje.includes('periodo de registro')) {
                mostrarInformacion(error);
                return;
            }
            mostrarError(error);
        } finally {
            ocultarSpinner();
        }
    };




    const cardStyle = {
        backgroundColor: "#F5F5F5",
        borderRadius: "1rem",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.4)"
    };


    const actualizarIngresoTotal = (peopleArray) => {
        let totalBruto = 0;
        let totalNeto = 0;

        for (let i = 0; i < peopleArray.length; i++) {
            const bruto = parseFloat(peopleArray[i]?.gross || "0");
            const neto = parseFloat(peopleArray[i]?.net || "0");

            totalBruto += isNaN(bruto) ? 0 : bruto;
            totalNeto += isNaN(neto) ? 0 : neto;
        }

        // Actualizar los campos calculados directamente sin usar setTimeout
        setTimeout(() => {
            const inputBruto = document.getElementById("ingresoBrutoTotal");
            if (inputBruto) inputBruto.value = totalBruto.toFixed(2);

            setIngresoTotal(totalNeto);
        }, 0);
    };



    const actualizarTotalGastos = () => {
        const gastoLabels = ['Alimentación', 'Renta', 'Servicios', 'Gastos escolares', 'Ropa', 'Transporte', 'Otros'];
        let total = 0;
        gastoLabels.forEach(label => {
            const val = parseFloat(document.getElementById(label)?.value || "0");
            total += isNaN(val) ? 0 : val;
        });
        const input = document.getElementById("totalGastos");
        if (input) input.value = total.toFixed(2);
    };


    // Funciones de alerta
    const mostrarAlerta = (config) => {
        return Swal.fire({
            ...config,
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
                const confirmButton = Swal.getConfirmButton();
                //confirmButton.style.backgroundColor = 'var(--color-verde)';
            },
        });
    };

    const mostrarError = (mensajeHTML) => {
        mostrarAlerta({
            title: 'Error',
            html: mensajeHTML,
            icon: 'error',
            confirmButtonText: 'Aceptar',
        });
    };

    const mostrarCuidado = (mensaje) => {
        mostrarAlerta({
            title: '¡Alerta!',
            text: mensaje,
            icon: 'warning',
            confirmButtonText: 'Aceptar',
        });
    };

    const mostrarExito = (mensaje) => {
        mostrarAlerta({
            title: 'Éxito',
            text: mensaje,
            icon: 'success',
            confirmButtonText: 'Aceptar',
        }).then(() => {
            navigate('/menuSolicitar')
        });
    };

    const mostrarInformacion = (mensaje) => {
        mostrarAlerta({
            title: 'Periodo de registro cerrado',
            text: mensaje,
            icon: 'info',
            confirmButtonText: 'Entendido',
        });
    };

    const ingresosYGastosCoinciden = () => {
        const ingreso = parseFloat(document.getElementById("ingresoTotal")?.value || "0");
        const gastos = parseFloat(document.getElementById("totalGastos")?.value || "0");

        return Math.abs(ingreso - gastos) <= 0.01;
    };



    return (
        <Container className="mt-3" style={{ maxWidth: "1700px" }}>
            {/* Ingresos Mensuales */}
            <Card className="p-4 mb-5" style={cardStyle}>
                <h3 style={{ color: "#4F46E5" }}>Ingresos mensuales</h3>
                <Form>
                    <Form.Group>
                        <Form.Label style={{ color: "#4F46E5" }}>¿Cuántas personas aportan al gasto familiar? <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            id="personasAportan"
                            style={{ maxWidth: "350px" }}
                            type="number"
                            onInput={validarNumericoDecimal}
                            placeholder="Número de personas"
                            value={numPeople}
                            onChange={handleNumPeopleChange}
                        />
                    </Form.Group>
                    <h4 className="mt-4" style={{ color: "#4F46E5" }}>Personas que aportan al gasto familiar:</h4>
                    {[...Array(numPeople)].map((_, index) => (
                        <Row key={index} className="mb-2 d-flex align-items-stretch" style={{ paddingTop: "4px" }}>
                            {[
                                { label: "Nombre completo ", labelJSX: <>Nombre completo <span style={{ color: 'red' }}>*</span></>, placeholder: "Nombre completo", type: "text", field: "name" },
                                { label: "Empresa o lugar de trabajo", labelJSX: <>Empresa o lugar de trabajo <span style={{ color: 'red' }}>*</span></>, placeholder: "Empresa o lugar de trabajo", type: "text", field: "company" },
                                { label: "Puesto o tipo de trabajo", labelJSX: <>Puesto o tipo de trabajo <span style={{ color: 'red' }}>*</span></>, placeholder: "Puesto o tipo de trabajo", type: "text", field: "job" },
                                { label: "IMB (Bruto)", labelJSX: <>IMB (Bruto) <span style={{ color: 'red' }}>*</span></>, placeholder: "IMB (Bruto)", type: "text", field: "gross" },
                                { label: "IMN (Neto)", labelJSX: <>IMN (Neto) <span style={{ color: 'red' }}>*</span></>, placeholder: "IMN (Neto)", type: "text", field: "net" }
                            ].map((field, idx) => {
                                // Insertar el campo "Parentesco" después de "Nombre completo"
                                if (idx === 1) {
                                    return (
                                        <React.Fragment key={idx}>
                                            {/* Campo Parentesco */}
                                            <Col className="d-flex">
                                                <Form.Group className="p-3 border rounded flex-fill d-flex flex-column justify-content-between" style={{ backgroundColor: "#F5F5F5" }}>
                                                    <Form.Label style={{ fontSize: "18px", color: "#4F46E5" }}>Parentesco <span style={{ color: 'red' }}>*</span></Form.Label>
                                                    <Form.Select
                                                        id={`person-${index}-parentesco`}
                                                        isInvalid={emptyFields.includes(`person-${index}-parentesco`)}
                                                        value={peopleData[index]?.relationship || ""}
                                                        onChange={(e) => {
                                                            const newPeopleData = [...peopleData];
                                                            if (!newPeopleData[index]) newPeopleData[index] = {};
                                                            newPeopleData[index].relationship = e.target.value;
                                                            setPeopleData(newPeopleData);
                                                        }}
                                                    >
                                                        <option value="" disabled>Selecciona un parentesco</option>
                                                        {catParentesco.map((item) => (
                                                            <option key={item.id} value={item.id}>
                                                                {item.nombreParentesco}
                                                            </option>
                                                        ))}
                                                    </Form.Select>

                                                </Form.Group>
                                            </Col>

                                            {/* Campo original (Empresa o lugar de trabajo) */}
                                            <Col className="d-flex">
                                                <div className="p-3 border rounded flex-fill d-flex flex-column justify-content-between" style={{ backgroundColor: "#F5F5F5" }}>
                                                    <label style={{ fontSize: "18px", color: "#4F46E5" }}>{field.labelJSX || field.label}</label>
                                                    <Form.Control
                                                        id={`person-${index}-${field.label.toLowerCase().replace(/ /g, '').replace(/[()]/g, '')}`}
                                                        type="text"
                                                        placeholder={field.placeholder}
                                                        isInvalid={emptyFields.includes(`person-${index}-${field.label.toLowerCase().replace(/ /g, '').replace(/[()]/g, '')}`)}
                                                        value={peopleData[index]?.[field.field] || ""}
                                                        onChange={(e) => handleChangePersona(e, index, field.field)}

                                                        onBeforeInput={
                                                            field.field === "name"
                                                                ? soloLetras
                                                                : field.field === "company" || field.field === "job"
                                                                    ? soloLetrasYNumeros
                                                                    : undefined
                                                        }
                                                        onInput={undefined}

                                                    />
                                                    {field.label === "IMB (Bruto)" && (
                                                        <small style={{ color: "#6B7280", marginTop: "4px" }}>
                                                            Ingreso mensual bruto: ingreso antes de deducciones.
                                                        </small>
                                                    )}
                                                    {field.label === "IMN (Neto)" && (
                                                        <small style={{ color: "#6B7280", marginTop: "4px" }}>
                                                            Ingreso mensual neto: ingreso disponible después de deducciones.
                                                        </small>
                                                    )}
                                                </div>
                                            </Col>

                                        </React.Fragment>
                                    );
                                }

                                // Campos normales (Nombre completo, Puesto, IMB, IMN)
                                return (
                                    <Col key={idx} className="d-flex">
                                        <div className="p-3 border rounded flex-fill d-flex flex-column justify-content-between" style={{ backgroundColor: "#F5F5F5" }}>
                                            <label style={{ fontSize: "18px", color: "#4F46E5" }}>{field.labelJSX || field.label}</label>
                                            <Form.Control
                                                id={`person-${index}-${field.label.toLowerCase().replace(/ /g, '').replace(/[()]/g, '')}`}
                                                type="text"
                                                placeholder={field.placeholder}
                                                isInvalid={emptyFields.includes(`person-${index}-${field.label.toLowerCase().replace(/ /g, '').replace(/[()]/g, '')}`)}
                                                value={peopleData[index]?.[field.field] || ""}
                                                onChange={(e) => handleChangePersona(e, index, field.field)}
                                                onBeforeInput={
                                                    field.field === "name"
                                                        ? soloLetras
                                                        : field.field === "company" || field.field === "job"
                                                            ? soloLetrasYNumeros
                                                            : undefined
                                                }
                                                onInput={undefined}
                                            />


                                            {field.label === "IMB (Bruto)" && (
                                                <small style={{ color: "#6B7280", marginTop: "4px" }}>
                                                    Ingreso mensual bruto: ingreso antes de deducciones.
                                                </small>
                                            )}
                                            {field.label === "IMN (Neto)" && (
                                                <small style={{ color: "#6B7280", marginTop: "4px" }}>
                                                    Ingreso mensual neto: ingreso disponible después de deducciones.
                                                </small>
                                            )}
                                        </div>
                                    </Col>
                                );

                            })}
                        </Row>
                    ))}




                    {/* Total ingreso bruto */}
                    <Form.Group className="mt-4 d-flex justify-content-end align-items-center">
                        <Form.Label style={{ color: "#4F46E5", maxWidth: "150px", marginRight: "10px" }}>Total ingreso bruto:</Form.Label>
                        <Form.Control
                            style={{ maxWidth: "200px" }}
                            type="number"
                            placeholder="$"
                            id="ingresoBrutoTotal"
                            readOnly
                            disabled
                        />
                    </Form.Group>

                    {/* Total ingreso neto (nombre actualizado) */}
                    <Form.Group className="mt-2 d-flex justify-content-end align-items-center">
                        <Form.Label style={{ color: "#4F46E5", maxWidth: "150px", marginRight: "10px" }}>Total ingreso neto:</Form.Label>
                        <Form.Control
                            style={{ maxWidth: "200px" }}
                            type="text"
                            inputMode="decimal"
                            placeholder="$"
                            id="ingresoTotal"
                            readOnly
                            value={ingresoTotal}
                            disabled
                            isInvalid={emptyFields.includes("ingresoTotal")}
                        />
                    </Form.Group>

                    <Form.Group style={{ color: "#4F46E5" }} className="mt-3">
                        <Form.Label>¿Cuántas personas dependen del ingreso mencionado? <span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            style={{ maxWidth: "400px" }}
                            type="number"
                            onInput={validarNumericoDecimal}
                            id="personasDependenIngreso"
                            isInvalid={emptyFields.includes("personasDependenIngreso")}
                        />
                    </Form.Group>
                </Form>
            </Card>

            <Row className="justify-content-center">
                {/* Recibo de luz */}
                <Col md={6} className="d-flex justify-content-center">
                    <Card className="p-5 mb-5 w-100" style={cardStyle}>
                        <h4 style={{ color: "#4F46E5" }}>Recibo de luz</h4>
                        <Form>
                            <Form.Group>
                                <Form.Label style={{ color: "#4F46E5" }}>Nombre del titular de los recibos de luz: <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    id="lightName"
                                    type="text"
                                    isInvalid={emptyFields.includes("lightName")}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{ color: "#4F46E5" }}>Domicilio que aparece en el recibo de luz: <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    id="domicilioRecibo"
                                    type="text"
                                    isInvalid={emptyFields.includes("domicilioRecibo")}
                                    value={domicilioRecibo}
                                    onChange={(e) => setDomicilioRecibo(e.target.value)}
                                />

                            </Form.Group>


                            <Form.Group>
                                <Form.Label style={{ color: "#4F46E5" }}>
                                    Periodo de inicio (mes): <span style={{ color: 'red' }}>*</span>
                                </Form.Label>

                                {/* SELECTS visibles */}
                                <Row>
                                    <Col>
                                        <Form.Select
                                            value={periodoInicioMes}
                                            onChange={(e) => {
                                                setPeriodoInicioMes(e.target.value);
                                                actualizarPeriodoInicio(e.target.value, periodoInicioAnio);
                                            }}
                                        >
                                            <option value="">Mes</option>
                                            {meses.map(m => (
                                                <option key={m.value} value={m.value}>{m.label}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>

                                    <Col>
                                        <Form.Select
                                            value={periodoInicioAnio}
                                            onChange={(e) => {
                                                setPeriodoInicioAnio(e.target.value);
                                                actualizarPeriodoInicio(periodoInicioMes, e.target.value);
                                            }}
                                        >
                                            <option value="">Año</option>
                                            {anios.map(a => (
                                                <option key={a} value={a}>{a}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                </Row>

                                {/* INPUT OCULTO (el que usa TODO tu sistema) */}
                                <Form.Control
                                    id="periodoInicio"
                                    type="month"
                                    style={{ display: "none" }}
                                    isInvalid={emptyFields.includes("periodoInicio")}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{ color: "#4F46E5" }}>
                                    Periodo de fin (mes): <span style={{ color: 'red' }}>*</span>
                                </Form.Label>

                                <Row>
                                    <Col>
                                        <Form.Select
                                            value={periodoFinMes}
                                            onChange={(e) => {
                                                setPeriodoFinMes(e.target.value);
                                                actualizarPeriodoFin(e.target.value, periodoFinAnio);
                                            }}
                                        >
                                            <option value="">Mes</option>
                                            {meses.map(m => (
                                                <option key={m.value} value={m.value}>{m.label}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>

                                    <Col>
                                        <Form.Select
                                            value={periodoFinAnio}
                                            onChange={(e) => {
                                                setPeriodoFinAnio(e.target.value);
                                                actualizarPeriodoFin(periodoFinMes, e.target.value);
                                            }}
                                        >
                                            <option value="">Año</option>
                                            {anios.map(a => (
                                                <option key={a} value={a}>{a}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                </Row>

                                {fechaMensaje && (
                                    <div style={{ color: "red", textAlign: "center", marginTop: "10px", fontWeight: "bold" }}>
                                        {fechaMensaje}
                                    </div>
                                )}

                                <Form.Control
                                    id="periodoFin"
                                    type="month"
                                    style={{ display: "none" }}
                                    isInvalid={emptyFields.includes("periodoFin")}
                                />
                            </Form.Group>



                            <Form.Group>
                                <Form.Label style={{ color: "#4F46E5" }}>Pago del último período: <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    id="ultimoPago"
                                    type="text"
                                    inputMode="decimal"
                                    onInput={validarNumero6Enteros2Decimales}
                                    isInvalid={emptyFields.includes("ultimoPago")}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{ color: "#4F46E5" }}>Pago mensual promedio: <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    id="promedioPago"
                                    type="text"
                                    inputMode="decimal"
                                    onInput={validarNumero6Enteros2Decimales}
                                    isInvalid={emptyFields.includes("promedioPago")}
                                />
                            </Form.Group>

                        </Form>
                        <RecibosDeLuz
                            onChangeFile={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const allowedTypes = [
                                        "application/pdf",
                                        "image/jpeg",
                                        "image/png"
                                    ];

                                    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB

                                    if (!allowedTypes.includes(file.type)) {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Archivo no permitido",
                                            text: "Solo se permiten archivos PDF o imágenes (JPG, PNG).",
                                            confirmButtonText: "Entendido",
                                            confirmButtonColor: "#6f42c1"
                                        });
                                        e.target.value = "";
                                        return;
                                    }
                                    if (file.size > maxSizeInBytes) {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Archivo demasiado grande",
                                            text: "El archivo no debe exceder los 10MB.",
                                            confirmButtonText: "Entendido",
                                            confirmButtonColor: "#6f42c1"
                                        });
                                        e.target.value = "";
                                        return;
                                    }
                                    setReciboFile(file);
                                }
                            }}
                            onChangeObservaciones={(text) => setObservaciones(text)}
                            observacionesIniciales={alumnoData?.gastosIngresosFamiliares?.reciboLuzModel?.observaciones || ""}
                            archivoExistente={alumnoData?.gastosIngresosFamiliares?.reciboLuzModel?.nombreOriginal || null}
                        />

                    </Card>
                </Col>


                {/* Gastos Mensuales */}
                <Col md={6} className="d-flex justify-content-center">
                    <Card className="p-5 mb-5 w-100" style={cardStyle}>
                        <h4 style={{ color: "#4F46E5" }}>Gastos mensuales</h4>
                        <Form id="gastosForm">
                            {['Alimentación', 'Renta', 'Servicios', 'Gastos escolares', 'Ropa', 'Transporte', 'Otros'].map((label, index) => (
                                <Form.Group key={index}>
                                    <Form.Label style={{ color: "#4F46E5" }}>{label}: <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Form.Control
                                        id={label}
                                        type="text"
                                        inputMode="decimal"
                                        onInput={validarNumero6Enteros2Decimales}

                                        isInvalid={emptyFields.includes(label)}
                                        onChange={actualizarTotalGastos}
                                    />

                                </Form.Group>
                            ))}
                            <Form.Group className="d-flex flex-column align-items-center mt-3" style={{ maxWidth: "200px", margin: "0 auto" }}>
                                <Form.Label style={{ color: "#4F46E5" }}>Gastos mensuales <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    id="totalGastos"
                                    type="text"
                                    inputMode="decimal"
                                    onInput={validarNumero6Enteros2Decimales}

                                    readOnly
                                    disabled
                                    placeholder="$"
                                    isInvalid={emptyFields.includes("totalGastos")}
                                />
                            </Form.Group>
                        </Form>
                    </Card>
                </Col>
            </Row>

            {/* Botón Guardar */}
            <div className="d-flex justify-content-center mb-3" style={{ padding: "50px" }}>
                <Button variant="btn btn-midDatos" onClick={handleSave} disabled={btnDisabled} >Guardar</Button>
                {/*                 {error && (
                    <div style={{ color: "red", textAlign: "center", whiteSpace: "pre-line" }}>
                        {error}
                    </div>
                )} */}
            </div>

        </Container>
    );
};

export default FinancialForm;
