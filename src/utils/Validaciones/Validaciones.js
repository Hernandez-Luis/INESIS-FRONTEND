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
    let value = e.target.value;

    value = value.replace(/\D/g, '');

    value = value.substring(0, 6);

    e.target.value = value;
};



export const validarNumero6Enteros2Decimales = (e) => {
    let value = e.target.value;

    // 🔥 Permitir solo números y punto
    value = value.replace(/[^0-9.]/g, '');

    // 🔥 Evitar más de un punto
    const firstDotIndex = value.indexOf('.');
    if (firstDotIndex !== -1) {
        // Mantener solo el primer punto
        value =
            value.substring(0, firstDotIndex + 1) +
            value.substring(firstDotIndex + 1).replace(/\./g, '');
    }

    // 🔥 Separar enteros y decimales
    let [enteros, decimales] = value.split('.');

    // 🔥 Limitar enteros a 6
    if (enteros) {
        enteros = enteros.substring(0, 6);
    }

    // 🔥 Si hay punto, respetarlo aunque no haya decimales aún
    if (value.includes('.')) {
        // Limitar decimales a 2
        decimales = decimales ? decimales.substring(0, 2) : '';

        value = `${enteros}.${decimales}`;
    } else {
        value = enteros;
    }

    e.target.value = value;
};