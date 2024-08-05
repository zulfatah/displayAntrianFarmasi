import { useState, useEffect } from 'react';
import '../assets/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Marquee from 'react-fast-marquee';
import FullscreenButton from './FullscreenButton';
import config from '../config';

const HomePage = () => {
  const [dataRacik, setDataRacik] = useState([]);
  const [dataNonRacik, setDataNonRacik] = useState([]);
  const [currentRacikIndex, setCurrentRacikIndex] = useState(0);
  const [currentNonRacikIndex, setCurrentNonRacikIndex] = useState(0);
  const [fadeClassRacik, setFadeClassRacik] = useState('');
  const [fadeClassNonRacik, setFadeClassNonRacik] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const racikResponse = await fetch(`${config.baseUrl}/api/data/racik`);
        const racikData = await racikResponse.json();
        setDataRacik(racikData);
      } catch (error) {
        console.error('Error fetching data racik:', error);
      }

      try {
        const nonRacikResponse = await fetch(`${config.baseUrl}/api/data/nonracik`);
        const nonRacikData = await nonRacikResponse.json();
        setDataNonRacik(nonRacikData);
      } catch (error) {
        console.error('Error fetching data nonracik:', error);
      }
    };

    fetchData(); // Initial fetch

    const fetchDataInterval = setInterval(fetchData, 2000); // Fetch data every 2 seconds

    const slideInterval = setInterval(() => {
      if (dataRacik.length >= 11) slideTable('racik');
      if (dataNonRacik.length >= 11) slideTable('nonracik');
    }, 8000);

    return () => {
      clearInterval(fetchDataInterval);
      clearInterval(slideInterval);
    };
  }, [dataRacik.length, dataNonRacik.length]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'btnPending';
      case 'proses':
        return 'btnProses';
      case 'selesai':
        return 'btnSelesai';
      default:
        return '';
    }
  };

  function extractTimeFromISO(isoString) {
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes} `;
  }

  const capitalizeFirstLetter = (string) => {
    return string.split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  };
  
  const renderTable = (data, startIndex) => {
    const endIndex = startIndex + 11;
    const slicedData = data.slice(startIndex, endIndex);
    return (
      <>
        {slicedData.map((item, index) => (
          <tr key={index} className="tr">
            <td>{item.no_urut}</td>
            <td>{item.nama_pasien}</td>
            <td>{item.poli_klinik}</td>
            <td>{extractTimeFromISO(item.jam_registrasi)}</td>
            <td>{extractTimeFromISO(item.est_selesai)}</td>
            <td>
              <button type="button" className={getStatusClass(item.status)}>
              {capitalizeFirstLetter(item.status)}
              </button>
            </td>
          </tr>
        ))}
      </>
    );
  };

  const slideTable = (type) => {
    if (type === 'racik' && dataRacik.length >= 10) {
      setFadeClassRacik('fade-out');
      setTimeout(() => {
        setCurrentRacikIndex((prevIndex) => {
          const newIndex = prevIndex + 10;
          return newIndex >= dataRacik.length ? 0 : newIndex;
        });
        setFadeClassRacik('fade-in');
      }, 1000);
    } else if (type === 'nonracik' && dataNonRacik.length >= 10) {
      setFadeClassNonRacik('fade-out');
      setTimeout(() => {
        setCurrentNonRacikIndex((prevIndex) => {
          const newIndex = prevIndex + 10;
          return newIndex >= dataNonRacik.length ? 0 : newIndex;
        });
        setFadeClassNonRacik('fade-in');
      }, 1000);
    }
  };

  function jam() {
    setInterval(function () {

    var waktu = new Date();
    var jam   = document.getElementById('jam');
    var hours = waktu.getHours();
    var minutes = waktu.getMinutes();
    var seconds = waktu.getSeconds();

    if (waktu.getHours() < 10)
    {
       hours = '0' + waktu.getHours();
    }
    if (waktu.getMinutes() < 10)
    {
       minutes = '0' + waktu.getMinutes();
    }
    if (waktu.getSeconds() < 10)
    {
       seconds = '0' + waktu.getSeconds();
    }
    jam.innerHTML  = hours + ':' + minutes + ':' + seconds +'&nbspWIB';
 }, 1000);
}

jam();

  return (
    <div className="container-fluid text-center bg">
      <div className="row t-20">
        <div className="col-2 logo">
          <img src="src/assets/Logo_1.gif" alt="Logo" />
          
        </div>
        <div className="col-10">
          <h1 className="judul">Display Information Antrian</h1>
          
        </div>
      </div>

      <div className="row h-20">
        <div className="col-6 j-kategori">
          Antrian Obat Racik
        </div>
        <div className="col-6 j-kategori">
          Antrian Obat Non-Racik
        </div>
      </div>

      <div className="row h-60">
        <div className="col-6">
          <div className="table-container">
            <table className="table tableHome table-striped" id="racik">
              <thead>
                <tr>
                  <th>No. Urut</th>
                  <th>Nama Pasien</th>
                  <th>Poliklinik</th>
                  <th>Jam Terima</th>
                  <th>Estimasi Selesai</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="racik-container" className={fadeClassRacik} style={{ transition: 'transform 1s ease-in-out' }}>
                {renderTable(dataRacik, currentRacikIndex)}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-6">
          <div className="table-container">
            <table className="table tableHome table-striped" id="nonracik">
              <thead>
                <tr>
                  <th>No. Urut</th>
                  <th>Nama Pasien</th>
                  <th>Poliklinik</th>
                  <th>Jam Terima</th>
                  <th>Estimasi Selesai</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="nonracik-container" className={fadeClassNonRacik} style={{ transition: 'transform 1s ease-in-out' }}>
                {renderTable(dataNonRacik, currentNonRacikIndex)}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row footer">
        <div className="col-10 bg-text">
          <Marquee>
            <h4 className="r-text">
             <strong>Proses</strong>   : Obat sedang dalam proses pembuatan. &nbsp;<strong>Pending</strong>  : Waktu tidak cukup untuk mempersiapkan obat atau obat tidak tersedia di Rumah Sakit. &nbsp;<strong>Selesai</strong>  : Obat telah siap dan dapat diambil. &nbsp;
            </h4>
           
          </Marquee>
          <FullscreenButton />
        </div>
        <div className="col-2 bg-kuning">
          <h4 id="jam" className="jam"></h4>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
