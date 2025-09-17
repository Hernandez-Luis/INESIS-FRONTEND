export const mostrarSpinner = () => {
    const modalElement = document.getElementById('loadingModal');
    if (modalElement) {
        modalElement.classList.add('show');
        modalElement.style.display = 'block';

        const backdrop = document.createElement('div');
        backdrop.classList.add('modal-backdrop', 'fade', 'show');
        backdrop.id = 'custom-spinner-backdrop'; // para evitar duplicados
        if (!document.getElementById('custom-spinner-backdrop')) {
            document.body.appendChild(backdrop);
        }
    }
};

export const ocultarSpinner = () => {
    const modalElement = document.getElementById('loadingModal');
    if (modalElement) {
        modalElement.classList.remove('show');
        modalElement.style.display = 'none';
    }

    const backdrop = document.getElementById('custom-spinner-backdrop');
    if (backdrop) {
        backdrop.remove();
    }
};