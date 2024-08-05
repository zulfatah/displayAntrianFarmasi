import { useState, useEffect, useCallback } from 'react';
import AddPatientButton from './AddPatientButton';
import UpdateStatus from './UpdateStatus';
import { FormControl, InputGroup, Dropdown,} from 'react-bootstrap';
import classNames from 'classnames';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import id from 'date-fns/locale/id'; // Bahasa Indonesia
import moment from 'moment-timezone';
import config from '../config';


registerLocale('id', id);

function PatientTable() {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('Pilih Status');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [showProfil, setShowProfil] = useState(false);
    const [username, setUsername] = useState('');
    
    
    const navigate = useNavigate();

    useEffect(() => {
        axios.post(`${config.baseUrl}/user`, {}, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          setUsername(response.data.username);
      
        })
        .catch(error => {
          console.error('Error:', error);
          
        });
      }, []);


    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await fetch(`${config.baseUrl}/api/data/orderbyjam`);
                const data = await response.json();
                setPatients(data);
                setFilteredPatients(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const fetchFilteredData = () => {
        axios.get(`${config.baseUrl}/data/filter`, {
          params: {
            startDate: moment(startDate).tz('Asia/Jakarta').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            endDate: moment(endDate).tz('Asia/Jakarta').endOf('day').format('YYYY-MM-DD HH:mm:ss')
          }
        })
        .then(response => {
          setFilteredData(response.data);
          setIsFiltered(true);
        })
        .catch(error => console.error('Error fetching filtered data:', error));
      };

    useEffect(() => {
        // Hapus token setelah 1 menit
        const timer = setTimeout(() => {
            localStorage.removeItem('token');
            alert('Waktu Telah habis, silakan login kembali.');
            navigate('/login');
        }, 86400000); // 60000 ms = 1 menit
    
        // Bersihkan timeout jika komponen di-unmount
        return () => clearTimeout(timer);
    }, []);
    
    const handleClearToken = () => {
        localStorage.removeItem('token');
        window.confirm('Yakin Mau Keluar?');
        window.location.reload()

      };

      const handleShowReport = () => {
       setShowReport(prevshowReport => !prevshowReport);
       setIsFiltered(prevIsFiltered => !prevIsFiltered)
      };

      const handleShowProfil = () => {
        setShowProfil(prevshowProfil => !prevshowProfil);
       };


    useEffect(() => {
        filterPatients();
    }, [searchTerm, selectedStatus, patients]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleSelect = (eventKey) => {
        setSelectedStatus(eventKey);
    };

    const filterPatients = useCallback(() => {
        setFilteredPatients(
            patients.filter(patient => {
                const matchesSearchTerm = 
                    patient.id.toString().toLowerCase().includes(searchTerm) ||
                    patient.nama_pasien.toLowerCase().includes(searchTerm) ||
                    patient.no_rm.toLowerCase().includes(searchTerm) ||
                    patient.no_urut.toLowerCase().includes(searchTerm) ||
                    patient.kategori_obat.toLowerCase().includes(searchTerm) ||
                    patient.status.toLowerCase().includes(searchTerm);

                const matchesStatus = selectedStatus === 'Pilih Status' || 
                                      patient.status.toLowerCase() === selectedStatus.toLowerCase();

                return matchesSearchTerm && matchesStatus;
            })
        );
    }, [patients, searchTerm, selectedStatus]);

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
    };

    const removePatient = (id) => {
        const updatedPatients = patients.filter(patient => patient.id !== id);
        setPatients(updatedPatients);
    };

    const addPatient = (newPatient) => {
        const newPatients = [...patients, newPatient];
        setPatients(newPatients);
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

    const jamSaja = (isoString) => {
        if (!isoString) {
            return "00:00";
        }
        const date = new Date(isoString);
        if (isNaN(date.getTime())) {
            return "00:00";
        }
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const getMinutesDifference = (startTime, endTime) => {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
    
        const startTotalMinutes = (startHours * 60) + startMinutes;
        const endTotalMinutes = (endHours * 60) + endMinutes;
    
        // Jika endTime adalah "00:00", asumsikan bahwa itu adalah waktu yang kosong
        if (endTime === "00:00") {
            return "Belum Selesai"; // atau nilai lain yang diinginkan
        }
    
        return endTotalMinutes - startTotalMinutes;
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
            <div className="row">
                <div className="col-8 d-flex">
                    <AddPatientButton addPatient={addPatient} />
                </div>

                <div className="col-4 d-flex flex-row-reverse">
                    <svg onClick={handleShowProfil} id="fi_9554821" height="40" viewBox="0 0 512 512" width="40" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><g fillRule="evenodd"><path d="m256 16c-132.336 0-240 107.664-240 240s107.664 240 240 240 240-107.661 240-240-107.664-240-240-240z" fill="#0cb0ff"></path><path d="m477.541 348.279q2.565-6.138 4.791-12.446l-186.832-208.826 1.679 1.937 1.587 2.018 1.488 2.093 1.391 2.166 1.286 2.235 1.181 2.3 1.07 2.364.957 2.423.841 2.479.72 2.531.6 2.58.47 2.626.341 2.669.206 2.707.07 2.742-.07 2.743-.206 2.707-.348 2.673-.47 2.625-.6 2.581-.72 2.53-.841 2.479-.957 2.423-1.067 2.362-1.181 2.3-1.286 2.236-1.391 2.164-1.489 2.093-1.586 2.017-1.679 1.938-1.769 1.855-1.855 1.769-1.937 1.678-2.018 1.588-2.093 1.488-2.165 1.39-2.236 1.287-2.3 1.181-2.364 1.07-2.423.957-2.479.84-2.532.721-2.579.6-2.626.47-2.669.34-2.708.207-2.742.069-2.742-.069-2.708-.207-2.668-.34-2.626-.47-2.581-.6-2.53-.721-2.479-.84-2.424-.957-2.363-1.07-2.3-1.181-2.235-1.287-2.167-1.39-2.093-1.49-2.017-1.586-1.938-1.678-1.855-1.769 147.779 148.677.069 2.724v8.1l-.032 1.253-.091 1.236-.156 1.219-.214 1.2-.274 1.18-.329 1.156-.384 1.133-.436 1.108-.49 1.08-.54 1.051-.587 1.022-.635.991-.682.956-.724.922-.768.886-.808.849-.847.807-.886.767-.922.726-.957.68-.99.636-1.021.588-1.052.54-1.081.489-1.107.438-1.133.384-1.157.329-1.179.273-1.2.216-1.22.155-1.237.094-1.254.032h-171.457l-1.253-.032-1.238-.1-1.22-.155-1.2-.215-1.179-.273-1.158-.33-1.132-.383-1.108-.438-1.081-.489-1.052-.54-1.021-.588-.991-.636-.957-.681-.92-.725 135.75 114.59q3.44-.5 6.848-1.087a239.026 239.026 0 0 0 106.925-47.839 242.079 242.079 0 0 0 24.387-22.077q1.889-1.958 3.731-3.958.6-.653 1.2-1.31l.01.009q3.3-3.633 6.447-7.409l.137-.164.074-.088.063-.076q5.553-6.656 10.628-13.709a239.928 239.928 0 0 0 26.578-47.518z" fill="#0092d8"></path><path d="m256 109.5a53.379 53.379 0 1 1 -53.38 53.379 53.44 53.44 0 0 1 53.38-53.379zm110.124 250.6a24.425 24.425 0 0 1 -24.4 24.4h-171.451a24.425 24.425 0 0 1 -24.4-24.4v-8.1a110.123 110.123 0 1 1 220.246 0z" fill="#fff"></path></g></svg>
                    <svg onClick={handleShowReport} id="fi_2912794" enableBackground="new 0 0 512 512" height="39" viewBox="0 0 512 512" width="40" xmlns="http://www.w3.org/2000/svg"><g><g><g><g><g><g><g><g><path d="m17.42 449.442h224.28l79.303-78.975v-353.046c0-5.479-4.44-9.921-9.918-9.921h-293.665c-5.477 0-9.918 4.442-9.918 9.921v422.1c0 5.479 4.44 9.921 9.918 9.921z" fill="#fff9e9"></path></g></g></g></g><g><g><g><g><path d="m45.684 477.715 234.28 10 79.303-78.975-10-363.046c0-5.479-4.44-9.921-9.918-9.921h-293.665c-5.477 0-9.918 4.442-9.918 9.921v422.1c0 5.48 4.44 9.921 9.918 9.921z" fill="#ffeec2"></path></g></g></g></g><g><g><g><g><g><path d="m73.919 504.5h234.28l69.303-68.975v-363.046c0-5.479-4.44-9.921-9.918-9.921h-293.665c-5.477 0-9.918 4.442-9.918 9.921v422.1c.001 5.48 4.441 9.921 9.918 9.921z" fill="#fff9e9"></path></g></g></g></g><path d="m367.584 62.558h-40c5.477 0 9.918 4.442 9.918 9.921v363.046l-29.303 68.975 69.303-68.975v-363.046c0-5.479-4.441-9.921-9.918-9.921z" fill="#fff4d6"></path><path d="m308.199 504.5v-59.698c0-5.479 4.44-9.921 9.918-9.921h59.385z" fill="#ffeec2"></path></g></g><g><g><path d="m134.596 378.283h37.507v61.6h-37.507z" fill="#fdf385"></path><path d="m172.134 325.145h37.507v114.738h-37.507z" fill="#ffabe7"></path><path d="m209.732 359.083h37.507v80.799h-37.507z" fill="#abdaff"></path></g></g></g><g><g><g><circle cx="388.219" cy="237.455" fill="#fdf385" r="116.255"></circle></g></g><path d="m470.424 155.25c-27.832-27.832-66.204-38.61-102.205-32.347 22.774 3.962 44.599 14.741 62.205 32.347 45.438 45.438 45.438 118.972 0 164.41-17.606 17.606-39.431 28.385-62.205 32.347 36.001 6.263 74.373-4.515 102.205-32.347 45.437-45.438 45.437-118.973 0-164.41z" fill="#faee6e"></path><g><path d="m500.629 267.243c10.231-38.697.166-81.621-30.205-111.993-10.276-10.276-21.991-18.219-34.491-23.848l-47.714 106.052z" fill="#abdaff"></path><path d="m470.424 155.25c-10.276-10.276-21.991-18.219-34.491-23.848l-9.16 20.36c1.235 1.133 2.455 2.291 3.651 3.488 27.771 27.771 38.552 66.035 32.376 101.968l37.83 10.025c10.23-38.697.165-81.622-30.206-111.993z" fill="#99d3ff"></path><path d="m388.219 237.455-82.205 82.205c45.437 45.437 118.972 45.437 164.41 0 15.066-15.066 25.13-33.222 30.205-52.417z" fill="#ffabe7"></path><g><path d="m462.799 257.218-2.17 10.025c-5.075 19.195-15.14 37.351-30.205 52.417-17.606 17.606-39.431 28.385-62.205 32.347 36.001 6.263 74.373-4.515 102.205-32.347 15.066-15.066 25.13-33.222 30.205-52.417z" fill="#ff94e1"></path></g></g></g></g><g fill="#060606"><path d="m121.524 138.59h147.161c9.697 0 9.697-15 0-15h-147.161c-9.697 0-9.697 15 0 15z"></path><path d="m121.524 193.615h113.161c9.697 0 9.697-15 0-15h-113.161c-9.697 0-9.697 15 0 15z"></path><path d="m121.524 248.64h97.161c9.697 0 9.697-15 0-15h-97.161c-9.697 0-9.697 15 0 15z"></path><path d="m259.708 432.383h-4.969v-73.299c0-4.142-3.357-7.5-7.5-7.5h-30.098v-26.438c0-4.142-3.357-7.5-7.5-7.5h-37.507c-4.143 0-7.5 3.358-7.5 7.5v45.637h-30.039c-4.143 0-7.5 3.358-7.5 7.5v54.1h-4.969c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h137.581c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.499-7.5zm-117.612 0v-46.6h22.508v46.6zm37.539 0v-99.737h22.507v99.737zm37.596 0v-65.799h22.508v65.799z"></path><path d="m511.938 233.603c-.977-31.572-13.836-61.282-36.211-83.657-10.736-10.736-22.972-19.077-36.037-25.035-.219-.126-.446-.243-.681-.349-.24-.108-.483-.202-.727-.282-16.897-7.451-35.13-10.947-53.281-10.479v-41.322c0-9.606-7.813-17.421-17.418-17.421h-10.817v-9.364c0-9.606-7.813-17.421-17.418-17.421h-10.847v-10.852c.001-9.606-7.813-17.421-17.417-17.421h-293.664c-9.605 0-17.418 7.815-17.418 17.421v422.101c0 9.606 7.813 17.421 17.418 17.421h10.847v10.852c0 9.606 7.813 17.421 17.387 17.421l10.849.044v9.32c0 9.606 7.813 17.421 17.418 17.421h234.279c1.961 0 3.901-.8 5.291-2.184l69.303-68.975c1.414-1.408 2.209-3.321 2.209-5.316v-74.354c1.011.025 2.022.049 3.033.049 21.14 0 42.19-5.403 60.601-15.719 8.461-4.74 1.128-17.823-7.332-13.086-40.043 22.439-90.158 16.91-124.484-12.955l73.651-73.651 100.69 26.682c-4.438 13.121-11.452 25.572-21.081 36.556-6.392 7.292 4.886 17.18 11.279 9.889 20.69-23.601 31.549-53.906 30.578-85.334zm-86.049-98.158-43.947 97.678-75.742 75.743c-37.205-42.673-35.504-107.693 5.117-148.314 30.924-30.924 75.99-39.289 114.572-25.107zm-380.206 334.77c-1.333 0-2.417-1.086-2.417-2.421v-422.1c0-1.335 1.084-2.421 2.417-2.421h52.318c9.697 0 9.697-15 0-15h-52.318c-9.604 0-17.417 7.815-17.417 17.421v396.248h-10.846c-1.333 0-2.418-1.086-2.418-2.421v-422.1c0-1.335 1.085-2.421 2.418-2.421h293.664c1.333 0 2.418 1.086 2.418 2.421v10.853h-173.5c-9.697 0-9.697 15 0 15h199.347c1.333 0 2.418 1.086 2.418 2.421v9.364h-267.847c-9.604 0-17.418 7.815-17.418 17.421v397.78zm25.819 24.364v-422.1c0-1.335 1.085-2.421 2.418-2.421h293.664c1.333 0 2.418 1.086 2.418 2.421v42.619c-25.375 3.746-49.802 15.359-69.292 34.849-48.252 48.252-48.252 126.764 0 175.017 18.979 18.978 42.904 31.004 69.292 34.906v67.512h-51.885c-9.604 0-17.418 7.815-17.418 17.421v52.197h-226.779c-1.333 0-2.418-1.086-2.418-2.421zm244.197-8.244v-41.532c0-1.335 1.085-2.421 2.418-2.421h41.336zm82.986-253.866 40.89-90.884c9.184 4.913 17.808 11.232 25.544 18.968 26.287 26.288 36.379 63.104 29.852 97.432z"></path></g></g></svg>
                    
{showProfil && (<div className='dropdownUser'>
                        <div className="d-flex">
                    <svg id="fi_3024605" enableBackground="new 0 0 189.524 189.524" height="20" viewBox="0 0 189.524 189.524" width="20" xmlns="http://www.w3.org/2000/svg"><g><g><path clipRule="evenodd" d="m170.94 151.134c11.678-15.753 18.584-35.256 18.584-56.372 0-52.336-42.427-94.762-94.762-94.762-52.336 0-94.762 42.426-94.762 94.762 0 52.335 42.426 94.762 94.762 94.762 27.458 0 52.188-11.678 69.496-30.339 2.37-2.557 4.602-5.244 6.682-8.051zm-5.254-8.991c9.071-13.552 14.361-29.849 14.361-47.381 0-47.102-38.183-85.286-85.286-85.286-47.101 0-85.285 38.184-85.285 85.286 0 17.533 5.29 33.829 14.362 47.381 11.445-17.098 28.909-29.827 49.361-35.155-9.875-6.843-16.342-18.255-16.342-31.179 0-20.934 16.971-37.905 37.905-37.905s37.905 16.971 37.905 37.905c0 12.923-6.468 24.336-16.342 31.178 20.451 5.329 37.916 18.057 49.361 35.156zm-6.104 8.047c-13.299-21.869-37.353-36.476-64.819-36.476-27.467 0-51.522 14.607-64.821 36.477 15.642 18.275 38.878 29.857 64.82 29.857s49.178-11.583 64.82-29.858zm-64.82-45.952c15.701 0 28.429-12.727 28.429-28.429 0-15.701-12.727-28.429-28.429-28.429s-28.429 12.729-28.429 28.43 12.728 28.428 28.429 28.428z" fillRule="evenodd"></path></g></g></svg>
                    <h6 className='px-2'>{username}</h6></div>
                    <div className="d-flex">
                    <svg  onClick={handleClearToken} height="17pt" viewBox="0 0 512.00533 512" width="17pt" xmlns="http://www.w3.org/2000/svg" id="fi_1828479"><path d="m320 277.335938c-11.796875 0-21.332031 9.558593-21.332031 21.332031v85.335937c0 11.753906-9.558594 21.332032-21.335938 21.332032h-64v-320c0-18.21875-11.605469-34.496094-29.054687-40.554688l-6.316406-2.113281h99.371093c11.777344 0 21.335938 9.578125 21.335938 21.335937v64c0 11.773438 9.535156 21.332032 21.332031 21.332032s21.332031-9.558594 21.332031-21.332032v-64c0-35.285156-28.714843-63.99999975-64-63.99999975h-229.332031c-.8125 0-1.492188.36328175-2.28125.46874975-1.027344-.085937-2.007812-.46874975-3.050781-.46874975-23.53125 0-42.667969 19.13281275-42.667969 42.66406275v384c0 18.21875 11.605469 34.496093 29.054688 40.554687l128.386718 42.796875c4.351563 1.34375 8.679688 1.984375 13.226563 1.984375 23.53125 0 42.664062-19.136718 42.664062-42.667968v-21.332032h64c35.285157 0 64-28.714844 64-64v-85.335937c0-11.773438-9.535156-21.332031-21.332031-21.332031zm0 0"></path><path d="m505.75 198.253906-85.335938-85.332031c-6.097656-6.101563-15.273437-7.9375-23.25-4.632813-7.957031 3.308594-13.164062 11.09375-13.164062 19.714844v64h-85.332031c-11.777344 0-21.335938 9.554688-21.335938 21.332032 0 11.777343 9.558594 21.332031 21.335938 21.332031h85.332031v64c0 8.621093 5.207031 16.40625 13.164062 19.714843 7.976563 3.304688 17.152344 1.46875 23.25-4.628906l85.335938-85.335937c8.339844-8.339844 8.339844-21.824219 0-30.164063zm0 0"></path></svg>
                    <h6  onClick={handleClearToken} className='px-2'>keluar</h6></div>
                    </div>)}

                </div>
           </div>
           {/* <h6>Nama : {username}</h6>
            <button className="btn btn-danger" onClick={handleClearToken}>
                  keluar
            </button> */}
            <InputGroup className="mb-3 mt-3">
                <FormControl
                    placeholder="Cari pasien..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedStatus}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="Pilih Status">
                        Pilih Status
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="proses">
                        Proses
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="pending">
                        Pending
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="selesai">
                        Selesai
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </InputGroup>
            
            
            {showReport && (<><h4 className="mb-4">Laporan</h4><div className="row mb-4">
                    <div className="col-md-2">
                        <label>Mulai</label>
                        <DatePicker
                            selected={startDate}
                            dateFormat="dd/MM/yyyy"
                            onChange={date => setStartDate(date)}
                            className="form-control" />
                    </div>
                    <div className="col-md-2">
                        <label>Akhir</label>
                        <DatePicker
                            selected={endDate}
                            dateFormat="dd/MM/yyyy"
                            onChange={date => setEndDate(date)}
                            className="form-control" />
                    </div>
                    <div className="col-md-1 px-5 align-self-end">
                        <button className="btn btn-primary" onClick={fetchFilteredData}>
                            Buka
                        </button>
                    </div>
                    <div className="col-md-2 align-self-end">
                        {isFiltered && (
                            <button className="btn btn-secondary mt-3" onClick={() => { setIsFiltered(false); setShowReport(false); setFilteredData([]); }}
>
                                Reset Filter
                            </button>
                        )}
                    </div>
                </div></>)}
            
            
            
            <div className='tblpasien'>
            {!isFiltered ? (  
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
                                <td>
                                    <div className='d-flex justify-content-center'>
                                        <UpdateStatus patient={patient} updateStatus={updateStatus} removePatient={removePatient} />
                                        <div>
                                          <svg onClick={() => handlePrint(patient)} id="fi_2787698" enableBackground="new 0 0 512 512" height="30" viewBox="0 0 512 512" width="30" xmlns="http://www.w3.org/2000/svg"><g><g><g><g><g><g><g><g><path d="m102.277 403.796h-45.649c-15.073 0-27.293-12.218-27.293-27.289v-179.569c0-15.072 12.219-27.289 27.293-27.289h398.745c15.073 0 27.293 12.218 27.293 27.289v179.569c0 15.072-12.219 27.289-27.293 27.289h-47.223" fill="#80b6ff"></path></g></g></g></g></g><g><g><g><g><g><path d="m405.199 330.092v171.908h-298.398v-171.908" fill="#faf7f5"></path></g></g></g></g></g></g><g><g><g><g><g><g><g><ellipse cx="341.16" cy="244.341" fill="#ff9eb1" rx="22.468" ry="22.468" transform="matrix(.904 -.427 .427 .904 -71.669 169.075)"></ellipse></g></g></g></g></g></g><g><g><g><g><g><g><ellipse cx="424.301" cy="244.341" fill="#bfdbff" rx="22.468" ry="22.468" transform="matrix(.707 -.707 .707 .707 -48.5 371.592)"></ellipse></g></g></g></g></g></g></g><g><g><g><g><g><g><path d="m405.199 169.648h-298.398v-104.317h-14.237c-14.108 0-25.545 11.437-25.545 25.545v78.773h377.96v-78.774c0-14.108-11.437-25.545-25.544-25.545h-14.413" fill="#bfdbff"></path></g></g></g></g></g><g><g><g><g><g><path d="m348.692 10h-241.891v159.648h298.398v-103.141z" fill="#faf7f5"></path></g></g></g></g></g><g><g><g><g><g><path d="m348.692 66.507h56.507l-56.507-56.507z" fill="#bfdbff"></path></g></g></g></g></g></g></g><g><path d="m455.376 159.648h-.396v-68.773c0-19.631-15.914-35.544-35.544-35.544h-11.271l-52.401-52.402c-.001-.001-.001-.001-.002-.003-1.73-1.837-4.115-2.927-6.639-2.926-.288 0-.475 0-.495 0h-241.827c-5.523 0-10 4.477-10 10v45.331h-4.237c-19.631 0-35.544 15.914-35.544 35.544v68.773h-.393c-20.596 0-37.292 16.696-37.292 37.292v179.565c0 20.594 16.695 37.29 37.29 37.29h40.177v88.205c0 5.523 4.477 10 10 10h298.397c5.523 0 10-4.477 10-10v-88.205h40.174c20.596 0 37.292-16.696 37.292-37.292v-179.565c0-20.595-16.695-37.29-37.289-37.29zm-20.396-68.773v68.773h-19.781v-84.317h4.237c8.571 0 15.544 6.973 15.544 15.544zm-53.923-34.368h-22.364v-22.364zm-264.256-36.507h221.891v46.507c0 5.523 4.477 10 10 10h46.506v83.141h-278.397zm-39.781 70.875c0-8.571 6.973-15.544 15.544-15.544h4.237v84.317h-19.781zm395.645 285.631c0 9.534-7.757 17.29-17.292 17.29h-40.174v-53.704h16.801c5.523 0 10-4.477 10-10s-4.477-10-10-10h-130.793c-5.523 0-10 4.477-10 10s4.477 10 10 10h93.992v151.908h-278.398v-151.908h93.993c5.523 0 10-4.477 10-10s-4.477-10-10-10h-130.794c-5.523 0-10 4.477-10 10s4.477 10 10 10h16.801v53.704h-40.173c-9.535 0-17.292-7.756-17.292-17.29v-179.568c0-9.534 7.757-17.29 17.292-17.29h398.745c9.535 0 17.292 7.756 17.292 17.29z"></path><g><g><g><g><g><g><path d="m256.18 340.09c-4.236 0-8.103-2.774-9.46-6.786-1.315-3.889-.073-8.335 3.116-10.942 3.279-2.68 8.023-2.991 11.621-.758 3.497 2.171 5.348 6.403 4.533 10.446-.931 4.618-5.099 8.04-9.81 8.04z"></path></g></g></g></g></g></g><g><g><g><g><g><g><g><path d="m325.447 403.376h-138.894c-5.523 0-10-4.477-10-10s4.477-10 10-10h138.894c5.523 0 10 4.477 10 10s-4.477 10-10 10z"></path></g></g></g></g></g></g><g><g><g><g><g><g><path d="m325.447 462.61h-138.894c-5.523 0-10-4.477-10-10s4.477-10 10-10h138.894c5.523 0 10 4.477 10 10s-4.477 10-10 10z"></path></g></g></g></g></g></g></g><g><g><g><g><g><path d="m424.301 276.809c-17.903 0-32.468-14.565-32.468-32.468s14.565-32.468 32.468-32.468 32.468 14.565 32.468 32.468-14.565 32.468-32.468 32.468zm0-44.936c-6.875 0-12.468 5.593-12.468 12.468s5.593 12.468 12.468 12.468 12.468-5.593 12.468-12.468-5.593-12.468-12.468-12.468z"></path></g></g></g></g></g><g><g><g><g><g><path d="m341.16 276.809c-17.903 0-32.468-14.565-32.468-32.468s14.565-32.468 32.468-32.468 32.468 14.565 32.468 32.468-14.565 32.468-32.468 32.468zm0-44.936c-6.875 0-12.468 5.593-12.468 12.468s5.593 12.468 12.468 12.468 12.468-5.593 12.468-12.468-5.593-12.468-12.468-12.468z"></path></g></g></g></g></g></g></g></svg>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> ) :
             ( <table className="table table-bordered mb-5">
                    <thead>
                        <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>Nama</th>
                        <th>Jam Registrasi</th>
                        <th>Estimasi Selesai</th>
                        <th>Jam Pending</th>
                        <th>Jam Selesai</th>
                        <th>Jam Terima</th>
                        <th>Lama Waktu Selesai</th>
                        <th>Kategori Obat</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index)  => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{tanggalSaja(item.jam_registrasi)}</td>
                            <td>{item.nama_pasien}</td>
                            <td>{jamSaja(item.jam_registrasi)}</td>
                            <td>{jamSaja(item.est_selesai)}</td>
                            <td>{jamSaja(item.jam_pending)}</td>
                            <td>{jamSaja(item.jam_selesai)}</td>
                            <td>{jamSaja(item.jam_diterima)}</td>
                            <td>{(() => {
                                         const difference = getMinutesDifference(jamSaja(item.jam_registrasi), jamSaja(item.jam_selesai));
                                         return difference > 0 ? `${difference} menit` : 'Belum Selesai';
                                         })()}
                            </td>
                            <td>{item.kategori_obat}</td>
                            
                        </tr>
                        ))}
                    </tbody>
                </table>)}
            </div>
        </div>
    );
}

export default PatientTable;
