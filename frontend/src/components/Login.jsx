import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/login.css';
import config from '../config';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post(`${config.baseUrl}/login`, { username, password })
          .then(response => {
            localStorage.setItem('token', response.data.token);
            navigate('/input');
          })
          .catch(error => {
            if (error.response && error.response.status === 400) {
              alert('Password salah. Silakan coba lagi.');
            } else {
              console.error(error);
            }
          });
      };

      const handleRegister = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post(`${config.baseUrl}/register`, { username, email, password });
          alert(response.data.message);
          window.location.reload();
        } catch (error) {
          if (error.response) {
            alert(error.response.data.error);
          } else {
            alert('Terjadi kesalahan. Silakan coba lagi.');
          }
        }
      };

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        const handleSignUpClick = () => {
            container.classList.add("right-panel-active");
        };

        const handleSignInClick = () => {
            container.classList.remove("right-panel-active");
        };

        if (signUpButton && signInButton && container) {
            signUpButton.addEventListener('click', handleSignUpClick);
            signInButton.addEventListener('click', handleSignInClick);
        }

        // Cleanup event listeners on component unmount
        return () => {
            if (signUpButton && signInButton && container) {
                signUpButton.removeEventListener('click', handleSignUpClick);
                signInButton.removeEventListener('click', handleSignInClick);
            }
        };
    }, []);

    return (
        <>
        <div className="body">

               <div className="kotak" id="container">
                <div className="form-container sign-up-container">
                    <form className="form-unik" onSubmit={handleRegister}>
                        <h1>Buat Akun</h1>
                        <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="login">Daftar</button>
                    </form>
                </div>


<div className="form-container sign-in-container">
    <form className="form-unik" onSubmit={handleLogin}>
      <h1>Masuk</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
     <a href="#"></a>
    <button type="submit" className="login">Masuk</button>
    </form>
 </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>Silakan login dengan informasi pribadi Anda untuk tetap terhubung dengan kami.</p>
                            <button className="login ghost" id="signIn">Masuk</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Buat Akun</h1>
                            <p>Daftarkan akun Anda sekarang untuk memulai langkah menuju keunggulan dalam administrasi rumah sakit.</p>
                            <button className="login ghost" id="signUp">Daftar</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
};

export default LoginPage;
