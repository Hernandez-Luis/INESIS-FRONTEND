import React from 'react'
import NavInesis from '../../components/NavInesis/NavInesis'
import MigasRecorrido from '../../components/MigasDePan/MigasRecorrido'

export const MisDatos = () => {

  const links = [
    { url: '/PrincipalAdmin', label: 'Inicio' },
    { url: '/PrincipalAdmin', label: 'Inicio' },
    { url: '/PrincipalAdmin', label: 'Inicio' }
  ];

  return (
    <div>
      
      <NavInesis></NavInesis>
      <MigasRecorrido items={links}></MigasRecorrido>

    </div>
  )
}
