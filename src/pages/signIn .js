

import React, { useState, useContext } from 'react';
import PasseWord from '../component/passeword';
import { AppContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BASE_ENDPOINT_URL } from "../utils/Constants";


const SignIn = () => {
  const { storeToken } = useContext(AppContext); // Get storeToken from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  // Toggle the visibility of the password field
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null); // Reset login error before submitting
    setLoading(true); // Set loading to true during the login process

    try {
      // Send login request to backend API
      const response = await fetch(`${BASE_ENDPOINT_URL}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password as JSON
      });

      const data = await response.json();  

      if (response.ok) {
        await storeToken(data.data.token, data.data.user);
        navigate('/accueil');
      } else {
        // Display login error if response is not OK
        setLoginError(data.message || 'Login failed');
      }
    } catch (error) {
      // Handle errors during login
      setLoginError('An error occurred during login.');
      console.error('Error details:', error);
    } finally {
      // Set loading to false after login attempt
      setLoading(false);
    }
  };

  return (
    <div className='grid grid-cols-5 h-screen'>
      <div className='col-span-full md:col-span-3 p-7'>
        <div className="grid grid-cols-1 xs:grid-cols-2 items-center space-y-2 xs:space-y-0 xs:gap-2 sm:gap-0">
          <div className="logo col-span-1 w-[170px] justify-self-center xs:justify-self-start">
            <img src="https://tracktom.pcs-agri.com/assets/images/logo-png.png" alt="" />
          </div>
          <div className="link-page col-span-1 grid justify-center xs:justify-end font-thin text-xs w-full text-center xs:text-right">
            <span>Vous n'avez pas de compte?</span>
            <a href="/signup" className='text-green4'> S'inscrire !</a>
          </div>
        </div>
        <div className="flex items-center justify-center py-8 lg:py-16 text-green4 my-8">
          <h3 className="text-4xl sm:text-5xl font-bold text-center">Connectez-vous à Track Tom</h3>
        </div>
        <div className='sm:px-10 md:px-0 lg:px-10 xl:px-24 2xl:px-40'>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="form-group">
                <input 
                  type="email" 
                  name="email_address" 
                  className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 bg-green3 h-12" 
                  placeholder="Adresse email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  autoComplete="email" 
                  autoFocus 
                />
              </div>
              <div className="py-2">
                <div className="relative">
                  <input
                    placeholder="Mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 bg-green3 h-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* Password visibility toggle */}
                  <PasseWord togglePasswordVisibility={togglePasswordVisibility} showPassword={showPassword} />
                </div>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2">
                <label className="inline-flex items-center align-middle cursor-pointer w-full">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="relative w-11 h-6 peer-focus:outline-none bg-gray-200 rounded-full peer-checked:bg-green4"></div>
                  <span className="ms-3 text-xs font-medium text-gray-500">Souviens-toi de moi</span>
                </label>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button className="rounded-md w-full text-white bg-green4 hover:bg-white hover:text-green4 border h-12" type="submit">
                  {loading ? 'Connexion...' : 'Connexion'}
                </button>
              </div>
              {loginError && <div className="text-red-500 text-center mt-2">{loginError}</div>}
            </div>
          </form>
        </div>
      </div>
      <div className='col-span-2 hidden md:block'>
        <div className='bg-cover bg-no-repeat bg-center image-background h-screen w-full'></div>
      </div>
    </div>
  );
};

export default SignIn;
