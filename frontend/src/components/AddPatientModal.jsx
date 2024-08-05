import { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../config';

function AddPatientModal({ show, handleClose, addPatient }) {
    const [name, setName] = useState('');
    const [kategori, setKategori] = useState('');
    const [noRM, setNoRM] = useState('');
    const [jKelamin, setjKelamin] = useState('');
    const [poliklinik, setpoliklinik] = useState('');
    const [alamat, setalamat] = useState('');
    const [penjamin, setpenjamin] = useState('');
    const [tanggal_lahir, settanggal_lahir] = useState('');
    const [status] = useState('proses');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    

    useEffect(() => {
        // Check if all fields are filled
        const isValid = name && kategori && noRM && jKelamin && poliklinik && alamat && penjamin && tanggal_lahir;
        setIsFormValid(isValid);
        }, [name, kategori, noRM, jKelamin, poliklinik, alamat, penjamin, tanggal_lahir]);

        const fetchPatientName = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://api-dev.ptprime.id/registrasi/current/${noRM}`, {
                    headers: {
                        'Authorization': `Bearer ${config.token}`,
                    }
                });
        
                if (response.data && response.data.data && response.data.data.nama) {
                    const combinedAddress = `${response.data.data.alamat}, Kel. ${response.data.data.kelurahan}, Kec. ${response.data.data.kecamatan}, ${response.data.data.kabupaten}, ${response.data.data.provinsi}`;
                    setalamat(combinedAddress);
                    setName(response.data.data.nama);
                    setjKelamin(response.data.data.jenis_kelamin);
                    setpoliklinik(response.data.data.poliklinik);
                    setpenjamin(response.data.data.penjamin);
                    settanggal_lahir(response.data.data.tanggal_lahir);
                } else {
                    alert('Pasien tidak ditemukan');
                    setName('');
                }
            } catch (error) {
                console.error('Error fetching patient data', error);
                alert('Pasien tidak ditemukan');
                setName('');
            } finally {
                setIsLoading(false);
            }
        };
        

    const handleSave = () => {
        const newPatient = {
            name,
            kategori,
            status,
            noRM,
            jKelamin,
            poliklinik,
            alamat,
            penjamin,
            tanggal_lahir,
        };

        handleClose();
       
        const baseUrl = process.env.REACT_APP_BASE_URL;
     // Kirim data ke backend
     fetch('${baseUrl}/api/data/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Jika Anda menggunakan token untuk autentikasi
        },
        body: JSON.stringify(newPatient),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data berhasil ditambahkan:', data);
        addPatient(newPatient);
        window.location.reload();
    })
    .catch(error => {
        console.error('Error adding data:', error);
    });
};

    const tanggalSaja = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tambah Pasien</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group controlId="NoRM">
                        <Form.Label>Nomor RM</Form.Label>
                        <div className="d-flex align-items-center">
                            <Form.Control
                                type="text"
                                placeholder="Masukkan Nomor RM"
                                value={noRM}
                                onChange={(e) => setNoRM(e.target.value)}
                                className="me-2"
                            />
                            {isLoading ? (
                                <Spinner animation="border" role="status" size="sm">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            ) : (
                                <svg onClick={fetchPatientName} id="fi_3093773" enable-background="new 0 0 512 512" height="40" viewBox="0 0 512 512" width="40" xmlns="http://www.w3.org/2000/svg"><g><path d="m350.741 427.664h-284.135c-17.069 0-30.905-13.837-30.905-30.905v-365.854c-.001-17.068 13.836-30.905 30.905-30.905h284.136c17.069 0 30.905 13.837 30.905 30.905v365.853c0 17.069-13.837 30.906-30.906 30.906z" fill="#f7f6f7"></path><path d="m350.741 0h-30.905c17.069 0 30.905 13.837 30.905 30.905v365.853c0 17.069-13.837 30.905-30.905 30.905h30.905c17.069 0 30.905-13.837 30.905-30.905v-365.853c.001-17.068-13.836-30.905-30.905-30.905z" fill="#edebed"></path><path d="m377.046 512h-346.141c-17.068 0-30.905-13.837-30.905-30.905v-264.757c0-17.069 13.837-30.905 30.905-30.905h150.759c12.291 0 23.004 8.365 25.985 20.288l5.308 21.234c2.981 11.924 13.694 20.288 25.985 20.288h138.103c17.069 0 30.905 13.837 30.905 30.905v202.946c.002 17.069-13.835 30.906-30.904 30.906z" fill="#ffe07d"></path><g fill="#ffd064"><path d="m377.046 247.243h-30.905c17.069 0 30.905 13.837 30.905 30.905v202.946c0 17.069-13.837 30.905-30.905 30.905h30.905c17.069 0 30.905-13.837 30.905-30.905v-202.945c.001-17.069-13.836-30.906-30.905-30.906z"></path><path d="m176.744 205.721 5.308 21.234c2.981 11.924 13.694 20.288 25.985 20.288h30.905c-12.291 0-23.004-8.365-25.985-20.288l-5.308-21.234c-2.981-11.924-13.694-20.288-25.985-20.288h-30.905c12.291 0 23.004 8.364 25.985 20.288z"></path></g><g><path d="m314.057 54.085h-223.76c-4.267 0-7.726-3.459-7.726-7.726s3.459-7.726 7.726-7.726h223.76c4.268 0 7.726 3.459 7.726 7.726s-3.458 7.726-7.726 7.726z" fill="#a198a4"></path></g><g><path d="m267.699 100.443h-177.402c-4.267 0-7.726-3.459-7.726-7.726s3.459-7.726 7.726-7.726h177.402c4.268 0 7.726 3.459 7.726 7.726.001 4.266-3.458 7.726-7.726 7.726z" fill="#a198a4"></path></g></g></svg>
                            )}
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formName">
                        <Form.Label>Nama Pasien</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="..."
                            value={name}
                            disabled  
                        />    
                    </Form.Group>
                    <Form.Group controlId="formtgllahir">
                        <Form.Label>Tanggal Lahir</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="DD/MM/YYYY"
                            value={tanggalSaja(tanggal_lahir)}
                            disabled  
                        />    
                    </Form.Group>

                    <Form.Group controlId="formjkelamin">
                        <Form.Label>Jenis Kelamin</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="..."
                            value={jKelamin}
                            disabled  
                        />    
                    </Form.Group>
                    <Form.Group controlId="formpoliklinik">
                        <Form.Label>Poliklinik</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="..."
                            value={poliklinik}
                            disabled  
                        />    
                    </Form.Group>

                    <Form.Group controlId="formKategori">
                        <Form.Label>Kategori Obat</Form.Label>
                        <Form.Control
                            as="select"
                            value={kategori}
                            onChange={(e) => setKategori(e.target.value)}
                        >
                            <option value="">Pilih Kategori</option>
                            <option value="Racik">Racik</option>
                            <option value="Non Racik">Non Racik</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Tutup
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={!isFormValid}>
                    Tambah Pasien
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddPatientModal;
