import React from 'react'
import NavInesis from '../../components/NavInesis/NavInesis'
import imagenLineamientos  from '../../assets/LineamientosIMG.png'

export const LIneamientos = () => {
  return (
    <div className='d-flex flex-column min-vh-100'>
        <NavInesis />
        <section>
            <div className="container">
                <h1 className="fs-1 text-center mb-5" style={{color: 'var(--color-morado1)'}}>
                    Antes de solicitar tu beca ten en cuenta lo siguiente:
                </h1>
                <div className="mt-5">
                    <div className="row w-100">
                        <div className="col-lg-8  col-md-6">
                            <ol className="list-unstyled" style={{textAlign: 'justify'}}>
                                <li>
                                    <strong>1.</strong> El domicilio del solicitante es aquel en el que se le localiza durante el periodo de actividades escolares. Se deben especificar más referencias de ubicación si es necesario.
                                </li>
                                <br />
                                <li>
                                    <strong>2.</strong> Los datos solicitados del padre, madre, tutor o familiar más cercano, se refieren a la dirección de la persona de quien se depende económicamente, si éste es el caso, o de lo contrario, a la persona que se pueda localizar para aclaraciones.
                                </li>
                                <br />
                                <li>
                                    <strong>3.</strong> El reporte de Ingresos familiares deberá incluir TODAS las fuentes de ingreso familiar, y deberá acompañarse de comprobantes oficiales de Ingresos. En caso de no depender económicamente de otras personas, deberá presentarse comprobante oficial de Ingresos del alumno. Se deberán reportar el ingreso bruto, así como el ingreso neto.
                                </li>
                                <br />
                                <li>
                                    <strong>4.</strong> El recibo de consumo de electricidad deberá ser claro, correspondiente al semestre más reciente y deberá ser del domicilio del padre, madre o tutor. En el caso de no depender económicamente, deberán ser del domicilio del alumno.
                                </li>
                                <br />
                                <li>
                                    <strong>5.</strong> Los datos de los hermanos dependientes económicos se anexarán solamente para los casos en que el alumno dependa económicamente de su familia, y serán respaldados por una copia de las actas de nacimiento de cada uno. En el caso de las hijas o hijos mayores de 18 años se requiere también copia de un comprobante de estudios vigente.
                                </li>
                                <br />
                                <li>
                                    <strong>6.</strong> Las solicitudes deberán subirse a la aplicación web dentro de las fechas estipuladas. Bajo ninguna circunstancia se aceptarán solicitudes con documentación incompleta.
                                </li>
                                <br />
                                <li>
                                    <strong>7.</strong> Para aclaraciones y dudas favor de dirigirse al Departamento de Servicios Escolares o Jefatura de Carrera correspondiente.
                                </li>
                            </ol>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <img src={imagenLineamientos} className="rounded-circle img-fluid" alt="Lineamientos" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
