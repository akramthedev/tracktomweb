import { Routes, Route, useLocation ,Navigate} from 'react-router-dom';
import Menu from './component/menu';
import CarteDesFermes from './pages/carteDesFermes';
import Alerte from './pages/alerte';
import TabelauDeBord from './pages/tabelauDeBord';
import TableauDeBordRecovery from './pages/tableauDeBordRecovery';
import Serres from './pages/serres';
import Role from './pages/role';
import Utilisateur from './pages/utilisateur';
import Abonnement from './pages/abonnement';
import AddVideo from './pages/addVideo';
import Aider from './pages/aider';
import CreateAutorisation from './component/createAutorisation';
import CreateUser from './pages/createUser';
import SignIn from './pages/signIn ';
import SignUp from './pages/signUp';
import CreateCustomer from './pages/createCustomer';
import Profile from './pages/profile';
import Example from './component/js';
import NotFoundPage from './pages/NotFoundPage';

import { useSelector } from 'react-redux';
function App() {
  const etat = useSelector((st) => st.menu.MenuState);
  const location = useLocation();

  const routesSansMenu = ['/accueil', '/farmes', '/serres','/staff','/profile'];

  const afficherMenu = routesSansMenu.includes(location.pathname.toLowerCase());

  return (
    <div className="flex min-h-screen">
      {afficherMenu && (
        <div
          className={`${etat ? 'absolute' : 'hidden'} md:block w-[200px] bg-gradient-to-br from-green1 to-green2 overflow-auto z-10 min-h-screen`}
          style={{ boxShadow: '0px 0px 10px black' }}
        >
          <Menu />
        </div>
      )}
      <div className="flex-1 overflow-auto max-h-screen">
        <Routes>
        <Route path="/accueil" element={<TabelauDeBord />} />
        <Route path="/" element={<Navigate to="/signIn" replace />} />
          <Route path="/accueil2" element={<TableauDeBordRecovery />} />
          <Route path="/farmes" element={<CarteDesFermes />} />
          <Route path="/serres" element={<Serres />} />
          <Route path="/alerts" element={<Alerte />} />
          <Route path="/roles" element={<Role />} />
          <Route path="/roles/create" element={<CreateAutorisation />} />
          <Route path="/staff" element={<Utilisateur />} />
          <Route path="/staff/create" element={<CreateUser />} />
          <Route path="/subscription" element={<Abonnement />} />
          <Route path="/subscription/create" element={<CreateCustomer />} />
          <Route path="/addvideo" element={<AddVideo />} />
          <Route path="/help" element={<Aider />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/js" element={<Example />} />          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;