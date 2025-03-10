import React from 'react';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import FooterInesis from '../../components/FooterInesis/FooterInesis';
import RecibosDeLuz from '../../components/ReciboLuz/RecibosDeLuz';

export default function MisDocumentos() {
  const links = [
    { url: '/PrincipalAdmin', label: 'Inicio' },
    { url: '/PrincipalAdmin', label: 'Mis documentos' }
  ];

  return (
    <div>
      <NavInesis />
      <MigasRecorrido items={links} />

      {/* Contenedor con margen en los lados */}
      <div className='d-flex flex-column min-vh-100'>
        <div className='flex-grow-1'>
          <div style={{ margin: '0 50px', marginTop: '50px', marginBottom: '50px' }}>
            <h1 style={{ color: 'var(--color-morado1)', fontWeight: 'bold' }}>
              Mis documentos
            </h1>
            <br />

            <p style={{ color: 'var(--color-gris1)', textAlign: 'justify' }}>
              1. Comprobante de ingresos, estos pueden ser cualquiera de los siguientes documentos según sea el caso:<br />
              a) Constancia emitida por parte de la máxima autoridad de su comunidad (agente municipal, presidente municipal, síndico municipal, etc.). Esta debe contener el nombre del estudiante; el parentesco
              con el tutor, por ejemplo: hijo, sobrino o nieto; la ocupación del tutor, por ejemplo: campesino, carpintero, etc.; el ingreso mensual aproximado escrito con número y letra, por ejemplo: $2000.00 dos
              mil pesos, en este ingreso no se debe incluir lo que se recibe por parte de los apoyos gubernamentales externos, si es que se cuenta con ellos; la hoja debe ser membretada firmada y sellada por
              parte de la autoridad. Puedes descargar un ejemplo dando clic aquí.<br />
              b) Copia de los últimos recibos o talones de pago salarial correspondiente al último mes.<br />
              
              2. Copia de los últimos tres recibos de luz eléctrica correspondientes a los últimos seis meses.<br />
              
              3. Copia de los últimos recibos de agua correspondiente a los últimos seis meses, en caso de que se pague de forma anual, anexar el último recibo.<br />
             
              4. Comprobante de estudios de sus hermanos (as), estos pueden ser cualquiera de los siguientes documentos:<br />
              a) Copia de la credencial de estudiante.<br />
              b) Constancia de estudios emitida por la institución educativa.<br />
              c) Copia del certificado de terminación de estudios.<br />
              d) Copia del acta de nacimiento (en caso de tener hijos).<br />
              <br />
              5. En caso de tener hermanos (as) mayores de 18 años que no estudien ni trabajen anexar copia del acta de nacimiento o copia de la credencial de elector.<br />
              <br />
              6. En caso de que ser originario de la comunidad de la comunidad de Ixtlán de Juárez y además sea hijo o nieto de comunero ACTIVO, anexar constancia emitida por parte del comisariado de bienes
              comunales de Ixtlán de Juárez.
            </p>
          </div>

          <RecibosDeLuz />

          {/* Botón "Guardar" debajo del componente RecibosDeLuz */}
          <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '50px' }}>
            <button style={{
              backgroundColor: 'var(--color-morado1)',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}>
              Guardar
            </button>
          </div>

          <FooterInesis />
        </div>
      </div>
    </div>
  );
}
