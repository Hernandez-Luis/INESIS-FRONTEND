import React from 'react'

export const CheckBox = ({opcion,id}) => {
    return (
        <div className='d-flex align-items-center'>
            <input style={{ width: '1.8em', height: '1.8em' }} class="form-check-input" type="checkbox" value="" id={id}></input>
            <label className='ms-2' style={{color:'var(--color-gris1)'}} htmlFor={id} class="form-check-label" for="flexCheckDefault">
                {opcion}
            </label>
        </div>
    )
}
