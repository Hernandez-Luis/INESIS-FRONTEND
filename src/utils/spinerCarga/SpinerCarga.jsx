
export const SpinnerCarga = () => {
    return (
        <div
            className="modal fade"
            id="loadingModal"
            tabIndex="-1"
            aria-hidden="true"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            style={{ display: 'none' }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-transparent border-0 shadow-none text-center">
                    <div className="modal-body d-flex justify-content-center align-items-center">
                        <div
                            className="spinner-border text-primary"
                            style={{ width: '3rem', height: '3rem' }}
                            role="status"
                        >
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
