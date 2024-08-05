import { useState, useEffect } from 'react';
import AddPatientModal from './AddPatientModal';
import '../assets/style.css';


function AddPatientButton({ addPatient }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleShow();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <> 
                <svg onClick={handleShow} height="40" viewBox="0 0 64 64" width="40" xmlns="http://www.w3.org/2000/svg" id="fi_3357340"><g id="add-arrow-direction-button-pointer"><circle cx="32" cy="32" fill="#006df0" r="29"></circle><path d="m32 3a29 29 0 0 0 -20.506 49.506l41.012-41.012a28.909 28.909 0 0 0 -20.506-8.494z" fill="#2488ff"></path><path d="m45 28h-9v-9a4 4 0 0 0 -8 0v9h-9a4 4 0 0 0 0 8h9v9a4 4 0 0 0 8 0v-9h9a4 4 0 0 0 0-8z" fill="#ffcd00"></path><g fill="#f1f2f2"><path d="m30 8.079a1 1 0 0 1 -.078-2c.688-.051 1.388-.079 2.078-.079a1 1 0 0 1 0 2c-.638 0-1.284.025-1.921.076z"></path><path d="m7 33a1 1 0 0 1 -1-1 25.953 25.953 0 0 1 19.76-25.243 1 1 0 1 1 .48 1.943 23.959 23.959 0 0 0 -18.24 23.3 1 1 0 0 1 -1 1z"></path></g></g></svg>
                <h5 onClick={handleShow}>Tambah Antrian</h5>
                <AddPatientModal show={show} handleClose={handleClose} addPatient={addPatient} />
        </>
    );
}

export default AddPatientButton;
