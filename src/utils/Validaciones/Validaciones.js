export const soloLetras = (e) => {
    const regex = /^[A-Za-zÀ-ÿ\s,.]+$/;
    if (!regex.test(e.data)) {
      e.preventDefault();
    }
};

export const soloLetrasYNumeros = (e) => {
    const regex = /^[A-Za-z0-9À-ÿ\s,]+$/;
    if (!regex.test(e.data)) {
      e.preventDefault();
    }
};

export const soloCorreo = (e) => {
  const regexCaracteres = /^[A-Za-z0-9@._-]+$/;

  if (!e.data) return;

  if (!regexCaracteres.test(e.data)) {
    e.preventDefault();
    return;
  }

  const valorActual = e.target.value;
  const nuevoValor = valorActual + e.data;

  const partes = nuevoValor.split("@");

  if (partes.length > 2) {
    e.preventDefault();
    return;
  }

  if (nuevoValor.includes("..") || nuevoValor.startsWith(".") || nuevoValor.includes("@.")) {
    e.preventDefault();
    return;
  }

  if (partes[1] && partes[1].startsWith(".")) {
    e.preventDefault();
  }
};


export const soloCurp = (e) => {
    const key = e.data;
    const regex = /^[a-zA-Z0-9]$/; // Permite letras y números, sin acentos ni símbolos
  
    // Convertir a mayúsculas mientras se escribe
    if (key) {
      e.target.value = e.target.value.toUpperCase(); 
    }
  
    if (key && !regex.test(key)) {
      e.preventDefault();
    }
};

export const soloFormatoDirecciones = (e) => {
    const regex = /^[A-Za-z0-9\s#°.,/-]+$/;
    if (!regex.test(e.data)) {
      e.preventDefault();
    }
};

export const soloNumerosPositivos = (e) => {
    const regex = /^[0-9]+$/;
    if (!regex.test(e.data)) {
      e.preventDefault();
    }
};

export const soloNumerosPositivosConDosDecimales = (e) => {
    const input = e.target;
    const currentValue = input.value;
    const newChar = e.data ?? ''; // null en paste
    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;
  
    // En el caso de pegado
    if (e.type === 'paste') {
      const pastedData = (e.clipboardData || window.clipboardData).getData('text');
      const futureValue = currentValue.slice(0, selectionStart) + pastedData + currentValue.slice(selectionEnd);
      if (!/^\d*\.?\d{0,2}$/.test(futureValue)) {
        e.preventDefault();
      }
      return;
    }
  
    // En el caso de escritura
    const futureValue = currentValue.slice(0, selectionStart) + newChar + currentValue.slice(selectionEnd);
  
    if (!/^\d*\.?\d{0,2}$/.test(futureValue)) {
      e.preventDefault();
    }
};


export const limitarNumerico6Enteros2Decimales = (e) => {
    const value = e.target.value;

    // Regex: hasta 6 enteros y 2 decimales
    const regex = /^\d{0,6}(\.\d{0,2})?$/;

    if (!regex.test(value)) {
        e.target.value = value.slice(0, -1); // elimina último caracter inválido
    }
};

export const validarNumericoDecimal = (e) => {
    const value = e.target.value;
    const regex = /^\d{0,6}(\.\d{0,2})?$/;
    if (value === "" || regex.test(value)) {
        e.target.setCustomValidity("");
    } else {
        e.target.setCustomValidity("Solo se permiten hasta 6 enteros y 2 decimales.");
    }
};
