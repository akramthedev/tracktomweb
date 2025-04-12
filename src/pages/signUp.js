import React, { useState } from 'react';
import PasseWord from '../component/passeword';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { BASE_ENDPOINT_URL } from "../utils/Constants";
import { ToastContainer, toast } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const SignUp = () => {
  const [entreprise, setEntreprise] = useState('');
  const [name, setName] = useState('');
  const [poste, setPoste] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleRegister = async () => {
    setIsLoading(true);

    if ([entreprise, name, poste, tel, email, password, confirmPassword].some(field => field === '')) {
      alert('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (password.length < 12) {
      alert('Password must be at least 12 characters long');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      setIsLoading(false);
      return;
    }

    const userData = {
      entreprise,
      name,
      job: poste,
      telephone: tel,
      email,
      password
    };

    try {
      const response = await fetch(`${BASE_ENDPOINT_URL}register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const responseText = await response.text(); // Read response as text
      let data;

      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Error parsing JSON:', e);
        throw new Error('Invalid response format');
      }

      if (!response.ok) {
        console.error('Response error:', data.message);
        throw new Error(data.message || response.statusText);
      }

      if (data.success) {
        toast.success('Compte créé avec succès !'); // Show success toast
        navigate('/signin');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-5 h-screen">
      <div className="col-span-2 hidden md:block">
        <div className="bg-cover bg-no-repeat bg-center image-background h-screen w-full"></div>
      </div>
      <div className="col-span-full md:col-span-3 p-7">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover /> {/* Add ToastContainer */}
        <div className="grid grid-cols-1 xs:grid-cols-2 items-center space-y-2 xs:space-y-0 xs:gap-2 sm:gap-0">
          <div className="logo col-span-1 w-[170px] justify-self-center xs:justify-self-start">
            <img src="https://tracktom.pcs-agri.com/assets/images/logo-png.png" alt="" />
          </div>

          <div className="link-page col-span-1 grid justify-center xs:justify-end whitespace-wrap sm:whitespace-nowrap font-thin text-xs w-full text-center xs:text-right">
            <div>
              <span>Avez-vous un compte ?</span>
              <a href="signin" className="text-green4"> Connectez-vous !</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-5 py-3 rounded-t text-green4 my-8">
          <h3 className="text-4xl font-bold text-center">Commencer avec PCS AGRI</h3>
          <label className="text-gray-400">Commencer est facile</label>
        </div>

        <div className="sm:px-10 md:px-0 lg:px-10 xl:px-24 2xl:px-40">
          <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="entreprise"
                  id="entreprise"
                  className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-2 h-12 focus:shadow-outline bg-green3"
                  placeholder="Nom de l'entreprise"
                  value={entreprise}
                  onChange={(e) => setEntreprise(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="Nom_et_prénom"
                  id="Nom_et_prénom"
                  className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-2 h-12 focus:shadow-outline bg-green3"
                  placeholder="Nom et prénom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="Poste"
                  id="Poste"
                  className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-2 h-12 focus:shadow-outline bg-green3"
                  placeholder="Poste"
                  value={poste}
                  onChange={(e) => setPoste(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="Téléphone"
                  id="Téléphone"
                  className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-2 h-12 focus:shadow-outline bg-green3"
                  placeholder="Téléphone"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-2 h-12 focus:shadow-outline bg-green3"
                  placeholder="Adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="relative">
                <input
                  placeholder="Mot de passe"
                  type={showPassword ? 'text' : 'password'}
                  className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-2 h-12 focus:shadow-outline bg-green3"
                  id="Mot_de_passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <PasseWord togglePasswordVisibility={togglePasswordVisibility} showPassword={showPassword} />
              </div>
              <div className="relative">
                <input
                  placeholder="Confirmer mot de passe"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-2 h-12 focus:shadow-outline bg-green3"
                  id="Confirmer_mot_de_passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <PasseWord togglePasswordVisibility={toggleConfirmPasswordVisibility} showPassword={showConfirmPassword} />
              </div>

              <div className="flex items-center justify-between mt-2">
                <button
                  type="submit"
                  className={`w-full py-2 rounded-md ${isLoading ? 'bg-gray-400' : 'bg-green4'} text-white font-bold h-12`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Création en cours...' : 'Créer un compte'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

