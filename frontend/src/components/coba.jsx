import { useState, useEffect, useCallback } from 'react';
import AddPatientButton from './AddPatientButton';
import UpdateStatus from './UpdateStatus';
import { FormControl, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import classNames from 'classnames';


function PatientTable() {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPatients, setFilteredPatients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/data/orderbyjam');
                const data = await response.json();
                setPatients(data);
                setFilteredPatients(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

  
    const handleSearchChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        filterPatients(searchTerm);
    };

    const filterPatients = useCallback(
        (term) => {
            setFilteredPatients(
                patients.filter(patient =>
                    patient.id.toString().toLowerCase().includes(term) ||
                    patient.nama_pasien.toLowerCase().includes(term) ||
                    patient.no_rm.toLowerCase().includes(term) ||
                    patient.no_urut.toLowerCase().includes(term) ||
                    patient.kategori_obat.toLowerCase().includes(term) ||
                    patient.status.toLowerCase().includes(term)
                )
            );
        },
        [patients]
    );

    const getStatusClass = (status) => {
        return classNames({
            btnPending: status === 'pending',
            btnProses: status === 'proses',
            btnSelesai: status === 'selesai',
            btnDiterima: status === 'diterima',
        });
    };

    const updateStatus = (id, newStatus) => {
        const updatedPatients = patients.map((patient) =>
            patient.id === id ? { ...patient, status: newStatus } : patient
        );
        setPatients(updatedPatients);
        filterPatients(searchTerm);
    };

    const removePatient = (id) => {
        const updatedPatients = patients.filter(patient => patient.id !== id);
        setPatients(updatedPatients);
        setFilteredPatients(updatedPatients);
    };

    const addPatient = (newPatient) => {
        const newPatients = [...patients, newPatient];
        setPatients(newPatients);
        filterPatients(searchTerm);
    };

    const extractTimeFromISO = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes} WIB`;
    };
    const tanggalSaja = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    };

    const handlePrint = (patient) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print</title>
                    <style>
                        body {
                            font-family: Geneva, Tahoma, Verdana, sans-serif;
                            font-size: 20px;
                            margin-top: 0;
                            margin-left: 5px;
                            padding: 0;
                        }

                        @media print {
                            @page {
                                size: 76mm 297mm;
                                margin: 0;
                                padding: 0;
                            }

                            .container {
                                width: 76mm;
                                padding: 10px;
                                margin: 0 auto;
                            }

                            .header {
                                text-align: center;
                            }

                            .header h2 {
                                margin-top: 0;
                                margin-bottom: 5px;
                                font-size: 12px;
                            }

                            .header p {
                                margin-top: -5px;
                                margin-bottom: 5px;
                                font-size: 10px;
                            }

                            .header h3 {
                                margin-top: 0;
                                margin-bottom: 10px;
                                font-size: 12px;
                            }

                            hr {
                                margin: 5px 0;
                                border-top: 1px solid #000;
                            }

                            .details {
                                font-size: 12px;
                            }

                            .details table {
                                width: 100%;
                                border-collapse: collapse;
                            }

                            .details td {
                                vertical-align: top;
                                padding: 2px 0;
                            }

                            .details td:nth-child(2) {
                                width: 5px;
                            }

                            .details td:nth-child(3) {
                                width: 65%;
                            }

                            .notes {
                                margin-top: 10px;
                                font-size: 12px;
                            }
                            
                            td {
                            font-size: 12px;
                            }

                            .footer {
                                text-align: center;
                                margin-top: -10px;
                                font-size: 12px;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>RS PRIMA INTI MEDIKA</h2>
                            <p>Jl. Singgalang No.1, Komplek Perumahan PT PIM, Krueng Geukuh, Aceh Utara, 082272628796</p>
                            <hr>
                            <h3>NOMOR ANTRIAN FARMASI</h3>
                        </div>

                        <div class="details">
                            <table>
                                <tr>
                                    <td>Tgl. Terima</td>
                                    <td>:</td>
                                    <td>${extractTimeFromISO(patient.jam_registrasi)}</td>
                                </tr>
                                <tr>
                                    <td>Estimasi Selesai</td>
                                    <td>:</td>
                                    <td>${extractTimeFromISO(patient.est_selesai)}</td>
                                </tr>
                                <tr>
                                    <td>No. Antrian</td>
                                    <td>:</td>
                                    <td><strong>${patient.no_urut}</strong></td>
                                </tr>
                                <tr>
                                    <td>No. RM</td>
                                    <td>:</td>
                                    <td>${patient.no_rm}</td>
                                </tr>
                                <tr>
                                    <td>Nama</td>
                                    <td>:</td>
                                    <td><strong>${patient.nama_pasien}</strong></td>
                                </tr>
                                <tr>
                                    <td>Tgl. Lahir</td>
                                    <td>:</td>
                                    <td>${tanggalSaja(patient.tgl_lahir)}</td>
                                </tr>
                                <tr>
                                    <td>Jenis Kelamin</td>
                                    <td>:</td>
                                    <td>${patient.j_kelamin}</td>
                                </tr>
                                <tr>
                                    <td>Alamat</td>
                                    <td>:</td>
                                    <td>${patient.alamat}</td>
                                </tr>
                                <tr>
                                    <td>Poliklinik</td>
                                    <td>:</td>
                                    <td><strong>${patient.poli_klinik}</strong></td>
                                </tr>
                                <tr>
                                    <td>Kategori Obat</td>
                                    <td>:</td>
                                    <td>${patient.kategori_obat}</td>
                                </tr>
                                 <tr>
                                    <td>Catatan</td>
                                    <td>:</td>
                                    <td>Estimasi selesai berlaku jika obat tersedia di Rumah Sakit</td>
                                </tr>
                            </table>
                        </div>

            
                        <hr>
                        <div class="footer">
                            <p>Terima Kasih Atas Kepercayaan Anda</p>
                        </div>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };
    const capitalizeFirstLetter = (string) => {
        return string.split(' ').map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
      };

    return (
        <div className="container mt-5 ">
            <h2 className='text-center cc'>Daftar Antrian Farmasi</h2>
            <AddPatientButton addPatient={addPatient} />
            <InputGroup className="mb-3 mt-3">
                <FormControl
                    placeholder="Cari pasien..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                    <DropdownButton
                    as={InputGroup.Append}
                    variant="outline-secondary"
                    title={capitalizeFirstLetter(statusFilter)}
                    id="status-filter-dropdown"
                    onSelect={handleStatusFilterChange}
                >
                    <Dropdown.Item eventKey="all">All</Dropdown.Item>
                    <Dropdown.Item eventKey="pending">Pending</Dropdown.Item>
                    <Dropdown.Item eventKey="proses">Proses</Dropdown.Item>
                    <Dropdown.Item eventKey="selesai">Selesai</Dropdown.Item>
                    <Dropdown.Item eventKey="diterima">Diterima</Dropdown.Item>
                </DropdownButton>
            </InputGroup>
            <div className='tblpasien'>
                <table className="table table-striped  mt-3">
                    <thead>
                        <tr>
                            <th>No Urut</th>
                            <th>Nama Pasien</th>
                            <th>Tanggal Lahir</th>
                            <th>Jenis kelamin</th>
                            <th>Poliklinik</th>
                            <th>Penjamin</th>
                            <th>Kategori Obat</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patient, index) => (
                            <tr key={index}>
                                <td>{patient.no_urut}</td>
                                <td>{patient.nama_pasien}</td>
                                <td>{tanggalSaja(patient.tgl_lahir)}</td>
                                <td>{patient.j_kelamin}</td>
                                <td>{patient.poli_klinik}</td>
                                <td>{patient.penjamin}</td>
                                <td>{patient.kategori_obat}</td>
                                <td>
                                    <button className={getStatusClass(patient.status)}>
                                    {capitalizeFirstLetter(patient.status)}
                                    </button>
                                </td>
                                <td > 
                                    <div className='d-flex justify-content-center' >
                                    <UpdateStatus patient={patient} updateStatus={updateStatus} removePatient={removePatient} />
                                    <div>
                                    <svg onClick={() => handlePrint(patient)} id="fi_2787698" enable-background="new 0 0 512 512" height="30" viewBox="0 0 512 512" width="30" xmlns="http://www.w3.org/2000/svg"><g><g><g><g><g><g><g><g><path d="m102.277 403.796h-45.649c-15.073 0-27.293-12.218-27.293-27.289v-179.569c0-15.072 12.219-27.289 27.293-27.289h398.745c15.073 0 27.293 12.218 27.293 27.289v179.569c0 15.072-12.219 27.289-27.293 27.289h-47.223" fill="#80b6ff"></path></g></g></g></g></g><g><g><g><g><g><path d="m405.199 330.092v171.908h-298.398v-171.908" fill="#faf7f5"></path></g></g></g></g></g></g><g><g><g><g><g><g><g><ellipse cx="341.16" cy="244.341" fill="#ff9eb1" rx="22.468" ry="22.468" transform="matrix(.904 -.427 .427 .904 -71.669 169.075)"></ellipse></g></g></g></g></g></g><g><g><g><g><g><g><ellipse cx="424.301" cy="244.341" fill="#bfdbff" rx="22.468" ry="22.468" transform="matrix(.707 -.707 .707 .707 -48.5 371.592)"></ellipse></g></g></g></g></g></g></g><g><g><g><g><g><g><path d="m405.199 169.648h-298.398v-104.317h-14.237c-14.108 0-25.545 11.437-25.545 25.545v78.773h377.96v-78.774c0-14.108-11.437-25.545-25.544-25.545h-14.413" fill="#bfdbff"></path></g></g></g></g></g><g><g><g><g><g><path d="m348.692 10h-241.891v159.648h298.398v-103.141z" fill="#faf7f5"></path></g></g></g></g></g><g><g><g><g><g><path d="m348.692 66.507h56.507l-56.507-56.507z" fill="#bfdbff"></path></g></g></g></g></g></g></g><g><path d="m455.376 159.648h-.396v-68.773c0-19.631-15.914-35.544-35.544-35.544h-11.271l-52.401-52.402c-.001-.001-.001-.001-.002-.003-1.73-1.837-4.115-2.927-6.639-2.926-.288 0-.475 0-.495 0h-241.827c-5.523 0-10 4.477-10 10v45.331h-4.237c-19.631 0-35.544 15.914-35.544 35.544v68.773h-.393c-20.596 0-37.292 16.696-37.292 37.292v179.565c0 20.594 16.695 37.29 37.29 37.29h40.177v88.205c0 5.523 4.477 10 10 10h298.397c5.523 0 10-4.477 10-10v-88.205h40.174c20.596 0 37.292-16.696 37.292-37.292v-179.565c0-20.595-16.695-37.29-37.289-37.29zm-20.396-68.773v68.773h-19.781v-84.317h4.237c8.571 0 15.544 6.973 15.544 15.544zm-53.923-34.368h-22.364v-22.364zm-264.256-36.507h221.891v46.507c0 5.523 4.477 10 10 10h46.506v83.141h-278.397zm-39.781 70.875c0-8.571 6.973-15.544 15.544-15.544h4.237v84.317h-19.781zm395.645 285.631c0 9.534-7.757 17.29-17.292 17.29h-40.174v-53.704h16.801c5.523 0 10-4.477 10-10s-4.477-10-10-10h-130.793c-5.523 0-10 4.477-10 10s4.477 10 10 10h93.992v151.908h-278.398v-151.908h93.993c5.523 0 10-4.477 10-10s-4.477-10-10-10h-130.794c-5.523 0-10 4.477-10 10s4.477 10 10 10h16.801v53.704h-40.173c-9.535 0-17.292-7.756-17.292-17.29v-179.568c0-9.534 7.757-17.29 17.292-17.29h398.745c9.535 0 17.292 7.756 17.292 17.29z"></path><g><g><g><g><g><g><path d="m256.18 340.09c-4.236 0-8.103-2.774-9.46-6.786-1.315-3.889-.073-8.335 3.116-10.942 3.279-2.68 8.023-2.991 11.621-.758 3.497 2.171 5.348 6.403 4.533 10.446-.931 4.618-5.099 8.04-9.81 8.04z"></path></g></g></g></g></g></g><g><g><g><g><g><g><g><path d="m325.447 403.376h-138.894c-5.523 0-10-4.477-10-10s4.477-10 10-10h138.894c5.523 0 10 4.477 10 10s-4.477 10-10 10z"></path></g></g></g></g></g></g><g><g><g><g><g><g><path d="m325.447 462.61h-138.894c-5.523 0-10-4.477-10-10s4.477-10 10-10h138.894c5.523 0 10 4.477 10 10s-4.477 10-10 10z"></path></g></g></g></g></g></g></g><g><g><g><g><g><path d="m424.301 276.809c-17.903 0-32.468-14.565-32.468-32.468s14.565-32.468 32.468-32.468 32.468 14.565 32.468 32.468-14.565 32.468-32.468 32.468zm0-44.936c-6.875 0-12.468 5.593-12.468 12.468s5.593 12.468 12.468 12.468 12.468-5.593 12.468-12.468-5.593-12.468-12.468-12.468z"></path></g></g></g></g></g><g><g><g><g><g><path d="m341.16 276.809c-17.903 0-32.468-14.565-32.468-32.468s14.565-32.468 32.468-32.468 32.468 14.565 32.468 32.468-14.565 32.468-32.468 32.468zm0-44.936c-6.875 0-12.468 5.593-12.468 12.468s5.593 12.468 12.468 12.468 12.468-5.593 12.468-12.468-5.593-12.468-12.468-12.468z"></path></g></g></g></g></g></g></g></svg>
                                    </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PatientTable;
