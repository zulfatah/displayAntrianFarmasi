import { useState } from 'react';
import EditStatusModal from './EditStatusModal';

function EditStatusButton({ patient, updateStatus }) {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <button className="btn btn-outline-secondary" onClick={handleShow}>
                Edit Status
            </button>

            <EditStatusModal
                show={showModal}
                handleClose={handleClose}
                patient={patient}
                updateStatus={updateStatus}
            />
        </>
    );
}

export default EditStatusButton;
