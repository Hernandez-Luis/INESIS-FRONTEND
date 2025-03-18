import React, { useState } from 'react';
import NavInesis from '../../components/NavInesis/NavInesis';
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido';
import '../../styles/TarjetaEstilo/TarjetaEstilo.css';
import RegistroFamilia from '../MiFamiliaPage/components/RegistroFamilia'
import FooterInesis from '../../components/FooterInesis/FooterInesis';

const MiFamilia = () => {
    const links = [
        { url: '/PrincipalAdmin', label: 'Inicio' },
        { url: '/PrincipalAdmin', label: 'Solicitud' },
        { url: '/PrincipalAdmin', label: 'Inicio' }
    ];
    return(
        <div>
            <NavInesis />
            <MigasRecorrido items={links} />
            <div className='"mb-2 text-center'>
                <p className='fs-2' style={{ color: 'var(--color-morado2)', fontWeight: 'bolder' }}>Mi Familia</p>
            </div>
            <div>
                <RegistroFamilia></RegistroFamilia>
            </div>
            <FooterInesis />
        </div>
    );

};

export default MiFamilia;
