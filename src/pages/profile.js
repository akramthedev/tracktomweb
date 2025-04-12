


import React, { useState, useEffect, useContext } from 'react';
import TitrePage from '../component/titrePage';
import { AppContext } from '../context/AuthContext';
import { BASE_ENDPOINT_URL } from "../utils/Constants";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const Profile = () => {
  const [userData, setUserData] = useState({
    nomEtPrenom: '',
    email: '',
    entreprise: '', // Added field for admin
    poste: '', // Added field for admin
    telephone: '' // Added field for admin
  });
  
  const [userType, setUserType] = useState(''); // State for user type
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(AppContext);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_ENDPOINT_URL}profile`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('response', response);
      
      // Set user data based on the response
      setUserData({
        nomEtPrenom: response.data.user.nomEtPrenom,
        email: response.data.user.email,
        entreprise: response.data.user.entreprise || '', // Handle if not present
        poste: response.data.user.poste || '', // Handle if not present
        telephone: response.data.user.telephone || '' // Handle if not present
      });
      setUserType(response.data.user.type); // Set user type (superAdmin, admin, etc.)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch user data');
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  }

  // Function to update profile
  async function updateProfile(data) {
    setLoading(true);
    setError(null);
    try {
      // Send profile data based on user type
      const profileData = userType === 'superAdmin' ? {
        nomEtPrenom: data.nomEtPrenom,
        email: data.email,
      } : {
        nomEtPrenom: data.nomEtPrenom,
        email: data.email,
        entreprise: data.entreprise,
        poste: data.poste,
        telephone: data.telephone
      };

      await axios.put(`${BASE_ENDPOINT_URL}profile/update`, profileData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      alert('Profile updated successfully');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updatePassword(data) {
    setLoading(true);
    setError(null);
    
    try {
      await axios.put(`${BASE_ENDPOINT_URL}profile/update-password`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      alert('Password updated successfully');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    await updateProfile(userData);
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    
    // Check if new password and confirmation match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    console.log('Updating password with:', {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
      confirmPassword:passwordData.confirmPassword,
    });

    await updatePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });

    // Reset password fields after successful update
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <>   
        
 {loading && (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-75 bg-gray-500">
        <div className="p-6 rounded-lg shadow-xl bg-white flex flex-col items-center">
          <CircularProgress size={60} color="primary" />
          <p className="text-center text-gray-700 mt-2">Chargement...</p>
        </div>
      </div>
    )}



      <TitrePage titre={'Mon profile'} />

      <div className='mx-auto my-auto grid grid-cols-1 lg:grid-cols-2'>
        {/* Profile Information Section */}
        <div className="w-auto p-4 col-span-1">
          <div className="border rounded-lg flex flex-col w-full col-span-1">
            <div className="flex items-center justify-between px-5 py-3 border-b-2 border-solid border-green3 rounded-t text-green4">
              <h3 className="text-2xl">Information sur le compte</h3>
            </div>

            {error && <div className="p-4 text-red-600 text-center">{error}</div>}

            <form onSubmit={handleSubmitProfile}>
              <div className="relative p-4 flex-auto">
                <div className="grid grid-cols-1 space-y-4">
                  {/* Display fields for superAdmin */}
                  {userType === 'superAdmin' ? (
                    <>
                      <div>
                        <label>Nom et prénom <span className='text-red-600'> *</span></label>
                        <input
                          type="text"
                          name="nomEtPrenom"
                          className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3"
                          value={userData.nomEtPrenom}
                          onChange={handleInputChange}
                          placeholder="Nom et prénom"
                          required
                        />
                      </div>

                      <div>
                        <label>Adresse email <span className='text-red-600'> *</span></label>
                        <input
                          type="email"
                          name="email"
                          className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3"
                          value={userData.email}
                          onChange={handleInputChange}
                          placeholder="Adresse email"
                          required
                        />
                      </div>
                    </>
                  ) : (
                    // Display fields for admin
                    <>
                      <div>
                        <label>Nom et prénom <span className='text-red-600'> *</span></label>
                        <input
                          type="text"
                          name="nomEtPrenom"
                          className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3"
                          value={userData.nomEtPrenom}
                          onChange={handleInputChange}
                          placeholder="Nom et prénom"
                          required
                        />
                      </div>

                      <div>
                        <label>Adresse email <span className='text-red-600'> *</span></label>
                        <input
                          type="email"
                          name="email"
                          className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3"
                          value={userData.email}
                          onChange={handleInputChange}
                          placeholder="Adresse email"
                          required
                        />
                      </div>

                      <div>
                        <label>Entreprise <span className='text-red-600'> *</span></label>
                        <input
                          type="text"
                          name="entreprise"
                          className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3"
                          value={userData.entreprise}
                          onChange={handleInputChange}
                          placeholder="Entreprise"
                          required
                        />
                      </div>

                      <div>
                        <label>Poste <span className='text-red-600'> *</span></label>
                        <input
                          type="text"
                          name="poste"
                          className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3"
                          value={userData.poste}
                          onChange={handleInputChange}
                          placeholder="Poste"
                          required
                        />
                      </div>

                      <div>
                        <label>Téléphone <span className='text-red-600'> *</span></label>
                        <input
                          type="tel"
                          name="telephone"
                          className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3"
                          value={userData.telephone}
                          onChange={handleInputChange}
                          placeholder="Téléphone"
                          required
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between px-5 py-4 border-t border-solid border-green3 rounded-b">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Password Update Section */}
        <div className="w-auto p-4 col-span-1">
          <div className="border rounded-lg flex flex-col w-full col-span-1">
            <div className="flex items-center justify-between px-5 py-3 border-b-2 border-solid border-green3 rounded-t text-green4">
              <h3 className="text-2xl">Changer le mot de passe</h3>
            </div>

            <form onSubmit={handleSubmitPassword}>
              <div className="relative p-4 flex-auto">
                <div className="grid grid-cols-1 space-y-4">
                  <div>
                    <label>Mot de passe actuel <span className='text-red-600'> *</span></label>
                    <input
                      type="password"
                      name="currentPassword"
                      className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Mot de passe actuel"
                      required
                    />
                  </div>

                  <div>
                    <label>Nouveau mot de passe <span className='text-red-600'> *</span></label>
                    <input
                      type="password"
                      name="newPassword"
                      className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Nouveau mot de passe"
                      required
                    />
                  </div>

                  <div>
                    <label>Confirmer le nouveau mot de passe <span className='text-red-600'> *</span></label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="border-green-100 shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green3"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirmer le nouveau mot de passe"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-5 py-4 border-t border-solid border-green3 rounded-b">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Changer le mot de passe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
