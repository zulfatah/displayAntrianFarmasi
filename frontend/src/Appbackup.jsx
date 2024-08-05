import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({
    nama_pasien: ''
  });

  // Menggunakan useEffect untuk memuat data saat komponen dimuat dan mengatur interval refresh setiap 2 detik
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  // Fungsi untuk memuat data dari server
  const fetchData = () => {
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  // Fungsi untuk mengirim data baru ke server
const addData = () => {
  if (!newData.nama_pasien.trim()) {
    console.error('Nama pasien tidak boleh kosong');
    return;
  }
  axios.post('http://localhost:5000/api/data/add', newData)
    .then(response => {
      console.log('Data added:', response.data);
      // Setelah berhasil menambahkan data, refresh data yang ditampilkan
      fetchData();
      // Reset form input setelah berhasil menambahkan data
      setNewData({
        nama_pasien: '',
      });
    })
    .catch(error => {
      console.error('Error adding data:', error);
    });
};

// Fungsi untuk delete server
const deleteData = (id) => {
  axios.delete(`http://localhost:5000/api/data/${id}`)
    .then(response => {
      console.log('Data deleted:', response.data);
      fetchData();
    })
    .catch(error => {
      console.error('Error deleting data:', error);
    });
};

  // Menghandle perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Data from MySQL Database</h1>
      <form onSubmit={(e) => { e.preventDefault(); addData(); }}>
  <input
    type="text"
    name="nama_pasien"
    value={newData.nama_pasien}
    onChange={handleChange}
    placeholder="Nama Pasien"
    required
  />
  <button type="submit">Tambah Data</button>
</form>

      
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.nama_pasien}<button onClick={() => deleteData(item.id)}>Hapus</button>
          </li>
          
        ))}
      </ul>
    </div>
  );
}

export default App;
